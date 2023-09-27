import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, Typography } from 'antd';
import { MODAL_FOR_SHOW_OPPORTUNITY_ERRORS } from '../../repository';
import CPModal from '../../../CP/CPModal';

const { Item } = List;
const { Text } = Typography;

const ModalForShowOpportunityErrors = props => {
  const { data, title } = props;
  const { commandErrors } = data;
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <CPModal
      title={title}
      visible={visible}
      onCancel={closeModal}
      footer={false}
      width={380}
      modalType={MODAL_FOR_SHOW_OPPORTUNITY_ERRORS}
    >
      <List
        size="small"
        bordered
        dataSource={commandErrors}
        renderItem={item => (
          <Item>
            <Text type="danger">{item.codeExceptionValue}</Text> {item.subject}
          </Item>
        )}
      />
    </CPModal>
  );
};
ModalForShowOpportunityErrors.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
export default ModalForShowOpportunityErrors;
