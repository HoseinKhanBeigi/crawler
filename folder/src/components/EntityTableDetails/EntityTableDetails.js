import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './EntityTableDetails.scss';

const renderInfoList = data => (
  <div className="col-md-3">
    <span className={s.wrapper}>
      <b>{data?.name || '- -'}:</b>
      <small>{data?.value || '- -'}</small>
    </span>
  </div>
);

const renderPartyBusiness = data => {
  if (data) {
    return Object.entries(data).map(item => (
      <div className="col-md-3">
        <span className={s.wrapper}>
          <b>{item[0] || '- -'}:</b>
          <small>{item[1] || '- -'}</small>
        </span>
      </div>
    ));
  }
  return null;
};

const EntityTableDetails = props => {
  const { className, leadInfo, partyBusiness } = props;
  return (
    <div className={cs('EntityTableDetails', className)}>
      <div className="row">
        {leadInfo?.map(item => renderInfoList(item))}
        {renderPartyBusiness(partyBusiness)}
      </div>
    </div>
  );
};

EntityTableDetails.propTypes = {
  leadInfo: PropTypes.arrayOf(PropTypes.object),
  partyBusiness: PropTypes.object,
  className: PropTypes.string,
};

EntityTableDetails.defaultProps = {
  leadInfo: null,
  partyBusiness: null,
  className: null,
};

export default withStyles(s)(memo(EntityTableDetails));
export const EntityTableDetailsTest = EntityTableDetails;
