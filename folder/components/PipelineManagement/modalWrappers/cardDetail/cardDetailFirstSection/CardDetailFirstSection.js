import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classes from 'classnames';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import styles from './CardDetailFirstSection.scss';
import NewProperty from '../../../icons/newProperty';
import Envelope from '../../../icons/Envelope';
import Message from '../../../icons/Message';
import Task from '../../../icons/Task';
import Alarm from '../../../icons/Alarm';
import TasksPanel from './tabPanels/TasksPanel';
import MessagesPanel from './tabPanels/MessagesPanel';
import AlarmsPanel from './tabPanels/AlarmsPanel';
import EmailsPanel from './tabPanels/EmailsPanel';
import CardDetailsPanel from './tabPanels/CardDetailsPanel';

const tabs = [
  {
    id: 0,
    title: 'اطلاعات کارت',
    panel: card => <CardDetailsPanel card={card} />,
    icon: <NewProperty />,
    disabled: false,
  },
  {
    id: 1,
    title: 'کارها',
    panel: card => <TasksPanel card={card} />,
    icon: <Task />,
    disabled: false,
  },
  {
    id: 2,
    title: 'ایمیل‌ها',
    panel: () => <EmailsPanel />,
    icon: <Envelope />,
    disabled: true,
  },
  {
    id: 3,
    title: 'پیام‌ها',
    panel: () => <MessagesPanel />,
    icon: <Message />,
    disabled: true,
  },

  {
    id: 4,
    title: 'هشدار ها',
    panel: () => <AlarmsPanel />,
    icon: <Alarm />,
    disabled: true,
  },
];

function CardDetailFirstSection({ card }) {
  const [activeTab, setActiveTab] = useState(0);

  const renderedTabs = useMemo(() => {
    const tabItems = [];
    const panelItems = [];
    tabs
      .filter(item => !item.disabled)
      .forEach(item => {
        tabItems.push(
          <Tab key={item.id}>
            <div
              className={classes(
                styles.tab,
                activeTab === item.id ? styles.activeTab : '',
              )}
            >
              {item.icon}
              {item.title}
            </div>
          </Tab>,
        );
        panelItems.push(<TabPanel>{item.panel(card)}</TabPanel>);
      });
    return (
      <Tabs
        shouldUnmountTabPanelOnChange
        selected={activeTab}
        onChange={setActiveTab}
        id="card_Detail_tabs"
      >
        <TabList>{tabItems}</TabList>
        {panelItems}
      </Tabs>
    );
  }, [activeTab]);

  return (
    <div
      className={classes(
        styles.cardDetail,
        styles.borderLeft,
        'first-section-card-Detail',
        'border-left',
      )}
    >
      <div className={classes(styles.detailTitle, 'detail-Title')}>
        جزییات کارت
      </div>
      <div className={classes(styles.detailTabsTitle, 'details-Tabs-Title')}>
        {renderedTabs}
      </div>
    </div>
  );
}

CardDetailFirstSection.propTypes = {
  card: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardDetailFirstSection);
