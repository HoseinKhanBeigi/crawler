import React from 'react';
import PropTypes from 'prop-types';
import CallsLog from '../CallsLog';
import { columns } from './columns';
import searchData from './searchData';
import withModal from '../../components/HOC/withModal';
import { MODAL_FOR_MANUAL_ADD_CALL_WITHOUT_SEARCH } from '../ModalRoot/repository';

const ChooseLogActivity = props => {
  const { levantId } = props;
  const activityButton = [
    {
      label: 'تماس جدید',
      icon: 'phone',
      action: () =>
        props.showModalAction({
          type: MODAL_FOR_MANUAL_ADD_CALL_WITHOUT_SEARCH,
        }),
    },
  ];
  return (
    <>
      <CallsLog
        columns={columns}
        searchData={searchData}
        userLevantId={levantId}
        activityButton={activityButton}
      />
    </>
  );
};

ChooseLogActivity.propTypes = {
  levantId: PropTypes.number.isRequired,
  showModalAction: PropTypes.func.isRequired,
};

export default withModal(ChooseLogActivity);
