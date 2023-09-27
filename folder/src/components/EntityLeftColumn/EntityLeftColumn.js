/* eslint-disable react/jsx-no-undef */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './EntityLeftColumn.scss';
import EntityGroupList from '../EntityGroupList/EntityGroupList';
import EntityOpportunityList from '../EntityOpportunityList';
import EntityDocumentList from '../EntityDocumentList';

const EntityLeftColumn = props => {
  const { fullWidth, opportunityData, levantId } = props;
  return (
    <div className={cs(fullWidth ? 'isFull' : 'notFull')}>
      <EntityGroupList />
      <EntityOpportunityList data={opportunityData} />
      <EntityDocumentList levantId={levantId} />
    </div>
  );
};

EntityLeftColumn.propTypes = {
  fullWidth: PropTypes.bool,
  opportunityData: PropTypes.object,
  levantId: PropTypes.string,
};

EntityLeftColumn.defaultProps = {
  fullWidth: false,
  opportunityData: null,
  levantId: null,
};

export default withStyles(s)(memo(EntityLeftColumn));
