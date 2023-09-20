import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CPCountDown = props => {
  const { valuePerSec, onZeroTimer } = props;
  const [countDownDisplay, setCountDownDisplay] = useState(valuePerSec);
  const [counter, setCounter] = useState('00:00');
  let timer = null;
  useEffect(() => {
    function clock(time) {
      let seconds = time % 60;
      let minutes = Math.floor(time / 60);
      minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
      seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;
      return `${minutes}:${seconds}`;
    }
    function handleStart() {
      timer = setInterval(() => {
        const newTimeValue = countDownDisplay - 1;
        setCountDownDisplay(newTimeValue);
        setCounter(clock(newTimeValue));
        if (newTimeValue === 0) {
          clearInterval(timer);
          onZeroTimer();
          setCounter('00:00');
        } else if (newTimeValue < 0) {
          clearInterval(timer);
          setCounter('00:00');
        }
      }, 1000);
    }
    handleStart();
    return () => {
      clearInterval(timer);
    };
  }, [counter]);
  return (
    <>
      <span style={{ width: '33px' }}>{counter}</span>
    </>
  );
};

CPCountDown.defaultProps = {
  onZeroTimer: null,
};
CPCountDown.propTypes = {
  valuePerSec: PropTypes.number.isRequired,
  onZeroTimer: PropTypes.func,
};
export default CPCountDown;
