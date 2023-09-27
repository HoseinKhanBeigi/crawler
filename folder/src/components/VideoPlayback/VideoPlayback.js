import React, { useRef, useState } from 'react';
import { Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './VideoPlayback.scss';

const VideoPlayback = props => {
  const { src, className, playOnClick, onPlay } = props;
  const [videoPlaying, setVideoPlaying] = useState(false);
  const playBack = useRef(null);

  const playVideo = () => {
    if (playOnClick) {
      setVideoPlaying(true);
      playBack.current.play();
    }
    onPlay();
  };

  const onPlaying = () => setVideoPlaying(true);

  const onEnded = () => setVideoPlaying(false);

  return (
    <div className={className}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        style={{ width: '100%' }}
        ref={playBack}
        onPlaying={onPlaying}
        onEnded={onEnded}
        muted={false}
      >
        <source src={src} />
      </video>
      {!videoPlaying && (
        <div className={s.playBack_button}>
          <div className={s.playBack_button__container}>
            <Icon
              type="play-circle"
              theme="filled"
              className={s.playBack_icon}
              onClick={playVideo}
            />
            {/* <div className={s.playBack_button_caption}>پخش ویدئو</div> */}
          </div>
        </div>
      )}
    </div>
  );
};
VideoPlayback.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  playOnClick: PropTypes.bool,
  onPlay: PropTypes.func,
};
VideoPlayback.defaultProps = {
  src: '',
  className: '',
  playOnClick: true,
  onPlay: () => {},
};
export default withStyles(s)(VideoPlayback);
