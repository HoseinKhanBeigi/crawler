import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './DrawerForGroupAssign.scss';
import CPSelect from '../../../CP/CPSelect';
import CPButton from '../../../CP/CPButton';
import CPMessage from '../../../CP/CPMessage';
import { getLeadsUsersAction } from '../../../../store/leads/leads.actions';
import { postAssignsAction } from '../../../../store/assign/assign.actions';
import CPRadio from '../../../CP/CPRadio';
import { DRAWER_FOR_GROUP_ASSIGN_TO } from '../../repository';
import KianDrawer from '../../../KianDrawer/KianDrawer';

const assignTypes = [
  {
    value: true,
    name: 'خودم',
  },
  {
    value: false,
    name: 'ارسال به دیگران',
  },
];

const ModalForAssignTo = props => {
  const {
    selectedLeads,
    myLevantId,
    deSelectRows,
    type: leadType,
    ids: leadIds,
    currentUnitId,
  } = props;
  const [checked, setChecked] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [assignUser, setAssignUsers] = useState(myLevantId);
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    (async () => {
      if (selectedLeads?.length > 0) {
        const users = await props.getLeadsUsersAction(currentUnitId);
        const AllUsers = [];
        users.map(user => {
          AllUsers.push({
            value: user.levantId,
            text: `${user.fullName}`,
          });
          return AllUsers;
        });
        // eslint-disable-next-line react/no-did-mount-set-state
        setAllUsers(AllUsers);
      } else {
        closeModal();
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (checked) {
      setAssignUsers(myLevantId);
    }

    const body = {
      ownerLevantId: assignUser,
      relevantLevantIds: selectedLeads,
    };
    if (leadIds?.length > 0) body.leadIds = leadIds;
    const assigns = await props.postAssignsAction(body, leadType);

    if (assigns === 'OK') {
      CPMessage('عملیات اختصاص دادن با موفقیت انجام شد.', 'success');
      deSelectRows();
      closeModal();
    } else {
      CPMessage('عملیات اختصاص دادن با مشکل مواجه شد.', 'error');
    }
  };

  const handleChange = e => {
    setChecked(e.target.value);
    if (!checked) {
      setAssignUsers(myLevantId);
    }
  };

  const onSelect = e => {
    if (checked) {
      setAssignUsers(myLevantId);
    } else if (!checked) {
      setAssignUsers(e);
    }
  };

  if (allUsers?.length > -1) {
    return (
      <KianDrawer
        title={`اختصاص دادن ${selectedLeads.length} سرنخ انتخابی به:`}
        visible={visible}
        onCancel={closeModal}
        onClose={closeModal}
        drawerId={DRAWER_FOR_GROUP_ASSIGN_TO}
      >
        <p className={s.text}>می خواهید به چه فردی اختصاص دهید؟</p>
        <CPRadio
          className="margin-b-10"
          model={assignTypes}
          size="small"
          value={checked}
          onChange={handleChange}
        />
        {!checked && (
          <CPSelect
            className={s.select}
            dataSource={allUsers}
            placeholder="انتخاب افراد"
            onChange={onSelect}
          />
        )}
        <CPButton type="submit" className={s.btn} onClick={handleSubmit}>
          اختصاص دادن
        </CPButton>
      </KianDrawer>
    );
  }
  return 'خطایی رخ داده است';
};

ModalForAssignTo.propTypes = {
  getLeadsUsersAction: PropTypes.func.isRequired,
  selectedLeads: PropTypes.array,
  myLevantId: PropTypes.string,
  postAssignsAction: PropTypes.func,
  deSelectRows: PropTypes.func,
  currentUnitId: PropTypes.number.isRequired,
  type: PropTypes.string,
  ids: PropTypes.string,
};

ModalForAssignTo.defaultProps = {
  selectedLeads: [],
  myLevantId: '',
  postAssignsAction: () => {},
  deSelectRows: () => {},
  type: null,
  ids: null,
};

const mapStateToProps = state => ({
  leadsData: state.leads.data,
  listLoading: state.leads.loading,
  leadsDataError: state.leads.error,
  currentUnitId: state.user?.currentUserInfoEmployee?.unit?.id,
  myLevantId: state.neshanAuth?.jwt?.levantId,
});

const mapDispatch = {
  getLeadsUsersAction,
  postAssignsAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForAssignTo));
export const ModalForAssignToTest = ModalForAssignTo;
