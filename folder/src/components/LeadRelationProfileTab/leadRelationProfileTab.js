import PropTypes from 'prop-types';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './LeadRelationProfileTab.scss';
import Link from '../../components/Link/Link';

const LeadRelationProfileTab = props => {
  const { businessMode, companies, persons } = props;

  return (
    <>
      {businessMode
        ? persons?.map(person => (
            <div className={s.relationContainer}>
              <p>
                <Link to={`/lead/${person?.personLevantId}`} target>
                  {person.personName !== ' '
                    ? person.personName
                    : 'بدون نام' + ' '}
                </Link>
                -{' '}
                {person.relationType === 'OTHER'
                  ? person.otherRelationTypeTitle
                  : person.relationTypeTitle}
              </p>
            </div>
          ))
        : companies?.map(company => (
            <div className={s.relationContainer}>
              <p>
                <Link to={`/lead/${company?.businessLevantId}`} target>
                  {company.businessName !== ' '
                    ? company.businessName
                    : 'بدون نام' + ' '}
                </Link>
                -{' '}
                {company.relationType === 'OTHER'
                  ? company.otherRelationTypeTitle
                  : company.relationTypeTitle}
              </p>
            </div>
          ))}
    </>
  );
};

LeadRelationProfileTab.propTypes = {
  businessMode: PropTypes.bool.isRequired,
  companies: PropTypes.array.isRequired,
  persons: PropTypes.array.isRequired,
};

const mapStateToProps = ({ leads }) => ({
  companies: leads.getPersonsCompanyProfileData,
  persons: leads.getBusinessRelationProfileData,
});
export default connect(
  mapStateToProps,
  null,
)(withStyles(s)(LeadRelationProfileTab));
