import React from 'react';
import { Icon } from 'antd';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Field.scss';
import CPButton from '../../CP/CPButton';
import {
  deleteFieldAction,
  putFieldAction,
} from '../../../store/formSetting/formSetting.actions';
import CPMessage from '../../CP/CPMessage';
import CPPopConfirm from '../../CP/CPPopConfirm';
import { getLeadFormFieldsAction } from '../../../store/lead/lead.actions';
import withModal from '../../HOC/withModal';
import { removeTableDataFromLocalStorage } from '../../KianTable/helpers/persist';
import { LEADS_TABLE } from '../../../store/settings/settings.constants';
import { MODAL_FOR_ADD_COLUMN } from '../../ModalRoot/repository';
import HandleAclPermission from '../../HandleAclPermission';
import { Actions } from '../../../utils/aclActions';

const Field = props => {
  const { data, type, onChange, index, columnName } = props;

  async function deleteField(fieldId) {
    onChange('delete', index, columnName);
    const response = await props.deleteFieldAction(fieldId);
    if (response?.err) {
      CPMessage('ارتباط با سرور قطع می باشد.', 'error');
    } else {
      CPMessage('فیلد موردنظر با موفقیت حذف گردید.', 'success');
      props.getLeadFormFieldsAction(type);
    }
  }

  const showModal = item => {
    props.showModalAction({
      type: MODAL_FOR_ADD_COLUMN,
      props: {
        type: item?.type,
        initialValue: item,
        editMode: true,
        index,
        columnName,
        onChange,
      },
    });
  };

  // Change fields status
  const changeStatus = async obj => {
    const body = {
      ...obj,
      type,
      status: obj?.status === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE', // check obj status, post vise versa
    };
    const request = await props.putFieldAction(body);
    if (!request?.err) {
      CPMessage('وضعیت فیلد با موفقیت ویرایش گردید.', 'success');
      removeTableDataFromLocalStorage(LEADS_TABLE);
      props.getLeadFormFieldsAction(type);
      onChange('update', body, columnName);
    } else {
      CPMessage('ارتباط با سرور قطع می باشد.', 'error');
    }
  };

  // Check main fields to prevent deactivating
  const isMain = columnCategory => columnCategory === 'OPTIONAL';

  return (
    <div className={s.field}>
      {isMain(data?.columnCategory) && (
        <span className={s.dashes}>
          <Icon type="small-dash" className={cs(s.dash, 'grabber')} />
          <Icon type="small-dash" className={cs(s.dash, 'grabber')} />
        </span>
      )}
      <div className="nonDragArea">
        <b className={s.title}>
          {data?.name}{' '}
          {!isMain(data?.columnCategory) && (
            <small>(امکان غیرفعال کردن این فیلد وجود ندارد.)</small>
          )}
        </b>
        {isMain(data?.columnCategory) && (
          <div className={s.btns}>
            {data?.status === 'ACTIVE' ? (
              <HandleAclPermission wich={Actions.columnUpdateLeadField}>
                <CPPopConfirm
                  okText="بله"
                  title="آیا از تغییر وضعیت فیلد موردنظر اطمینان دارید؟"
                  onConfirm={() => changeStatus(data)}
                  placement="top"
                >
                  <CPButton
                    icon="minus"
                    shape="circle"
                    className="btn default-btn"
                  />
                </CPPopConfirm>
              </HandleAclPermission>
            ) : (
              <HandleAclPermission wich={Actions.columnUpdateLeadField}>
                <CPPopConfirm
                  okText="بله"
                  title="آیا از تغییر وضعیت فیلد موردنظر اطمینان دارید؟"
                  onConfirm={() => changeStatus(data)}
                  placement="top"
                >
                  <CPButton
                    icon="plus"
                    shape="circle"
                    className="btn default-btn"
                  />
                </CPPopConfirm>
              </HandleAclPermission>
            )}
            <HandleAclPermission wich={Actions.columnUpdateLeadField}>
              <CPButton
                icon="edit"
                onClick={() => showModal(data)}
                shape="circle"
                className="btn default-btn"
              />
            </HandleAclPermission>
            <HandleAclPermission wich={Actions.columnDeleteLedField}>
              <CPPopConfirm
                okText="بله"
                title="آیا از حذف فیلد موردنظر اطمینان دارید؟"
                onConfirm={() => deleteField(data?.id)}
                placement="top"
              >
                <CPButton
                  icon="delete"
                  shape="circle"
                  className="btn default-btn"
                />
              </CPPopConfirm>
            </HandleAclPermission>
          </div>
        )}
      </div>
    </div>
  );
};

Field.propTypes = {
  data: PropTypes.object,
  deleteFieldAction: PropTypes.func.isRequired,
  getLeadFormFieldsAction: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
  putFieldAction: PropTypes.func.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  columnName: PropTypes.string,
  index: PropTypes.object,
};

Field.defaultProps = {
  data: null,
  type: '',
  onChange: () => {},
  columnName: '',
  index: null,
};

const mapState = () => ({});

const mapDispatch = {
  deleteFieldAction,
  getLeadFormFieldsAction,
  putFieldAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(withModal(Field)));
export const FieldTest = Field;
