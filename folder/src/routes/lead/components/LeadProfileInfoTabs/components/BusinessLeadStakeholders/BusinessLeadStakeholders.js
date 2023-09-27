import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './BusinessLeadStakeholders.scss';

const BusinessLeadStakeholders = ({ relations }) =>
  Object.entries(relations).map(([id, relation]) => (
    <div key={id} className={s.relation}>
      <p className={s.relation__name}>{relation.name}</p>
      {relation.roles.map(role => (
        <span
          className={s.relation__tag}
          style={{ backgroundColor: role.tagColor || '' }}
        >
          {role.relationTitle}
        </span>
      ))}
      <p className={s.relation__role}>
        {relation.relations
          .filter(role => role.relationType !== 'STAKEHOLDER')
          .map(role => role.relationTitle)}
      </p>
    </div>
  ));

BusinessLeadStakeholders.propTypes = {
  relations: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  relations: state.lead?.leadRelationsData,
});

export default connect(mapStateToProps)(
  withStyles(s)(BusinessLeadStakeholders),
);
