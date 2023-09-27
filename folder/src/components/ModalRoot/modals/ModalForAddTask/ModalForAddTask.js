import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CPModal from '../../../CP/CPModal/CPModal';
import TaskForm from '../../../TaskForm';
import { MODAL_FOR_ADD_TASK } from '../../repository';

const ModalForAddTask = props => {
  const [visible, setVisible] = useState(true);
  const { byCard, cardTitle, cardId } = props;

  function closeModal() {
    setVisible(false);
  }

  return (
    <CPModal
      title="ایجاد کار جدید"
      footer={false}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_TASK}
    >
      {byCard && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '7px',
            flexWrap: 'no-wrap',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <span
              style={{ fontSize: '12px', color: 'rgba(100, 100, 100, 0.85)' }}
            >
              مرتبط با:
            </span>
            <span
              style={{
                fontSize: '12px',
                color: ' #333',
                border: '1px solid #ccc',
                borderRadius: '3px',
                padding: '5px 10px',
                marginTop: '10px',
                width: '100%',
              }}
            >
              کارت
            </span>
          </span>
          <span
            style={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <span
              style={{ fontSize: '12px', color: 'rgba(100, 100, 100, 0.85)' }}
            >
              نام ارتباط :
            </span>
            <span
              style={{
                fontSize: '12px',
                color: ' #333',
                border: '1px solid #ccc',
                borderRadius: '2.5px',
                padding: '5px 10px',
                marginTop: '10px',
                width: '100%',
              }}
            >
              {cardTitle}
            </span>
          </span>
        </div>
      )}
      <TaskForm
        onSuccessSubmit={closeModal}
        onCancel={closeModal}
        byCard={byCard}
        cardTitle={cardTitle}
        cardId={cardId}
      />
    </CPModal>
  );
};

ModalForAddTask.propTypes = {
  byCard: PropTypes.bool.isRequired,
  cardTitle: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
};

export default ModalForAddTask;
