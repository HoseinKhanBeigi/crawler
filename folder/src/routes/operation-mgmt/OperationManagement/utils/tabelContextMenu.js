import {
  DRAWER_FOR_OPERATION_MANAGEMENT_VIEW,
  MODAL_FOR_EDIT_OPERATION_MANAGEMENT_BRANCH,
} from '../../../../components/ModalRoot/repository';

const tableContextMenu = showModalAction => [
  {
    label: 'مشاهده',
    action: row => {
      showModalAction({
        type: DRAWER_FOR_OPERATION_MANAGEMENT_VIEW,
        props: {
          ...row,
        },
      });
    },
  },
  {
    label: 'ویرایش',
    action: ({ name, id }) => {
      showModalAction({
        type: MODAL_FOR_EDIT_OPERATION_MANAGEMENT_BRANCH,
        props: {
          name,
          id,
        },
      });
    },
  },
];

export default tableContextMenu;
