import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from 'classnames';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './pipeSetting.scss';
import { StringUtils } from '../../../utils/stringUtils';
import EditStartForm from './EditStartForm/EditStartForm';
import EditPhaseForm from './EditPhaseForm/EditPhaseForm';
import EditPipelineSettingForm from './EditPipelineSettingForm/EditPipelineSettingForm';

const tabs = [
  {
    id: 0,
    title: 'فرم شروع',
    disabled: false,
  },
  {
    id: 1,
    title: 'فازها',
    disabled: false,
  },
  {
    id: 2,
    title: 'تنظیمات پایپلاین',
    disabled: false,
  },
];

function PipeSetting({ onClose, phaseId, pipeId, pipe, phases, actionId }) {
  const [tab, setTab] = useState(
    actionId !== 2 ? (StringUtils.isItFilled(phaseId) ? 1 : 0) : 2,
  );
  const renderedTabs = useMemo(
    () =>
      tabs.map(item => (
        <Tab key={item.id}>
          <div
            className={classes(
              styles.tab,
              tab === item.id ? styles.activeTab : '',
              // eslint-disable-next-line css-modules/no-undef-class
              item.id === 1 && !phases.length ? styles.disabledTab : '',
            )}
          >
            {item.title}
          </div>
        </Tab>
      )),
    [tab],
  );
  return (
    <div className={styles.container}>
      <div className={styles.header}>تنظیمات - {pipe?.name}</div>
      <div className={styles.content}>
        <Tabs
          shouldUnmountTabPanelOnChange
          selected={tab}
          onChange={id => (phases.length || id !== 1 ? setTab(id) : () => {})}
          id="pipe_setting_tabs"
        >
          <TabList>{renderedTabs}</TabList>
          <TabPanel>
            <EditStartForm pipeId={pipeId} onDone={onClose} />
          </TabPanel>
          <TabPanel>
            <EditPhaseForm
              pipeId={pipeId}
              onDone={onClose}
              selectedPhaseId={phaseId || phases[0]?.id}
              phases={phases || []}
            />
          </TabPanel>
          <TabPanel>
            <EditPipelineSettingForm onDone={onClose} pipeId={pipeId} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

PipeSetting.propTypes = {
  onClose: PropTypes.func.isRequired,
  phaseId: PropTypes.string,
  actionId: PropTypes.number.isRequired,
  pipeId: PropTypes.string.isRequired,
  pipe: PropTypes.object.isRequired,
  phases: PropTypes.any.isRequired,
};
PipeSetting.defaultProps = {
  phaseId: null,
};

const stateMap = (store, { pipeId }) => ({
  pipe: store.pipelineManagement.data[pipeId],
  phases: store.pipelinePhase.data[pipeId],
});

export default connect(stateMap, null)(withStyles(styles)(PipeSetting));
