/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import { Collapse } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getContactsByLevantIdAction } from '../../store/lead/lead.actions';
import { getUserTagsListAction } from '../../store/tag/tag.actions';
import s from './EntityDetailsInfo.scss';
import CPMessage from '../CP/CPMessage';
import RenderDetails from './RenderDetails/RenderDetails';
import RenderBankAccountInfo from './RenderBankInfo/RenderBankInfo';
import RenderContactInfo from './RenderContactsInfo/RenderContactsInfo';
import RenderProducts from './RenderProducts/RenderProducts';
import RenderPersonalInfo from './RenderPersonalInfo/RenderPersonalInfo';
import RenderTagInfo from './RenderTagInfo/RenderTagInfo';
import RenderLeadChannel from './RenderLeadChannel/RenderLeadChannel';
import { getUserActivitiesAction } from '../../store/newActivities/newActivities.actions';
import { pageSizeInTableList } from '../../webConfig';
import RenderRelations from './RenderRelations/RenderRelations';
import CPLoading from '../CP/CPLoading';
import { leadChannelType } from '../../routes/leads/tableData';

const params = `page=0&size=${pageSizeInTableList}`;
const { Panel } = Collapse;
class EntityDetailsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.updatePanelDisplayStatus = this.updatePanelDisplayStatus.bind(this);
    this.state = {
      contacts: null,
      tagPanelDisplay: true,
    };
  }

  async componentDidMount() {
    const { levantId } = this.props;
    await this.props.getUserTagsListAction(levantId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.levantId !== this.props.levantId) {
      this.setState({
        contacts: null,
      });
    }
  }

  refreshUserTagsList = async () => {
    const { levantId } = this.props;
    await this.props.getUserTagsListAction(levantId);
  };

  leadChannelTranslator = type =>
    leadChannelType.filter(item =>
      item.value === type && type !== null ? item : false,
    );

  updatePanelDisplayStatus = () => {
    this.setState({ tagPanelDisplay: false });
  };
  submitUnMask = async () => {
    const { levantId } = this.props;
    const response = await this.props.getContactsByLevantIdAction(levantId);

    if (response) {
      this.setState({
        contacts: response?.contactList?.map(address => address),
      });
      this.props.getUserActivitiesAction({
        levantId,
        pagination: params,
      });
    } else {
      CPMessage('ارتباط با سرور قطع می باشد.', 'error');
    }
  };

  render() {
    const { data, levantId, userTagsList, userTagListLoading } = this.props;
    const { contacts } = this.state;
    return (
      <div className={s.columnsBodyInfo}>
        {data?.map(item => (
          <Collapse key={item.id} defaultActiveKey={['1']}>
            {item.personalInfo && (
              <Panel header={<b>اطلاعات کاربر</b>} key="1">
                <RenderPersonalInfo data={item?.personalInfo} />
              </Panel>
            )}
            {item.productList?.length > 0 && (
              <Panel header={<b>محصولات</b>} key="2">
                <RenderProducts data={item?.productList} />
              </Panel>
            )}
            {item.bankAccounts?.length > 0 && (
              <Panel header={<b>اطلاعات حساب بانکی</b>} key="3">
                <RenderBankAccountInfo data={item?.bankAccounts} />
              </Panel>
            )}
            {item.contacts?.length > 0 && (
              <Panel header="نشانی" key="4">
                <RenderContactInfo
                  data={contacts || item.contacts}
                  contacts={contacts}
                />
              </Panel>
            )}
            {item.otherInfoList?.length > 0 && (
              <Panel header={<b>سایر اطلاعات</b>} key="5">
                <RenderDetails data={item?.otherInfoList} />
              </Panel>
            )}
            {item.relationsList?.length > 0 && (
              <Panel header={<b>ارتباطات</b>} key="6">
                <RenderRelations data={item?.relationsList} />
              </Panel>
            )}
            {userTagsList !== null && userTagsList?.length > 0 && (
              <Panel
                header={<b>برچسب ها</b>}
                key="7"
                className={
                  this.state.tagPanelDisplay === true ? 'display' : 'hidden'
                }
              >
                <CPLoading
                  spinning={userTagListLoading}
                  delay={100}
                  tip="به روزرسانی لیست برچسب ها..."
                  wrapperClassName="Loading"
                >
                  <RenderTagInfo
                    tags={userTagsList}
                    onCloseTag={this.refreshUserTagsList}
                    levantId={levantId}
                    profileType={data[0]?.profileType}
                    displayHandler={this.updatePanelDisplayStatus}
                  />
                </CPLoading>
              </Panel>
            )}
            {item.leadGenerationChannel !== undefined && (
              <Panel header={<b>کانال ورودی</b>} key="8">
                <RenderLeadChannel
                  leadChannelGeneration={item.leadGenerationChannel}
                  leadChannelTranslator={this.leadChannelTranslator}
                />
              </Panel>
            )}
          </Collapse>
        ))}
      </div>
    );
  }
}

EntityDetailsInfo.propTypes = {
  levantId: PropTypes.string,
  userTagsList: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object),
  getUserActivitiesAction: PropTypes.func.isRequired,
  getContactsByLevantIdAction: PropTypes.func.isRequired,
  getUserTagsListAction: PropTypes.func.isRequired,
  userTagListLoading: PropTypes.bool,
};

EntityDetailsInfo.defaultProps = {
  data: null,
  levantId: null,
  userTagsList: null,
  userTagListLoading: false,
};

const mapStateToProps = state => ({
  userTagsList: state.tag.userTagsList,
  userTagListLoading: state.tag.postUnTagsLoading,
});

const mapDispatch = {
  getContactsByLevantIdAction,
  getUserActivitiesAction,
  getUserTagsListAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(EntityDetailsInfo));
