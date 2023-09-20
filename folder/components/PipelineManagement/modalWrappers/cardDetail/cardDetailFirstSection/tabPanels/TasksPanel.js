import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TasksPanel.scss';
import { getCardTasksAction } from '../../../../../../store/pipelineCardTasks/pipelineCardTasks.actions';
import convertToJalaliDate from '../../../../../../utils/date';
import Link from '../../../../../Link';

function TasksPanel(props) {
  const [cardTasksList, setCardTasksList] = useState([]);

  useEffect(() => {
    props.getCardTasks(props.card.id);
    setCardTasksList(props.cardTasks);
  }, []);

  useEffect(() => {
    setCardTasksList(props.cardTasks);
  }, [props.cardTasks]);

  // eslint-disable-next-line react/prop-types
  function generateUser({ levantId, levantFullName }) {
    return (
      <Link
        to={`/lead/${levantId}`}
        onClick={e => {
          e.stopPropagation();
        }}
        target
      >
        {levantFullName}
      </Link>
    );
  }

  function taskManagementStatusHandler(taskManagementStatus) {
    switch (taskManagementStatus) {
      case 'OPEN':
        return (
          <div className={classes(s.taskStatusValue, 'openStatus')}>باز</div>
        );
      case 'DONE':
        return (
          <div className={classes(s.taskStatusValue, 'closeStatus')}>بسته</div>
        );
      case 'IN_PROGRESS':
        return (
          <div className={classes(s.taskStatusValue, 'inProgressStatus')}>
            در حال انجام
          </div>
        );
      default:
        return <></>;
    }
  }

  const tasksRendered = useMemo(() => {
    if (cardTasksList.length) {
      return cardTasksList.map(task => (
        <div className={s.taskWrapper} key={task.id}>
          <header className={s.taskHeader}>
            <span className={s.taskTitle}>{task.title}</span>
            <span className={s.taskCreatedDate}>
              زمان:
              {convertToJalaliDate(task.dueDate, 'HH:mm - jYYYY/jMM/jDD')}
            </span>
          </header>
          <div className={s.taskDescription}>
            <div>
              <span className={s.fieldTitle}>وضعیت:</span>
              <span className={s.fieldValue}>
                {taskManagementStatusHandler(task.taskManagementStatus)}
              </span>
            </div>
            <div>
              <span className={s.fieldTitle}>شماره کار:</span>
              <span className={s.fieldValue}>{task.code}</span>
            </div>
            <div>
              <span className={s.fieldTitle}>ایجاد کننده:</span>
              <span className={s.fieldValue}>
                {generateUser({
                  levantId: task.creatorLevantId,
                  levantFullName: `${task.creatorFirstName} ${task.creatorLastName}`,
                })}
              </span>
            </div>
            <div>
              <span className={s.fieldTitle}>محول شده به:</span>
              <span className={s.fieldValue}>
                {generateUser({
                  levantId: task.assigneeLevantId,
                  levantFullName: `${task.assigneeFirstName} ${task.assigneeLastName}`,
                })}
              </span>
            </div>
          </div>
        </div>
      ));
    }
    return <div>کاری وجود ندارد</div>;
  }, [cardTasksList]);

  return <div className={s.tasksWrapper}>{tasksRendered}</div>;
}
TasksPanel.propTypes = {
  card: PropTypes.object.isRequired,
  cardTasks: PropTypes.array.isRequired,
  getCardTasks: PropTypes.func.isRequired,
};
const stateMap = store => ({
  cardTasks: store.cardTasks?.data,
});

const dispatchMap = {
  getCardTasks: getCardTasksAction,
};

export default connect(stateMap, dispatchMap)(withStyles(s)(TasksPanel));
