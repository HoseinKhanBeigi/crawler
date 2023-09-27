import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SetPasswordForm from '../../../SetPasswordForm';

const ChangePasswordTab = props => {
  const { onCancel, uuid } = props;
  const handleCancel = () => onCancel();
  return (
    <>
      <div>
        <SetPasswordForm handleCancel={handleCancel} record={{ uuid }} />
      </div>
    </>
  );
};

ChangePasswordTab.propTypes = {
  onCancel: PropTypes.func,
  uuid: PropTypes.string,
};
ChangePasswordTab.defaultProps = {
  onCancel: () => {},
  uuid: '',
};
const mapState = state => ({
  uuid: state?.neshanAuth?.jwt?.uuid,
});

export default connect(mapState, null)(ChangePasswordTab);
