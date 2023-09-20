import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './CircleCounter.scss';

const CircleCounter = props => {
  const { visiblity, onZero, count } = props;
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const handleStart = () => {
      if (counter <= count) {
        setTimeout(() => {
          setCounter(counter + 1);
        }, 1000);
      } else if (counter > count) {
        onZero();
      }
    };
    handleStart();
  }, [counter]);

  return (
    <>
      {visiblity && (
        <div className={s.circleCounter}>
          <div className={s.circleCounter__circle}>
            <svg>
              <circle r="23" cx="30" cy="30" />
            </svg>
          </div>
          <div>{counter} ثانیه</div>
        </div>
      )}
    </>
  );
};
CircleCounter.propTypes = {
  onZero: PropTypes.func,
  visiblity: PropTypes.bool,
  count: PropTypes.number,
};
CircleCounter.defaultProps = {
  onZero: () => {},
  visiblity: true,
  count: 10,
};
export default withStyles(s)(CircleCounter);
