import React from 'react';
import classes from 'classnames';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Modal.scss';
import { ButtonWrapper } from '../widgets';
import Multiple from '../icons/multiple';

function Modal({ handleClose, show, children }) {
  const showHideClassName = show ? styles.displayBlock : styles.displayNone;
  const stopPropagation = e => {
    e.stopPropagation();
  };
  return (
    <div
      className={classes(styles.container, showHideClassName, 'modal')}
      role="presentation"
      onClick={handleClose}
      onKeyPress={handleClose}
    >
      <div className={classes(styles.content, 'modal-content')}>
        <section
          className={classes(styles.body, 'modal-body')}
          role="presentation"
          onClick={stopPropagation}
          onKeyPress={stopPropagation}
        >
          <ButtonWrapper
            appearance="subtle"
            onClick={handleClose}
            className={styles.closeButton}
          >
            <Multiple />
          </ButtonWrapper>
          {children}
        </section>
      </div>
    </div>
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default withStyles(styles)(Modal);
