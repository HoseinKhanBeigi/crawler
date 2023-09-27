import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './EntityDrawer.scss';
import CPDrawer from '../../components/CP/CPDrawer';
import EntityProfileMiniInfo from '../../components/EntityProfileMiniInfo/EntityProfileMiniInfo';
import EntityActivityTabForm from '../../components/EntityActivityTabForm/EntityActivityTabForm';
import EntityLeftColumn from '../../components/EntityLeftColumn/EntityLeftColumn';
import SendEmailForm from '../Forms/SendEmailForm';
import SendSmsForm from '../Forms/SendSmsForm/SendSmsForm';
import ChooseLogActivity from '../ChooseLogActivity';
import EntityRightColumn from '../EntityRightColumn/EntityRightColumn';

class EntityDrawer extends React.Component {
  // close drawer
  onClose = () => {
    this.props.handleVisible(false);
  };

  onClick = event => {
    event.stopPropagation();
  };

  addNewDropDownFunc = (key, name) => {
    if (key === 1) {
      this.setState({
        [name]: true,
      });
    }
  };

  handleCancel = (e, name) => {
    this.setState({
      [name]: false,
    });
  };

  render() {
    const { visible } = this.props;
    const { leadInfo } = this.props;

    // Please add TODO: if change leadInfo to levantId, fix this code.
    const tabs = [
      {
        key: 1,
        tab: 'ارسال پیامک',
        children: <SendSmsForm levantId={[leadInfo?.partyPerson?.levantId]} />,
      },
      {
        key: 2,
        tab: 'ارسال ایمیل',
        children: <SendEmailForm levantId={leadInfo?.partyPerson?.levantId} />,
      },
      {
        key: 3,
        tab: 'گزارش فعالیت',
        children: (
          <ChooseLogActivity
            levantId={leadInfo?.partyPerson?.levantId}
            mobilePhone={leadInfo?.partyPerson?.mobilePhone}
          />
        ),
      },
    ];

    const drawerTab = [
      {
        key: '3',
        tab: 'متعلقات',
        children: <EntityLeftColumn fullWidth />,
      },
      {
        key: '2',
        tab: 'فعالیت',
        children: (
          <div className={s.wrapper}>
            <EntityActivityTabForm hasShadow data={tabs} defaultKey="3" />
          </div>
        ),
      },
      {
        key: '1',
        tab: 'جزئیات',
        children: (
          <EntityRightColumn
            levantId={leadInfo?.partyPerson?.levantId}
            fullWidth
          />
        ),
      },
    ];

    return (
      <div className={s.leads}>
        <CPDrawer
          title={<EntityProfileMiniInfo levantId={leadInfo?.levantId} />}
          placement="left"
          onClose={this.onClose}
          visible={visible}
          closable
          inDrawer
          mask
          maskClosable
        >
          <EntityActivityTabForm inDrawer data={drawerTab} defaultKey="1" />
        </CPDrawer>
      </div>
    );
  }
}

EntityDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  leadInfo: PropTypes.object,
  handleVisible: PropTypes.func.isRequired,
};

EntityDrawer.defaultProps = {
  leadInfo: null,
};

const mapStateToProps = state => ({
  leadsData: state.leads.data,
  leadInfo: state.lead.data,
  personInfoData: state.person.personInfoData,
  taskListData: state.task.taskListData,
  opportunityListData: state.opportunity.data,
});

const mapDispatch = {};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(EntityDrawer));
export const EntityDrawerTest = EntityDrawer;
