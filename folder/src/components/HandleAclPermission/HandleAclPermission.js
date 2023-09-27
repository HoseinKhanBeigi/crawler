import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isAclSkipped } from '../../utils/aclActions';

const HandleAclPermission = props => {
  const { authorities, wich } = props;
  const memorizedAuthorized = React.useMemo(
    () => authorities?.filter(item => item?.code === wich),
    [authorities],
  );
  return memorizedAuthorized?.length || isAclSkipped(authorities)
    ? props.children
    : null;
};

HandleAclPermission.propTypes = {
  wich: PropTypes.string.isRequired,
  authorities: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  authorities: state?.acl?.authorities,
});

export default connect(mapStateToProps)(HandleAclPermission);
