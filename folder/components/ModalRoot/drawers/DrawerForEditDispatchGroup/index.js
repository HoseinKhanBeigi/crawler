/* eslint-disable import/first */
import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import { DRAWER_FOR_EDIT_DISPATCH_GROUP } from '../../repository';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';
import { Checkbox, Col, Row } from 'antd';
import CPButton from '../../../CP/CPButton/CPButton';
import CPInput from '../../../CP/CPInput/CPInput';
import DateSelectForm from '../../../../routes/operation-mgmt/DispatchesManagement/StepsNewGroups/StepDate/DateSelectForm';
import {
  getAplicationsDispatchGroup,
  updateDispatchGroup,
} from '../../../../service/dispatchGroupServices';
import SelectBranchInAddGroup from '../../../../routes/operation-mgmt/DispatchesManagement/StepsNewGroups/StepLocation/SelectBranchInAddGroup';
import useSelectLocation from '../../../../routes/operation-mgmt/DispatchesManagement/StepsNewGroups/StepLocation/hook';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { DISPATCH_GROUP_TABLE } from '../../../../store/settings/settings.constants';

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'addApp':
      return {
        ...state,
        appSelected: [...state.appSelected, action.payload],
      };
    case 'addApps':
      return {
        ...state,
        displayBtnAddApp: false,
        applications: [...action.payload],
      };
    case 'remove':
      return {
        ...state,
        appSelected: [...state.appSelected].filter(
          ({ id }) => id !== action.payload,
        ),
      };
    case 'change':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const DrawerForEditDispatchGroup = props => {
  const [visible, setVisible] = useState(true);
  const [state, dispatch] = useReducer(reducer, {
    ...props,
    appSelected: props.applications,
    type: props.fromDate ? 'fromDate' : 'fromDays',
    displayBtnAddApp: true,
  });
  const { branchesAddedList, onAddBranch, onRemoveBranch } = useSelectLocation(
    Object.entries(props.branches).map(([value, text]) => ({ text, value })),
  );
  const closeDrawer = () => {
    setVisible(false);
  };
  const onChangeStatus = (e, item) => {
    if (e.target.checked === true) dispatch({ type: 'addApp', payload: item });
    if (e.target.checked === false)
      dispatch({ type: 'remove', payload: item.id });
  };
  const getApplicationList = async () => {
    const response = await getAplicationsDispatchGroup();
    if (response?.result)
      dispatch({ type: 'addApps', payload: response.result });
  };
  const onSubmit = async () => {
    const branchApi = {};
    branchesAddedList.forEach(item => {
      branchApi[item.value] = item.text;
    });
    await updateDispatchGroup({
      id: props.id,
      branches: branchApi,
      name: state.name,
      applications: state.appSelected,
      [state.type]: state[state.type],
      status: state.status,
    });
    closeDrawer();
    kianTableApi(DISPATCH_GROUP_TABLE).refreshTable();
  };

  return (
    <KianDrawer
      drawerId={DRAWER_FOR_EDIT_DISPATCH_GROUP}
      title={`ویرایش گروه ${props.name}`}
      visible={visible}
      onClose={closeDrawer}
      onCancel={closeDrawer}
      className={s.drawer}
      onOk={onSubmit}
      okText="ثبت تغییرات"
    >
      <div className={s.titr}>نام </div>
      <div className={s.label}>نام گروه*</div>
      <CPInput
        placeholder=" نام گروه را وارد کنید"
        value={state.name}
        isRequired
        onChange={text =>
          dispatch({ type: 'name', payload: text.target.value })
        }
      />
      <br />
      <div className={s.titr}>اپلیکیشن‌های ایجاد‌کننده</div>
      <Row>
        {state.applications.map(item => (
          <Col span={8} key={item.id} className={s.checkbox}>
            <Checkbox
              defaultChecked={state.appSelected.some(app => app.id === item.id)}
              name={item.name}
              id={item.id}
              onChange={value => onChangeStatus(value, item)}
            >
              {item.name}
            </Checkbox>
          </Col>
        ))}
      </Row>
      {state.displayBtnAddApp && (
        <div className={s.addApplication}>
          <CPButton type="primary" onClick={() => getApplicationList()}>
            افزودن اپلیکیشن
          </CPButton>
        </div>
      )}
      <div className={s.hr} />
      <br />
      <div className={s.titr}>فیلترهای مکانی</div>
      <br />
      <SelectBranchInAddGroup
        branchesAdded={branchesAddedList}
        onAddBranch={onAddBranch}
        onRemoveBranch={onRemoveBranch}
      />
      <br />
      <div className={s.titr}>فیلتر زمانی</div>
      <div className={s.container}>
        <DateSelectForm
          mode={{
            type: state.type,
            fromDays: state.fromDays,
            fromDate: state.fromDate,
          }}
          setMode={date => dispatch({ type: 'change', payload: date(state) })}
        />
      </div>
    </KianDrawer>
  );
};

DrawerForEditDispatchGroup.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  applications: PropTypes.string,
  branches: PropTypes.object,
  fromDate: PropTypes.number,
};
DrawerForEditDispatchGroup.defaultProps = {
  applications: [],
  branches: {},
  fromDate: null,
};

export default withStyles(s)(DrawerForEditDispatchGroup);
