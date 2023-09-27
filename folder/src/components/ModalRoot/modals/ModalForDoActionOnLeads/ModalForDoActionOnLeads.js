import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import { Icon, Radio } from 'antd';
import s from './ModalForDoActionOnLeads.scss';
import CPModal from '../../../CP/CPModal';
import CPButton from '../../../CP/CPButton';
import CPAlert from '../../../CP/CPAlert';
import CPMessage from '../../../CP/CPMessage';
import { postDoActionForLeadAction } from '../../../../store/leads/leads.actions';
import { MODAL_FOR_DO_ACTION_ON_LEADS } from '../../repository';

const types = [
  {
    value: 'NEW',
    name: 'جدید',
  },
  {
    value: 'OPEN',
    name: 'باز',
  },
  {
    value: 'QUALIFIED',
    name: 'واجد شرایط',
  },
  {
    value: 'UNQUALIFIED',
    name: 'غیر واجد شرایط',
  },
  {
    value: 'CONNECTED',
    name: 'متصل',
  },
  // {
  //   value: 'CUSTOMER',
  //   name: 'مشتری',
  // },
];

const ModalForDoActionOnLeads = props => {
  const [checked, setState] = useState(types?.[0]?.value);
  const [visible, setVisible] = useState(true);
  const {
    className,
    selectedLeads,
    loading,
    modalData,
    deSelectRows,
    type: leadType,
    ids: leadIds,
  } = props;

  const closeModal = () => {
    setVisible(false);
  };

  const onChange = e => {
    setState(e.target.value);
  };

  const submit = async () => {
    const body = {
      status: modalData?.type === 'update' ? checked : 'JUNK',
      levantIds: selectedLeads,
    };
    if (leadIds?.length > 0) body.leadIds = leadIds;
    const response = await props.postDoActionForLeadAction(body, leadType);
    if (response.status === 'OK') {
      CPMessage('باموفقیت انجام شد.', 'success');
      deSelectRows();
      setState(types?.[0]?.value);
      closeModal();
    } else {
      CPMessage('ارتباط با سرور قطع می باشد.', 'error');
      closeModal();
      setState(types?.[0]?.value);
    }
  };

  // render update content
  const renderRadios = () => (
    <Radio.Group
      onChange={onChange}
      defaultValue={types?.[0]?.value}
      buttonStyle="solid"
    >
      {types.map(item => (
        <Radio.Button value={item.value}>{item.name}</Radio.Button>
      ))}
    </Radio.Group>
  );

  // render delete content
  const renderDeleteConfirm = () => (
    <div className={s.deleteWrapper}>
      <Icon type="warning" />
      <p>آیا از حذف افراد انتخاب شده اطمینان دارید؟</p>
    </div>
  );

  // render based on type of action
  const renderContent = value => {
    switch (value) {
      case 'update':
        return renderRadios();
      case 'delete':
        return renderDeleteConfirm();
      default:
        return null;
    }
  };

  return (
    <CPModal
      title={modalData?.title}
      visible={visible}
      footer={false}
      className={cs(s.modalForUpdateLeadStatus, className)}
      width={515}
      onCancel={closeModal}
      modalType={MODAL_FOR_DO_ACTION_ON_LEADS}
    >
      <div className="row">
        <div className="col-md-12 margin-b-10">
          {!selectedLeads?.length && (
            <CPAlert type="info" description="هیچ فردی  انتخاب نشده است." />
          )}
        </div>
        <div className="col-md-12">{renderContent(modalData?.type)}</div>
        <div className="col-md-12 text-left">
          <br />
          <CPButton onClick={closeModal}>انصراف</CPButton>
          <CPButton
            loading={loading}
            onClick={submit}
            disabled={!selectedLeads?.length}
            className="margin-r-10 btn primary-btn"
          >
            ثبت
          </CPButton>
        </div>
      </div>
    </CPModal>
  );
};

ModalForDoActionOnLeads.propTypes = {
  className: PropTypes.string,
  postDoActionForLeadAction: PropTypes.func.isRequired,
  selectedLeads: PropTypes.array,
  loading: PropTypes.bool,
  modalData: PropTypes.object,
  deSelectRows: PropTypes.func,
  type: PropTypes.string,
  ids: PropTypes.string,
};

ModalForDoActionOnLeads.defaultProps = {
  className: null,
  selectedLeads: null,
  loading: null,
  modalData: null,
  deSelectRows: () => {},
  type: null,
  ids: null,
};

const mapState = state => ({
  loading: state.leads.postDoActionForLeadLoading,
});

const mapDispatch = {
  postDoActionForLeadAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForDoActionOnLeads));
export const ModalForDoActionOnLeadsTest = ModalForDoActionOnLeads;
