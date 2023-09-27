import React from 'react';
import {
  DRAWER_FOR_VIEW_DISPATCH_GROUP,
  DRAWER_FOR_EDIT_DISPATCH_GROUP,
  MODAL_FOR_DELETE_CONFIRMATION,
} from '../../../../components/ModalRoot/repository';
import GroupStatus from './GroupStatus';
import FilterColumn from './FilterColumn';
import { Actions } from '../../../../utils/aclActions';
import { kianTableApi } from '../../../../components/KianTable/helpers/globalApi';
import { DISPATCH_GROUP_TABLE } from '../../../../store/settings/settings.constants';
import { deleteDispatchGroup } from '../../../../service/dispatchGroupServices';

export const columns = [
  {
    title: 'کد گروه',
    dataIndex: 'unitCode',
  },
  {
    title: 'نام گروه',
    dataIndex: 'name',
  },
  {
    title: 'فیلترها',
    dataIndex: '',
    render: row => <FilterColumn item={row} />,
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    render: status => <GroupStatus status={status} />,
  },
  {
    title: 'اعضا',
    dataIndex: 'lastModifiedDateTime',
  },
  {
    title: 'تعداد فرصت‌ها',
    dataIndex: 'lastModifiedDateTime',
  },
];

export const contextMenu = showModalAction => [
  {
    label: 'مشاهده',
    authority: Actions.dispatchGroupsShow,
    action: row => {
      showModalAction({
        type: DRAWER_FOR_VIEW_DISPATCH_GROUP,
        props: {
          ...row,
        },
      });
    },
  },
  {
    label: 'ویرایش',
    authority: Actions.dispatchGroupsEdit,
    action: props => {
      showModalAction({
        type: DRAWER_FOR_EDIT_DISPATCH_GROUP,
        props,
      });
    },
  },
  {
    label: 'اعضا',
    action: ({ name, id }) => {
      showModalAction({
        type: DRAWER_FOR_EDIT_DISPATCH_GROUP,
        props: {
          name,
          id,
        },
      });
    },
  },
  {
    label: 'مشاهده فرصت‌های لحاظ‌شده',
    disabled: true,
    action: ({ name, id }) => {
      showModalAction({
        type: DRAWER_FOR_EDIT_DISPATCH_GROUP,
        props: {
          name,
          id,
        },
      });
    },
  },
  {
    label: 'غیرفعال‌سازی',
    action: ({ name, id }) => {
      showModalAction({
        type: DRAWER_FOR_EDIT_DISPATCH_GROUP,
        props: {
          name,
          id,
        },
      });
    },
  },
  {
    label: () => <p style={{ color: 'red' }}>حذف</p>,
    authority: Actions.dispatchGroupsDelete,
    action: row =>
      showModalAction({
        type: MODAL_FOR_DELETE_CONFIRMATION,
        props: {
          title: 'حذف گروه مدیریت توزیع',
          onConfirm: async () => {
            try {
              await deleteDispatchGroup({}, row.id);
              kianTableApi(DISPATCH_GROUP_TABLE).refreshTable();
              return Promise.resolve();
            } catch (e) {
              return Promise.reject();
            }
          },
          detail: [
            { value: row.name, label: 'نام گروه' },
            { value: row.id, label: 'شناسه گروه' },
          ],
        },
      }),
  },
];
