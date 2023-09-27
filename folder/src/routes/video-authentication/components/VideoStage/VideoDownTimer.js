import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './VideoStage.scss';

const VideoDownTimer = props => {
  const { onZero, count } = props;
  const [counter, setCounter] = useState(count);

  useEffect(() => {
    const handleStart = () => {
      if (counter > 0) {
        setTimeout(() => {
          setCounter(counter - 1);
        }, 1000);
      } else if (counter === 0) {
        onZero();
      }
    };
    handleStart();
  }, [counter]);

  return (
    <>
      <div className={s.blackTrasnparnet}>
        <span className={s.downTime}>{counter}</span>
      </div>
    </>
  );
};
VideoDownTimer.propTypes = {
  onZero: PropTypes.func,
  count: PropTypes.number,
};
VideoDownTimer.defaultProps = {
  onZero: () => {},
  count: 3,
};
export default withStyles(s)(VideoDownTimer);
