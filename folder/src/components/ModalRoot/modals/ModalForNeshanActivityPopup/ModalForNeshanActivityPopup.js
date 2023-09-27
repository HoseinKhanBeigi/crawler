import React, { useState } from 'react';
import { Button } from 'antd';
import CPModal from '../../../CP/CPModal/CPModal';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../../serviceConfig';
import { setCookie } from '../../../../utils';
import { MODAL_FOR_NESHAN_ACTIVITY_POPUP } from '../../repository';

const ModalForNeshanActivityPopup = () => {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <CPModal
      modalType={MODAL_FOR_NESHAN_ACTIVITY_POPUP}
      visible={visible}
      title="لیست های لاگ های ورود و خروج"
      footer={false}
      onCancel={closeModal}
    >
      <p>
        برای دیدن لیست ورود و خروج‌های نشان خود بر روی لینک زیر کلیک کنید تا به
        مربوطه منتقل شوید
      </p>
      <Button
        type="link"
        icon="import"
        onClick={() => {
          setCookie('displayedNeshanLogPop', 'false');
          closeModal();
        }}
      >
        <a
          href={`${resolveVariable(
            BASE_VARIABLE_KEYS.AUTH_HOST,
          )}/auth/realms/KIAN/account/sessions?nav=on`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: '5px' }}
        >
          مشاهده
        </a>
      </Button>
    </CPModal>
  );
};

export default ModalForNeshanActivityPopup;
