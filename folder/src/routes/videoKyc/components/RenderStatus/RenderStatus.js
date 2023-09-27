import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';
import s from './RenderStatus.scss';

const RednerActions = props => {
  const { videoKycResult } = props;
  const [picStatus, setPicStatus] = useState(null);
  const [videoStatus, setVideoStatus] = useState(null);
  const [getstureStatus, setGestureStatus] = useState(null);
  useEffect(() => {
    if (videoKycResult?.length) {
      videoKycResult?.map(item => {
        if (item?.resultType === 'FACE_RECOGNITION_IMAGE') {
          setPicStatus(item?.verified);
        }
        if (item?.resultType === 'FACE_RECOGNITION_VIDEO') {
          setVideoStatus(item?.verified);
        }
        if (item?.resultType === 'HAND_GESTURE_DETECTION') {
          setGestureStatus(item?.verified);
        }
      });
    }
  }, []);
  return (
    <>
      <Icon
        type="picture"
        style={{
          color: picStatus
            ? '#13c29a'
            : picStatus === false
            ? '#ff5252'
            : '#adadad',
        }}
        className={s.pic}
      />
      <Icon
        type="play-circle"
        style={{
          color:
            videoStatus && getstureStatus
              ? '#13c29a'
              : videoStatus === false || getstureStatus === false
              ? '#ff5252'
              : '#adadad',
        }}
        className={s.video}
      />
    </>
  );
};

RednerActions.propTypes = {
  videoKycResult: PropTypes.array,
};
RednerActions.defaultProps = {
  videoKycResult: [],
};
export default withStyles(s)(RednerActions);
