import React from 'react';
import { List } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EntityActivityList.scss';
import CPPanel from '../CP/CPPanel';
import CPAvatar from '../CP/CPAvatar';
import CPButton from '../CP/CPButton';
import CPModal from '../CP/CPModal';
import LogActivityForm from '../LogActivityForm';
import CPPopConfirm from '../CP/CPPopConfirm';
import CPTooltip from '../CP/CPTooltip';
import CPEmpty from '../CP/CPEmpty';
import {
  getActivitiesAction,
  getDeleteActivityAction,
} from '../../store/activities/activities.actions';

const moment = require('moment-jalaali');

class EntityActivityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editActivity: false,
    };
    this.activityType = {
      TODO: {
        title: 'وظیفه',
        icon: 'file-done',
      },
      MEETING: {
        title: 'جلسه',
        icon: 'team',
      },
      NOTE: {
        title: 'یادداشت',
        icon: 'form',
      },
      CALL: {
        title: 'تماس',
        icon: 'phone',
      },
      EMAIL: {
        title: 'ایمیل',
        icon: 'mail',
      },
      SMS: {
        title: 'پیامک',
        icon: 'message',
      },
    };
  }

  showModal = name => {
    this.setState({
      [name]: true,
    });
  };

  handleCancel = (e, name) => {
    this.setState({
      [name]: false,
    });
  };

  deleteActivity = async (id, sourceId) => {
    const result = await this.props.getDeleteActivityAction(id);
    if (result) {
      await this.props.getActivitiesAction(sourceId);
    }
  };

  render() {
    const { editActivity } = this.state;
    const { activities, descriptionLength } = this.props;
    moment.loadPersian({ dialect: 'persian-modern' });

    const activityList = activities?.map(item => ({
      ...item,
      activityDate: new Date(item.activityDate).toISOString().split('T')[0],
      className: this.activityType[item.type].icon
        ? this.activityType[item.type].icon
        : 'question',
      title: this.activityType[item.type].title
        ? this.activityType[item.type].title
        : item.type,
      createdByName: item.createdByName,
    }));

    return (
      <div className={s.ActivityList}>
        <div className={s.header}>
          <span>فعالیت ها</span>
        </div>
        {activityList?.length ? (
          <List
            itemLayout="horizontal"
            dataSource={activityList}
            renderItem={item => (
              <CPPanel
                key={item.id}
                header={
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <CPAvatar
                          style={{ backgroundColor: 'rgb(0, 150, 136)' }}
                          icon={item.className}
                          src={null}
                        />
                      }
                      title={
                        <div className={s.title}>
                          <span>
                            <b>{item.title}</b>
                            <small> (توسط: {item.createdByName})</small>
                          </span>
                          <span className={s.date}>{item.activityDate}</span>
                        </div>
                      }
                      description={
                        descriptionLength ? (
                          <CPTooltip
                            placement="top"
                            title={
                              item.details.length >= 60 ? item.details : null
                            }
                          >
                            {item.details.length >= 60
                              ? `${item.details.slice(0, 60)}...`
                              : item.details}
                          </CPTooltip>
                        ) : (
                          <CPTooltip
                            placement="top"
                            title={
                              item.details.length >= 20 ? item.details : null
                            }
                          >
                            {item.details.length >= 20
                              ? `${item.details.slice(0, 20)}...`
                              : item.details}
                          </CPTooltip>
                        )
                      }
                    />
                  </List.Item>
                }
              >
                <CPPopConfirm
                  okText="حذف"
                  title="آیا مطمین هستید می خواهید حذف کنید؟"
                  onConfirm={() => this.deleteActivity(item.id, item.sourceId)}
                  placement="topLeft"
                >
                  <CPButton
                    className="btn danger-btn margin-r-10"
                    type="danger"
                    onClick={() => {
                      this.showModal('deleteActivity');
                    }}
                  >
                    حذف
                  </CPButton>
                </CPPopConfirm>
                <CPButton
                  className="btn link-btn"
                  onClick={() => {
                    this.showModal('editActivity');
                  }}
                >
                  ویرایش
                </CPButton>
                {/* Edit Modal */}
                <CPModal
                  title="ویرایش فعالیت"
                  visible={editActivity}
                  footer={null}
                  onCancel={e => {
                    this.handleCancel(e, 'editActivity');
                  }}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <LogActivityForm
                        onSubmit={e => {
                          this.handleCancel(e, 'editActivity');
                        }}
                        handleCancel={e => {
                          this.handleCancel(e, 'editActivity');
                        }}
                        item={item}
                        source="LEAD"
                        sourceId={item.sourceId}
                        editMode
                      />
                    </div>
                  </div>
                </CPModal>
              </CPPanel>
            )}
          />
        ) : (
          <CPEmpty />
        )}
      </div>
    );
  }
}

EntityActivityList.propTypes = {
  getDeleteActivityAction: PropTypes.func.isRequired,
  getActivitiesAction: PropTypes.func.isRequired,
  descriptionLength: PropTypes.bool,
  activities: PropTypes.arrayOf(PropTypes.object),
};

EntityActivityList.defaultProps = {
  descriptionLength: false,
  activities: [],
};

const mapState = state => ({
  activities: state.activities.activitiesData,
});

const mapDispatch = {
  getDeleteActivityAction,
  getActivitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(EntityActivityList));
