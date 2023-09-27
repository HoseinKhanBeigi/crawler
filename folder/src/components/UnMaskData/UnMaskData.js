import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UnMaskData.scss';
import CPPopConfirm from '../CP/CPPopConfirm';
import Link from '../Link';

const UnMaskData = props => {
  const { title, popConfirmTitle, unMaskData, unMasked } = props;
  return (
    <>
      {!unMasked ? (
        <CPPopConfirm
          title={popConfirmTitle}
          okText="بله"
          cancelText="خیر"
          onConfirm={unMaskData}
        >
          <Link to="/#" onClick={e => e.stopPropagation()} className={s.title}>
            {title}
          </Link>
        </CPPopConfirm>
      ) : (
        <p className={s.title}>{title}</p>
      )}
    </>
  );
};

UnMaskData.propTypes = {
  title: PropTypes.string,
  popConfirmTitle: PropTypes.string,
  unMaskData: PropTypes.func,
  unMasked: PropTypes.bool,
};

UnMaskData.defaultProps = {
  title: '',
  popConfirmTitle: '',
  unMaskData: () => {},
  unMasked: false,
};

export default withStyles(s)(memo(UnMaskData));
export const UnMaskDataTest = UnMaskData;
