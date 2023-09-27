import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Charts.scss';
import ChartCard from '../../components/ChartCard/ChartCard';
import reportTabsSchema from '../../schemas/chartCardSchema';
import HandleAclPermission from '../../../../components/HandleAclPermission';
// import PropTypes from "prop-types";
//
// ChartsRoot.propTypes = {
//
// };

function Charts() {
  return (
    <div className={s.container}>
      {reportTabsSchema.map(schema =>
        schema.aclCode ? (
          <HandleAclPermission wich={schema.aclCode}>
            <ChartCard {...schema} key={schema.name} />
          </HandleAclPermission>
        ) : (
          <ChartCard {...schema} key={schema.name} />
        ),
      )}
    </div>
  );
}

export default withStyles(s)(Charts);
