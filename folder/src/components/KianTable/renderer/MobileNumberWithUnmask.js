import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, Typography } from 'antd';
import contactCenterService from '../../../service/contactCenterService';

const { Text } = Typography;

const Component = ({ text, record, copyable }) => {
  const [loading, setLoading] = useState(false);
  const [unmaskedMobile, setUnaskedMobile] = useState(null);
  const { levantId, mobilePhoneDTO } = record;
  const isMasked = () => text?.includes('*') && !unmaskedMobile;

  const unMask = async () => {
    setLoading(true);
    try {
      const { locationValue } = await contactCenterService.unmask(
        levantId,
        'MOBILE',
        mobilePhoneDTO?.partyLocationId,
      );
      setUnaskedMobile(locationValue);
    } finally {
      setLoading(false);
    }
  };

  return isMasked() ? (
    <Tooltip title="جهت مشاهده کلیک کنید">
      <Button
        style={{ direction: 'ltr', display: 'inline-block', height: 'auto' }}
        type="link"
        loading={loading}
        onClick={unMask}
      >
        {text}
      </Button>
    </Tooltip>
  ) : (
    <Text
      style={{ direction: 'ltr', display: 'inline-block' }}
      copyable={!!copyable}
    >
      {unmaskedMobile || text || '???'}
    </Text>
  );
};

Component.propTypes = {
  text: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  copyable: PropTypes.bool.isRequired,
};

const MobileNumberWithUnmask = (text, record, copyable = true) => (
  <Component text={text} record={record} copyable={!!copyable} />
);

export default MobileNumberWithUnmask;
