import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal/CPModal';
import { MODAL_FOR_EXPAND_PHOTO } from '../../repository';
import s from './ModalForExpandPhoto.scss';

const ModalForExpandPhoto = props => {
  const { src, title } = props;
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <CPModal
      title={title}
      className={s.modalForPhotKyc}
      footer={false}
      width={592}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_EXPAND_PHOTO}
    >
      <img src={src} className={s.photoVideoKyc} alt={title} />
    </CPModal>
  );
};

ModalForExpandPhoto.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};
ModalForExpandPhoto.defaultProps = {
  src: '',
  title: 'نمایش تصویر',
};

export default withStyles(s)(ModalForExpandPhoto);
