import React, { useState } from 'react';
import PropTypes from 'prop-types';
import opportunityService from '../../../../service/opportunityService';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import {
  OPPORTUNITIES_PIPELINE_TABLE,
  OPPORTUNITIES_TABLE,
} from '../../../../store/settings/settings.constants';
import { opportunityDeleteReasons } from '../../../../utils/opportunityDeleteReasons';
import CPRadio from '../../../CP/CPRadio';
import CPTextArea from '../../../CP/CPTextArea';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import { DRAWER_FOR_DELETE_OPPORTUNITY } from '../../repository';

const DrawerForDeleteOpportunity = props => {
  const { data } = props;
  const [visible, setVisible] = useState(true);
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherReason, setOtherReason] = useState(null);

  function closeModal() {
    setVisible(false);
  }

  const deleteOpportunity = async () => {
    try {
      await opportunityService.deleteOpportunity(
        data,
        otherReason
          ? { reason: selectedReason, description: otherReason }
          : { reason: selectedReason },
      );
      kianTableApi(OPPORTUNITIES_PIPELINE_TABLE).refreshTable();
      kianTableApi(OPPORTUNITIES_TABLE).refreshTable();
      setVisible(false);
    } catch (e) {
      // ...
    }
  };

  const onChange = value => {
    setSelectedReason(value);
  };

  const onChangeOtherReason = value => {
    setOtherReason(value);
  };

  return (
    <KianDrawer
      title="حذف فرصت"
      visible={visible}
      drawerId={DRAWER_FOR_DELETE_OPPORTUNITY}
      onClose={closeModal}
      okText="تایید"
      cancelText="انصراف"
      okButtonProps={{ disabled: !selectedReason }}
      onOk={deleteOpportunity}
      onCancel={closeModal}
    >
      <>
        <h3>آیا از حذف این فرصت اطمینان دارید؟</h3>
        <small style={{ marginBottom: '15px' }}>
          لطفا یکی از دلایل زیر را برای حذف این فرصت انتخاب کنید.
        </small>
        <CPRadio
          vertical
          value={selectedReason}
          model={opportunityDeleteReasons}
          onChange={e => onChange(e.target.value)}
          className="margin-b-10 margin-t-10 margin-r-10"
          size="small"
        />
        {selectedReason === 'OTHER' && (
          <CPTextArea
            value={otherReason}
            onChange={e => onChangeOtherReason(e.target.value)}
            placeholder="لطفا دلیل خود را اینجا تایپ کنید : "
            rows={3}
          />
        )}
      </>
    </KianDrawer>
  );
};

DrawerForDeleteOpportunity.propTypes = {
  data: PropTypes.object,
};
DrawerForDeleteOpportunity.defaultProps = {
  data: {},
};

export default DrawerForDeleteOpportunity;
