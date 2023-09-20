import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Icon } from 'antd';
// eslint-disable-next-line css-modules/no-unused-class
import s from './EntityGroupList.scss';
import CPButton from '../CP/CPButton';
import Link from '../Link';
import CPPanel from '../CP/CPPanel';
import {
  getDeleteTaskAction,
  getTaskListAction,
} from '../../store/task/task.actions';
import CPMessage from '../CP/CPMessage';
import CPPopConfirm from '../CP/CPPopConfirm';
import ModalForAddTask from '../ModalForAddTask';
import { getActivitiesAction } from '../../store/activities/activities.actions';
import { anyModalOpen } from '../../store/opportunities/opportunities.actions';

const EntityGroupList = props => {
  const { taskList, leadInfo } = props;
  function addTask(name, e) {
    if (e && e.stopPropagation()) {
      e.stopPropagation();
    }

    props.anyModalOpen('modalForAddTask');
  }

  async function deleteTask(id, sourceId) {
    const result = await props.getDeleteTaskAction(id);
    if (result) {
      CPMessage(' حذف شد.', 'success');
      props.getTaskListAction(sourceId);
    } else {
      CPMessage('حذف نشد، مجددا تلاش نمایید.', 'error');
    }
  }

  return (
    <div className={s.entityGroupList}>
      {taskList?.length ? (
        <CPPanel
          header={
            <span className={s.headerList}>
              وظایف
              <span className={s.count}>({taskList?.length})</span>
              <CPButton className={s.plus} onClick={addTask} icon="plus" />
            </span>
          }
        >
          <ul className={s.dataList}>
            {taskList?.length &&
              taskList?.map(lists => (
                <li key={lists.id}>
                  <CPPopConfirm
                    okText="حذف"
                    title="آیا مطمین هستید می خواهید حذف کنید؟"
                    onConfirm={() => deleteTask(lists?.id, lists?.sourceId)}
                    placement="topLeft"
                  >
                    <CPButton className={s.delete}>
                      <Icon theme="filled" type="delete" />
                    </CPButton>
                  </CPPopConfirm>
                  <Icon
                    className={s.status}
                    theme="filled"
                    type="check-circle"
                  />
                  <Link to="/#">{lists?.name}</Link>
                </li>
              ))}
          </ul>
        </CPPanel>
      ) : null}
      {/* (
      <CPButton className={s.addTask} onClick={addTask}>
        <Icon theme="filled" type="snippets" />
        <span className={s.addBtnTitle}>افزودن وظایف</span>
      </CPButton>
      ) */}
      <ModalForAddTask source="LEAD" sourceId={leadInfo?.levantId} />
    </div>
  );
};

EntityGroupList.propTypes = {
  getDeleteTaskAction: PropTypes.func.isRequired,
  getTaskListAction: PropTypes.func.isRequired,
  taskList: PropTypes.array,
  leadInfo: PropTypes.object,
  anyModalOpen: PropTypes.func.isRequired,
};

EntityGroupList.defaultProps = {
  taskList: null,
  leadInfo: null,
};

const mapState = state => ({
  leadInfo: state.lead.data,
  taskList: state.task.taskListData,
});

const mapDispatch = {
  getDeleteTaskAction,
  getTaskListAction,
  getActivitiesAction,
  anyModalOpen,
};

export default connect(mapState, mapDispatch)(withStyles(s)(EntityGroupList));

export const LeftColumnListBoxTest = EntityGroupList;
