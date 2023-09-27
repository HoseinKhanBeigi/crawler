import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PanelLayout.scss';
import FilterForm from '../components/FilterForm/FilterForm';
import GroupByForm from '../components/GroupByForm/GroupByForm';
import { AsemanPanelContext } from '../store';
import { initializeAction } from '../store/actions';

const PanelLayout = ({ config, name }) => {
  const { dispatch } = useContext(AsemanPanelContext);
  useEffect(() => {
    dispatch(initializeAction(config.initialState));
  }, [name]);
  return (
    <div className={s.container}>
      {config.groupBy && config.groupBy.length && (
        <div className={s.groupBySection}>
          <GroupByForm groupByFields={config.groupBy} id={name} />
        </div>
      )}
      <div className={s.chartSection}>{config.component}</div>
      {config.filters && config.filters.length && (
        <div className={s.filterSection}>
          <FilterForm filterFields={config.filters} />
        </div>
      )}
    </div>
  );
};

PanelLayout.propTypes = {
  config: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(s)(PanelLayout);
