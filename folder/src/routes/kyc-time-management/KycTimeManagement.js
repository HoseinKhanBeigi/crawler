import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import saveAs from 'file-saver';
import { connect } from 'react-redux';
import { Empty, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './KycTimeManagement.scss';
import Link from '../../components/Link';
import CPButton from '../../components/CP/CPButton';
import CPAlert from '../../components/CP/CPAlert';
import CPModal from '../../components/CP/CPModal';
import Toolbar from '../../components/Toolbar/Toolbar';
import KycCapacityForm from '../../components/KycCapacityForm';
import {
  getMeetingScheduleExcelAction,
  getMeetingsManagementAction,
  postKycCapacityManagementAction,
} from '../../store/kycCapacityManagement/kycCapacityManagement.actions';
import CPMessage from '../../components/CP/CPMessage';
import UnMaskMobileNumber from '../../components/UnMaskMobileNumber';
import { Actions } from '../../utils/aclActions';

const moment = require('moment-jalaali');

const toolbarAddDropDownOption = [
  {
    key: 1,
    name: 'افزودن ظرفیت',
    value: 'plus',
    authority: Actions.addKycTimeManagement,
    icon: 'plus',
  },
  {
    key: 2,
    name: 'دریافت خروجی اکسل',
    value: 'excel',
    authority: Actions.downloadKycTimeManagementExcel,
    icon: 'file-excel',
  },
];

class KycTimeManagement extends React.Component {
  static propTypes = {
    meetingData: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.object,
    getMeetingScheduleExcelAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: null,
  };

  constructor(props) {
    super(props);
    const firstDate =
      this.props.meetingData && this.props.meetingData.map(item => item.date); // get first date of data for initial state
    this.state = {
      selectedData: firstDate && firstDate[0],
      modalCapacityFormVisible: false,
      editModeFormData: null,
    };
  }

  /**
   * this method get date of data.
   * @returns { component }
   * author f.ghasemkhani@kian.digital
   */
  getDate = () => {
    const { meetingData } = this.props;
    if (meetingData) {
      return meetingData.map(item => {
        moment.loadPersian({ dialect: 'persian-modern' });
        const day = moment(item.date).format('dddd jYYYY/jM/jD');
        return (
          <CPButton
            key={day}
            className={cs(
              'btn time-btn',
              this.state.selectedData === item.date ? 'active' : '',
            )}
            onClick={() => this.getUsersList(item.date)}
          >
            {day}
          </CPButton>
        );
      });
    }
    return true;
  };

  getUsersList = date => {
    this.setState({
      selectedData: date,
    });
  };

  /**
   * this method close modal capacity form, when click cancel form.
   * author m.savalanpour@kian.digital
   */
  handleCancel = () => {
    this.setState({
      modalCapacityFormVisible: false,
      editModeFormData: null,
    });
  };

  // Get date from now up to 7 days later
  returnPeriodOfDate = () => {
    const date = new Date();
    moment.loadPersian({ dialect: 'persian-modern' });
    const now = moment(date).format('jD/jM/jYYYY');
    const later = moment(date.setDate(date.getDate() + 7)).format(
      'jD/jM/jYYYY',
    );

    return ` لیست زمانبندی از تایخ ${now} تا تاریخ ${later}`;
  };

  addNewDropDownFunc = async e => {
    if (e === 'plus') {
      this.setState({
        modalCapacityFormVisible: true,
      });
    }

    if (e === 'excel') {
      const response = await this.props.getMeetingScheduleExcelAction();
      if (response) {
        try {
          saveAs(response, `${this.returnPeriodOfDate()}.xlsx`);
        } catch (index) {
          CPMessage('خطا در دریافت فایل اکسل', 'error');
        }
      } else {
        CPMessage('لطفا مجددا تلاش نمایید.', 'error');
      }
    }
  };

  formatTime = time => moment(time).format('HH:mm');

  renderEmptyCapacity = () => (
    <React.Fragment>
      <Toolbar
        addNewDropDown
        addNewDropDownOverlay={this.toolbarAddDropDownOption}
        addNewDropDownFunc={this.addNewDropDownFunc}
      />
      <div className={s.noData}>
        <p>داده ای موجود نیست.</p>
      </div>
    </React.Fragment>
  );

  renderData = () => {
    const { meetingData } = this.props;
    const { selectedData } = this.state;
    return meetingData.map(items => {
      if (items.date === selectedData) {
        return items.timeRanges.map(item => (
          <div className={s.card} key={item.from}>
            <span className={s.times}>
              <Icon
                type="edit"
                className={s.edit}
                onClick={() => {
                  this.setState({
                    modalCapacityFormVisible: true,
                    editModeFormData: item,
                  });
                }}
              />
              <Icon type="clock-circle" /> {this.formatTime(item.to)} -{' '}
              {this.formatTime(item.from)}
              <div className={s.capacityCount}>
                ظرفیت خالی
                <span className={s.count}> {item.capacity} نفر </span>
              </div>
            </span>
            {item.userList.map(user => (
              <div className={s.users} key={user.id}>
                <Link to={`/lead/${user.levantId}`} key={user.id}>
                  {user.firstName} {user.lastName}
                </Link>
                <UnMaskMobileNumber
                  popConfirmTitle="آیا مایل به مشاهده کامل شماره همراه هستید؟"
                  levantId={user.levantId}
                  title={user.mobilePhone}
                  id={user.mobilePhoneDTO?.partyLocationId}
                  openModal={false}
                />
              </div>
            ))}
          </div>
        ));
      }
      return null;
    });
  };

  render() {
    const { meetingData, error } = this.props;
    const { modalCapacityFormVisible, editModeFormData } = this.state;

    if (error) {
      return (
        <div className={s.alert}>
          <CPAlert
            type="error"
            message="خطا"
            description="ارتباط با سرور قطع می باشد."
          />
        </div>
      );
    }

    return (
      <div className={s.kyc}>
        <Toolbar
          addNewDropDown
          addNewDropDownOverlay={toolbarAddDropDownOption}
          addNewDropDownFunc={e => this.addNewDropDownFunc(e)}
        />
        {!meetingData?.length ? (
          <div className={s.noData}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        ) : (
          <div className={s.schedule}>
            <React.Fragment>
              <div className={s.timeManagement}>{this.getDate()}</div>
              <div className={s.cards}>{this.renderData()}</div>
            </React.Fragment>
          </div>
        )}
        <CPModal
          title="افزودن ظرفیت"
          visible={modalCapacityFormVisible}
          onCancel={this.handleCancel}
          footer={null}
          width={400}
        >
          <KycCapacityForm
            onSubmit={this.handleCancel}
            handleCancel={this.handleCancel}
            editModeFormData={editModeFormData}
          />
        </CPModal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meetingData: state.kycCapacityManagement.meetingsManagementData,
  error: state.kycCapacityManagement.meetingsManagementError,
});

const mapDispatch = {
  getMeetingsManagementAction,
  postKycCapacityManagementAction,
  getMeetingScheduleExcelAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(KycTimeManagement));
