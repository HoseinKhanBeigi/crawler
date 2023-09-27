import { Switch, Tag } from 'antd';
import React from 'react';
import { aclActionTypes } from '../../constants/aclActionTypes';
import CPSelect from '../../../../components/CP/CPSelect';
import { aclActionGrantTypesMessage } from '../../constants/aclActionGrantTypes';

/* eslint-disable no-unused-vars */

const aclTableSchema = viewMode => ({
  getMenuAccessSwitchDisabledState,
  changeMenuAccessSwitchHandler,
  getMenuAccessSwitchState,
  getHasCRUDDropdown,
  getCRUDDropdownDataSource,
  changeCRUDDropdownHandler,
  getCRUDDropdownValue,
}) => {
  const renderCRUD = aclActionType => (_, row) =>
    viewMode
      ? aclActionGrantTypesMessage[getCRUDDropdownValue(row, aclActionType)]
      : getHasCRUDDropdown(row, aclActionType) && (
          <CPSelect
            placeholder="مشخص نشده"
            defaultValue={getCRUDDropdownValue(row, aclActionType)}
            dataSource={getCRUDDropdownDataSource(row, aclActionType).map(
              type => ({
                text: aclActionGrantTypesMessage[type],
                value: type,
              }),
            )}
            onChange={changeCRUDDropdownHandler(row, aclActionType)}
          />
        );

  const renderMenuAccess = (_, row) => {
    const isActive = getMenuAccessSwitchState(row);
    return viewMode ? (
      isActive ? (
        <Tag color="blue">فعال</Tag>
      ) : (
        <Tag color="red">غیرفعال</Tag>
      )
    ) : (
      <div className="acl-switch">
        <Switch
          disabled={getMenuAccessSwitchDisabledState(row)}
          onChange={changeMenuAccessSwitchHandler(row)}
          checked={isActive}
        />
      </div>
    );
  };

  return [
    {
      title: 'نام',
      dataIndex: 'title',
      key: 'title',
      width: '180px',
      ellipsis: true,
      // render: c => <p className={s.title}>{c}</p>,
    },
    {
      title: 'دسترسی',
      dataIndex: 'menuAccess',
      key: 'menuAccess',
      width: '90px',
      render: renderMenuAccess,
    },
    {
      title: 'ایجاد',
      dataIndex: 'create',
      key: 'create',
      width: '150px',
      render: renderCRUD(aclActionTypes.CREATE),
    },
    {
      title: 'مشاهده',
      dataIndex: 'read',
      key: 'read',
      width: '150px',
      render: renderCRUD(aclActionTypes.READ),
    },
    {
      title: 'ویرایش',
      dataIndex: 'update',
      key: 'update',
      width: '150px',
      render: renderCRUD(aclActionTypes.UPDATE),
    },
    {
      title: 'حذف',
      dataIndex: 'delete',
      key: 'delete',
      width: '150px',
      render: renderCRUD(aclActionTypes.DELETE),
    },
  ];
};
export default aclTableSchema;
