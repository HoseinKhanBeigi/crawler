import React from 'react';
import PropTypes from 'prop-types';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './Sessions.scss';
import KianTable from '../../components/KianTable/KianTable';
import { columns } from './utils/columns';
import { searchData } from './utils/searchSchema';
import withModal from '../../components/HOC/withModal';
import { SESSION_LIST_TABLE } from '../../store/settings/settings.constants';
import {
  DRAWER_FOR_EDIT_SESSION_DETAIL,
  DRAWER_FOR_VIEW_SESSION_DETAIL,
  MODAL_FOR_ADD_SESSION,
} from '../../components/ModalRoot/repository';
import { getTemplatesAction } from '../../store/phoneCalls/phoneCalls.actions';
import { getFullSearchAction } from '../../store/fullSearch/fullSearch.actions';
import useSessionForm from './hooks/useSessionForm';
import { Actions } from '../../utils/aclActions';

const Sessions = props => {
  const activityButton = [
    {
      label: 'جلسه جدید',
      icon: 'plus',
      authority: Actions.sessionCreate,
      action: () =>
        props.showModalAction({
          type: MODAL_FOR_ADD_SESSION,
        }),
    },
  ];
  const {
    handleSessionForSearch,
    handleAttendeesSearch,
    attendeesList,
    crmUsers,
    sessionForUsersList,
  } = useSessionForm(props.getFullSearchAction, props.getTemplatesAction);

  const showModal = type => modalProps => () => {
    props.showModalAction({
      type,
      props: modalProps,
    });
  };

  const contextMenu = [
    {
      label: `مشاهده`,
      authority: Actions.sessionLoad,
      action: row =>
        showModal(DRAWER_FOR_VIEW_SESSION_DETAIL)({
          data: row,
        })(),
    },
    {
      label: `ویرایش`,
      authority: Actions.sessionCreate,
      action: row =>
        showModal(DRAWER_FOR_EDIT_SESSION_DETAIL)({
          data: row,
        })(),
    },
  ];
  return (
    <div className={s.wrapper}>
      <KianTable
        searchData={searchData(
          props.templates,
          crmUsers,
          handleAttendeesSearch,
          attendeesList,
          handleSessionForSearch,
          sessionForUsersList,
        )}
        bordered={false}
        endpoint="session"
        activityButton={activityButton}
        withSort={false}
        tableId={SESSION_LIST_TABLE}
        contextMenu={contextMenu}
        columns={columns}
        headerTitle="جلسات"
        persistInLocalStorage={false}
      />
    </div>
  );
};

Sessions.defaultProps = {
  templates: [],
};

Sessions.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  getTemplatesAction: PropTypes.func.isRequired,
  getFullSearchAction: PropTypes.func.isRequired,
  templates: PropTypes.array,
};

const mapStateToProps = state => ({
  templates: state.phoneCalls.session,
});

const mapDispatchToProps = {
  getFullSearchAction,
  getTemplatesAction,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyle(s)(withModal(Sessions)));
