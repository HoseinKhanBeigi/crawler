import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './VideoCard.scss';
import CPLoading from '../../../CP/CPLoading';
import VideoPlayback from '../../../VideoPlayback';
import CPEmpty from '../../../CP/CPEmpty';

const VideoCard = props => {
  const { src, title, loading, onPlay } = props;
  return (
    <div className={s.container}>
      {loading ? (
        <CPLoading spinning={loading} />
      ) : src?.length ? (
        <VideoPlayback src={src} onPlay={onPlay} playOnClick={false} />
      ) : (
        <CPEmpty description="موردی برای نمایش وجود ندارد" />
      )}
      <span className={s.title}>{title}</span>
    </div>
  );
};

VideoCard.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  loading: PropTypes.bool,
  onPlay: PropTypes.func,
};
VideoCard.defaultProps = {
  title: '',
  src: '',
  loading: false,
  onPlay: () => {},
};
export default withStyles(s)(VideoCard);
