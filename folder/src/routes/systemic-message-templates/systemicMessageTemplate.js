import React from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import KianTable from '../../components/KianTable';
import withModal from '../../components/HOC/withModal';
import { SYSTEMIC_MESSAGE_TEMPLATES_TABLE } from '../../store/settings/settings.constants';
import {
  MODAL_FOR_SYSTEMIC_MESSAGE_TEMPLATE,
  DRAWER_FOR_MESSAGE,
} from '../../components/ModalRoot/repository';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import { columns, searchData } from './tableData';
import systemicMessageTemplateService from '../../service/systemicTemplateMessageService';
import { Actions } from '../../utils/aclActions';

const SystemicMessageTemplates = props => {
  const showMessageModal = ({ ...initialValues }) => () => {
    props.showModalAction({
      type: MODAL_FOR_SYSTEMIC_MESSAGE_TEMPLATE,
      props: {
        initialValues,
      },
    });
  };

  const showMessageDetailModal = ({ ...initialValues }) => () => {
    props.showModalAction({
      type: DRAWER_FOR_MESSAGE,
      props: {
        initialValues,
      },
    });
  };
  const rowAction = ({ id }, action) => async () => {
    const body = {
      data: [id],
      action,
    };
    kianTableApi(SYSTEMIC_MESSAGE_TEMPLATES_TABLE).setLoading(true);
    systemicMessageTemplateService
      .doActionOnSystemicMessage(body)
      .then(() => {
        kianTableApi(SYSTEMIC_MESSAGE_TEMPLATES_TABLE).refreshTable();
      })
      .catch(() => {
        kianTableApi(SYSTEMIC_MESSAGE_TEMPLATES_TABLE).refreshTable();
      });
  };
  const contextMenu = [
    {
      label: 'ویرایش',
      icon: 'edit',
      authority: Actions.templateSystemicUpdate,
      action: row => showMessageModal(row)(),
    },
    {
      label: 'مشاهده',
      icon: 'edit',
      authority: Actions.templateSystemicView,
      action: row => showMessageDetailModal(row)(),
    },
    {
      label: 'فعال/غیرفعال',
      icon: 'redo',
      authority: Actions.templateSystemicAction,
      action: row =>
        rowAction(row, row.status === 'ACTIVE' ? 'DEACTIVATE' : 'ACTIVATE')(),
    },
    {
      label: 'حذف',
      icon: 'delete',
      authority: Actions.templateSystemicDelete,
      action: row => rowAction(row, 'DELETE')(),
    },
  ];
  return (
    <Row>
      <Col span={24}>
        <KianTable
          endpoint="template/systemic/search"
          tableId={SYSTEMIC_MESSAGE_TEMPLATES_TABLE}
          rowKey="id"
          columns={columns}
          searchData={searchData}
          contextMenu={contextMenu}
          activityButton={[
            {
              label: 'افزودن قالب',
              authority: Actions.templateSystemicCreate,
              action: showMessageModal({}),
              icon: 'plus-circle',
            },
          ]}
          withSort={false}
        />
      </Col>
    </Row>
  );
};

SystemicMessageTemplates.propTypes = {
  showModalAction: PropTypes.func.isRequired,
};

export default withModal(SystemicMessageTemplates);
