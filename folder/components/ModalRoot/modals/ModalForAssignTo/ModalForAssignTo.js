import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import cs from 'classnames';
import s from './ModalForAssignTo.scss';
import CPModal from '../../../CP/CPModal';
import CPSelect from '../../../CP/CPSelect';
import CPButton from '../../../CP/CPButton';
import CPMessage from '../../../CP/CPMessage';
import { getLeadsUsersAction } from '../../../../store/leads/leads.actions';
import { postAssignsAction } from '../../../../store/assign/assign.actions';
import CPRadio from '../../../CP/CPRadio';
import { MODAL_FOR_ASSIGN_TO } from '../../repository';

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
  const { className, selectedLeads, myLevantId, deSelectRows } = props;
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
        const users = await props.getLeadsUsersAction();
        const AllUsers = [];
        users.map(user => {
          AllUsers.push({
            value: user.levantId,
            text: `${user.firstName} ${user.lastName}`,
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

  async function handleSubmit() {
    if (checked) {
      setAssignUsers(myLevantId);
    }

    const body = {
      ownerLevantId: assignUser,
      relevantLevantIds: selectedLeads,
    };

    const assigns = await props.postAssignsAction(body);

    if (assigns === 'OK') {
      CPMessage('عملیات اختصاص دادن با موفقیت انجام شد.', 'success');
      deSelectRows();
      closeModal();
    } else {
      CPMessage('عملیات اختصاص دادن با مشکل مواجه شد.', 'error');
    }
  }

  function handleChange(e) {
    setChecked(e.target.value);
    if (!checked) {
      setAssignUsers(myLevantId);
    }
  }

  function onSelect(e) {
    if (checked) {
      setAssignUsers(myLevantId);
    } else if (!checked) {
      setAssignUsers(e);
    }
  }

  if (allUsers?.length > -1) {
    return (
      <div className={cs('assignModal', className)}>
        <CPModal
          className={cs('SaveSearchResultModal', className)}
          title={`اختصاص دادن ${selectedLeads.length} سرنخ انتخابی به:`}
          visible={visible}
          onCancel={closeModal}
          footer={null}
          modalType={MODAL_FOR_ASSIGN_TO}
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
        </CPModal>
      </div>
    );
  }
  return 'خطایی رخ داده است';
};

ModalForAssignTo.propTypes = {
  className: PropTypes.string,
  selectedLeads: PropTypes.array,
  myLevantId: PropTypes.string,
  postAssignsAction: PropTypes.func,
  deSelectRows: PropTypes.func,
};

ModalForAssignTo.defaultProps = {
  className: '',
  getLeadsUsersAction: () => {},
  selectedLeads: [],
  myLevantId: '',
  postAssignsAction: () => {},
  deSelectRows: () => {},
};

const mapStateToProps = state => ({
  leadsData: state.leads.data,
  listLoading: state.leads.loading,
  leadsDataError: state.leads.error,
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
