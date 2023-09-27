import React from 'react';
import PropTypes from 'prop-types';
import CallsLog from '../../components/CallsLog';
import { columns } from './tableData';
import searchData from './searchData';
import withModal from '../../components/HOC/withModal';
import { MODAL_FOR_PHONE_CALLS } from '../../components/ModalRoot/repository';
import { Actions } from '../../utils/aclActions';

const PhoneCalls = props => {
  const activityButton = [
    {
      label: 'تماس جدید',
      icon: 'phone',
      authority: Actions.voipCallCreate,
      action: () =>
        props.showModalAction({
          type: MODAL_FOR_PHONE_CALLS,
        }),
    },
  ];
  return (
    <>
      <CallsLog
        columns={columns}
        searchData={searchData}
        activityButton={activityButton}
      />
    </>
  );
};

PhoneCalls.propTypes = {
  showModalAction: PropTypes.func.isRequired,
};

export default withModal(PhoneCalls);
