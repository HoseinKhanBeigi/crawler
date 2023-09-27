import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { mdiArrowExpandAll } from '@mdi/js';
import MdiIcon from '@mdi/react';
import withModal from '../../../HOC/withModal';
import s from './PictureCard.scss';
import CPLoading from '../../../CP/CPLoading';
import CPEmpty from '../../../CP/CPEmpty';
import { MODAL_FOR_EXPAND_PHOTO } from '../../../ModalRoot/repository';

const PictureCard = props => {
  const { src, title, loading, withExpand, height } = props;

  const openExpandModal = () => {
    props.showModalAction({
      type: MODAL_FOR_EXPAND_PHOTO,
      props: {
        title,
        src,
      },
    });
  };
  return (
    <div className={s.container}>
      {loading ? (
        <CPLoading spinning={loading} />
      ) : src?.length ? (
        <div className={s.image_container}>
          <img
            className={s.img}
            style={{ height: `${height}px` }}
            alt={title}
            src={src}
          />
          {withExpand && (
            <MdiIcon
              className={s.expandIcon}
              size="20px"
              path={mdiArrowExpandAll}
              onClick={openExpandModal}
            />
          )}
        </div>
      ) : (
        <CPEmpty description="موردی برای نمایش وجود ندارد" />
      )}
      <span className={s.title}>{title}</span>
    </div>
  );
};

PictureCard.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  height: PropTypes.number,
  loading: PropTypes.bool,
  withExpand: PropTypes.bool,
  showModalAction: PropTypes.func.isRequired,
};
PictureCard.defaultProps = {
  title: '',
  src: '',
  height: 160,
  withExpand: false,
  loading: false,
};
export default withModal(withStyles(s)(PictureCard));
