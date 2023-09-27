import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { schema } from './schema';
import CPMessage from '../CP/CPMessage';
import {
  getTemplatesAction,
  postAddCallDetailsAction,
} from '../../store/phoneCalls/phoneCalls.actions';
import { pageSizeInTableList } from '../../webConfig';
import {
  getCrmActivitiesAction,
  postContactAction,
} from '../../store/newActivities/newActivities.actions';
import { getPartyPhoneNumberByLevantIdAction } from '../../store/lead/lead.actions';
import { anyModalOpen } from '../../store/opportunities/opportunities.actions';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import FormBuilder from '../FormBuilder';
import SearchFilterWithDetailBox from '../SearchFilterWithDetailBox';
import partyService from '../../service/partyService';

const params = `page=0&size=${pageSizeInTableList}`;

function mapPhone(value) {
  if (/^(09(\d{9}))$/.test(value)) {
    return {
      phoneNumber: value,
      tel: null,
      telPrefix: null,
    };
  } else if (/^(0[1-8](\d{9}))$/.test(value)) {
    return {
      tel: value.substring(3, 11),
      telPrefix: value.substring(0, 3),
      phoneNumber: null,
    };
  }
  return false;
}

class PhoneLogActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitFormLoading: false,
      callDetail: null,
      date: null,
      visibileFollowUpInput: false,
      searchDetail: [],
      phoneNumbersDetail: [],
    };
  }

  async componentDidMount() {
    await this.props.getTemplatesAction('CALL');
    if (!this.props.withSearch) {
      partyService
        .getPersonContactInfoByLevantId(this.props.callerId)
        .then(response => this.setPhoneNumbersOptions(response));
    }
  }

  setPhoneNumbersOptions = resp => {
    const { mobile, mobilePhone, homeAddressInfo, workAddressInfo } = resp;

    const phones = [];

    if (mobile || mobilePhone) {
      phones.push({
        value: mobile || mobilePhone,
        label: `${mobile || mobilePhone} (شماره همراه) `,
      });
    }

    if (homeAddressInfo.tel) {
      phones.push({
        value: homeAddressInfo.telPrefix + homeAddressInfo.tel,
        label: `${`${homeAddressInfo.telPrefix}-${homeAddressInfo.tel}`} (شماره محل سکونت) `,
      });
    }

    if (workAddressInfo.tel) {
      phones.push({
        value: workAddressInfo.telPrefix + workAddressInfo.tel,
        label: `${`${workAddressInfo.telPrefix}-${workAddressInfo.tel}`} (شماره محل کار) `,
      });
    }

    this.setState({
      phoneNumbersDetail: phones,
    });
  };

  handleSetDate = (value, name) => {
    const newDate = { value, name };
    this.setState({ date: newDate });
  };

  handleSubmit = async formData => {
    const { callDetail } = this.state;
    const { levantId: callerLevantId } = callDetail || this.props.partyPerson;
    const mappedPhone = mapPhone(formData.phone);
    const body = {
      callerLevantId,
      levantId: this.props.levantId,
      context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
      [this.state.date?.name]: this.state.date?.value,
      ...formData,
      ...mappedPhone,
    };
    const result = await this.props.postAddCallDetailsAction(body);
    if (!result.err) {
      CPMessage('با موفقیت ثبت شد.', 'success');
      this.props.anyModalOpen();
      this.props.onSubmit();
      await this.props.getCrmActivitiesAction({
        levantId: this.props.levantId,
        pagination: params,
      });
    } else CPMessage(result?.text, 'error');
  };

  handleSearchItemClick = d => {
    this.setState({ callDetail: d });
    const { firstName, lastName, name } = d;
    if (firstName || lastName) {
      this.setState({
        searchDetail: [
          { value: firstName, label: 'نام' },
          { value: lastName, label: 'نام خانوادگی' },
        ],
      });
    }
    if (name) {
      this.setState({
        searchDetail: [{ value: name, label: 'نام' }],
      });
    }
    this.setPhoneNumbersOptions(d);
  };

  handleVisibileFollowUpInput = value =>
    this.setState({ visibileFollowUpInput: value });

  render() {
    const { templates: phoneCallTypes, withSearch } = this.props;
    return (
      <>
        {withSearch && (
          <SearchFilterWithDetailBox
            lists={this.state.searchDetail}
            onClickItem={this.handleSearchItemClick}
          />
        )}
        <FormBuilder
          schema={schema(
            phoneCallTypes,
            this.handleSetDate,
            this.state.visibileFollowUpInput,
            this.handleVisibileFollowUpInput,
            this.state.phoneNumbersDetail,
          )}
          onSubmit={this.handleSubmit}
          layout="vertical"
          submitLabel="ثبت تماس"
          loading={this.state.submitFormLoading}
        />
      </>
    );
  }
}

PhoneLogActivityForm.propTypes = {
  levantId: PropTypes.string,
  anyModalOpen: PropTypes.func.isRequired,
  getCrmActivitiesAction: PropTypes.func.isRequired,
  getTemplatesAction: PropTypes.func.isRequired,
  templates: PropTypes.arrayOf(PropTypes.object),
  // getAllContactsAction: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  withSearch: PropTypes.bool,
  postAddCallDetailsAction: PropTypes.func.isRequired,
  partyPerson: PropTypes.object,
  callerId: PropTypes.string,
};

PhoneLogActivityForm.defaultProps = {
  onSubmit: () => {},
  levantId: null,
  templates: null,
  withSearch: false,
  partyPerson: {},
  callerId: null,
};

const mapStateToProps = state => ({
  activity: state.activities.activityData,
  activityLoading: state.activities.postCreateCallActivityLoading,
  callCategoriesData: state.phoneCalls.getPhoneCallsPatternsData,
  templates: state.phoneCalls.call,
  contacts: state.newActivities.getAllContactsData,
  levantId: state.neshanAuth?.jwt?.levantId,
  partyPerson: state?.lead?.data?.partyPerson,
  callerId: state?.lead?.data?.levantId,
});

const mapDispatch = {
  getCrmActivitiesAction,
  anyModalOpen,
  getTemplatesAction,
  postContactAction,
  // getAllContactsAction,
  getPartyPhoneNumberByLevantIdAction,
  postAddCallDetailsAction,
};

export default connect(mapStateToProps, mapDispatch)(PhoneLogActivityForm);
