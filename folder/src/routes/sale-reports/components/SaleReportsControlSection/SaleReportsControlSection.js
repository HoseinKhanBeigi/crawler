import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SaleReportsControlSection.scss';
import CPButton from '../../../../components/CP/CPButton';

/* eslint-disable no-param-reassign */

const SaleReportsControlSection = ({
  onChartTypeChange,
  type,
  reports,
  hasFilter,
  toggleFilterDrawer,
  clearFiltersHandler,
}) => {
  const [chartType, setChartType] = useState(0);
  const [jsLoaded, setJsLoaded] = useState(false);
  const indicatorRef = useRef(null);
  const buttonsRef = useRef([]);
  const timerRef = useRef(null);

  const handleIndicatorPosition = (buttonElement, indicatorElement) => {
    indicatorElement.style.left = `${buttonElement.offsetLeft}px`;
    indicatorElement.style.top = `${buttonElement.offsetTop}px`;
    indicatorElement.style.width = `${buttonElement.offsetWidth}px`;
    indicatorElement.style.height = `${buttonElement.offsetHeight}px`;
  };

  const filterButton = useMemo(
    () =>
      hasFilter && (
        <div>
          <CPButton type="primary" icon="filter" onClick={toggleFilterDrawer}>
            فیلتر ها
          </CPButton>
        </div>
      ),
    [],
  );

  useLayoutEffect(() => {
    if (buttonsRef.current[chartType] && indicatorRef.current && jsLoaded)
      handleIndicatorPosition(
        buttonsRef.current[chartType],
        indicatorRef.current,
      );
  }, [chartType, jsLoaded]);

  useEffect(() => {
    onChartTypeChange(chartType);
  }, [chartType]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setJsLoaded(true);
    }, 500);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={s.container}>
      <div className={s.buttonsContainer}>
        <p>نمایش براساس:</p>
        <div className={s.buttons}>
          {!!reports &&
            reports.map((name, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={`${type}_${index}`}>
                <input
                  type="radio"
                  name={`chartTypes-${type}`}
                  id={`chartTypes-${type}_${index}`}
                  checked={index === chartType}
                  onChange={() => {
                    clearFiltersHandler();
                    setChartType(index);
                  }}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label
                  style={{
                    backgroundColor:
                      !jsLoaded && chartType === index && '#1c92ff',
                  }}
                  /* probably show selected option when js isn't loaded yet */
                  htmlFor={`chartTypes-${type}_${index}`}
                  ref={el => {
                    buttonsRef.current[index] = el;
                  }}
                >
                  {name}
                </label>
              </React.Fragment>
            ))}
          {jsLoaded && (
            <span ref={indicatorRef} className={s.buttons__indicator} />
          )}
        </div>
      </div>
      {filterButton}
    </div>
  );
};

SaleReportsControlSection.propTypes = {
  onChartTypeChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  reports: PropTypes.array.isRequired,
  toggleFilterDrawer: PropTypes.func.isRequired,
  clearFiltersHandler: PropTypes.func.isRequired,
  hasFilter: PropTypes.bool.isRequired,
};

export default React.memo(
  withStyles(s)(SaleReportsControlSection),
  (prevProps, nextProps) => prevProps.hasFilter === nextProps.hasFilter,
);
