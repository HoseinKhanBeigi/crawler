import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ButtonWrapper } from '../widgets';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './DeleteModal.scss';
import Modal from '../Modal/Modal';

function DeleteModal({ onConfirm, show, onClose, title, description }) {
  return (
    <div className={styles.modalContainer}>
      <Modal show={show} handleClose={onClose}>
        {show && (
          <div className={styles.pipeNameContainer}>
            <div className={styles.confirmTitle}>
              <span>{title}</span>
            </div>
            <div className={styles.warningText}>هشدار!</div>
            <div className={styles.description}>{description}</div>
            <div className={styles.modalBtnWrapper}>
              <ButtonWrapper
                onClick={onClose}
                appearance="link"
                className={styles.cancelButton}
              >
                <span>لغو</span>
              </ButtonWrapper>
              <ButtonWrapper
                onClick={onConfirm}
                appearance="primary"
                className={styles.createButton}
              >
                <span>حذف</span>
              </ButtonWrapper>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

DeleteModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

DeleteModal.defaultProps = {
  title: '',
  description: '',
  show: false,
};

export default withStyles(styles)(DeleteModal);
