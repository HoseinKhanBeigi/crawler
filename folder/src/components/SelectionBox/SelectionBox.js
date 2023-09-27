import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SelectionBox.scss';

/* eslint-disable no-param-reassign */

const handleIndicatorPosition = (buttonElement, indicatorElement) => {
  indicatorElement.style.left = `${buttonElement.offsetLeft}px`;
  indicatorElement.style.top = `${buttonElement.offsetTop}px`;
  indicatorElement.style.width = `${buttonElement.offsetWidth}px`;
  indicatorElement.style.height = `${buttonElement.offsetHeight}px`;
};

const SelectionBox = ({ onChange, title, value, options = [], id }) => {
  const [jsLoaded, setJsLoaded] = useState(false);
  const indicatorRef = useRef(null);
  const buttonsRef = useRef([]);
  const timerRef = useRef(null);

  const selectedIndex = useMemo(
    () => options.findIndex(item => item.value === value),
    [value],
  );

  useEffect(() => {
    if (buttonsRef.current[selectedIndex] && indicatorRef.current && jsLoaded)
      handleIndicatorPosition(
        buttonsRef.current[selectedIndex],
        indicatorRef.current,
      );
  }, [value, jsLoaded]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setJsLoaded(true);
    }, 500);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={s.buttonsContainer}>
      <p>{title} :</p>
      <div className={s.buttons}>
        {options.map(({ title: label, value: val }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={`${id}_${index}`}>
            <input
              type="radio"
              name={`selectionBox-${id}`}
              id={`selectionBox-${id}_${index}`}
              checked={index === selectedIndex}
              onChange={() => {
                onChange(val);
              }}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-for */}
            <label
              style={{
                backgroundColor:
                  !jsLoaded && selectedIndex === index && '#1c92ff',
              }}
              /* probably show selected option when js isn't loaded yet */
              htmlFor={`selectionBox-${id}_${index}`}
              ref={el => {
                buttonsRef.current[index] = el;
              }}
            >
              {label}
            </label>
          </React.Fragment>
        ))}
        {jsLoaded && (
          <span ref={indicatorRef} className={s.buttons__indicator} />
        )}
      </div>
    </div>
  );
};

SelectionBox.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.objectOf({
      title: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ).isRequired,
  id: PropTypes.string.isRequired,
};

SelectionBox.defaultProps = {
  title: '',
  value: undefined,
  onChange: () => {},
};

export default withStyles(s)(SelectionBox);
