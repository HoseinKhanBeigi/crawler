import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import { doActionOnMessageTemplatesAction } from '../../store/messageTemplate/messageTemplate.actions';
import { columns, searchData } from './tableData';
import withModal from '../../components/HOC/withModal';
import KianTable from '../../components/KianTable';
import { MESSAGE_TEMPLATES_TABLE } from '../../store/settings/settings.constants';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import { MODAL_FOR_MESSAGE_TEMPLATE } from '../../components/ModalRoot/repository';
import { Actions } from '../../utils/aclActions';

const MessageTemplates = props => {
  const showMessageModal = ({ ...initialValues }) => () => {
    props.showModalAction({
      type: MODAL_FOR_MESSAGE_TEMPLATE,
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
    kianTableApi(MESSAGE_TEMPLATES_TABLE).setLoading(true);
    await props.doActionOnMessageTemplatesAction(body);
    kianTableApi(MESSAGE_TEMPLATES_TABLE).refreshTable();
  };

  const contextMenu = [
    {
      label: 'ویرایش',
      icon: 'edit',
      authority: Actions.templateManualUpdate,
      action: row => showMessageModal(row)(),
    },
    {
      label: 'فعال/غیرفعال',
      icon: 'redo',
      authority: Actions.templateManaulActionCreate,
      action: row =>
        rowAction(row, row.status === 'ACTIVE' ? 'DEACTIVATE' : 'ACTIVATE')(),
    },
    {
      label: 'حذف',
      icon: 'delete',
      authority: Actions.templateManaulActionCreate,
      action: row => rowAction(row, 'DELETE')(),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <KianTable
          endpoint="template/search"
          tableId={MESSAGE_TEMPLATES_TABLE}
          rowKey="id"
          columns={columns}
          searchData={searchData}
          contextMenu={contextMenu}
          activityButton={[
            {
              label: 'افزودن قالب',
              authority: Actions.templateManualCreate,
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

MessageTemplates.propTypes = {
  doActionOnMessageTemplatesAction: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  doActionOnMessageTemplatesAction,
};

const mapState = ({ messageTemplate: { data, loading } }) => ({
  data,
  loading,
});

export default connect(mapState, mapDispatch)(withModal(MessageTemplates));
