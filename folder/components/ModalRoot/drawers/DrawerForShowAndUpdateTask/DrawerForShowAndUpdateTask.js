import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { DRAWER_FOR_SHOW_AND_UPDATE_TASK } from '../../repository';
import TaskForm from '../../../TaskForm/TaskForm';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import Link from '../../../Link';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../../serviceConfig';

const DrawerForShowAndUpdateTask = props => {
  const { data } = props;
  const { taskDetails } = data;
  const [visible, setVisible] = useState(true);
  const [byPipe, setByPipe] = useState(false);
  const [cardData, setCardData] = useState(null);

  const indexOfTaskFromCard = taskDetails.indexOf(
    taskDetails.find(detail => detail?.detailType === 'CARD'),
  );

  const getCardDetails = async id => {
    const reslult = await axios.get(
      `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/card/${id}`,
    );
    setCardData(reslult.data);
  };
  useEffect(() => {
    if (taskDetails[indexOfTaskFromCard]) {
      setByPipe(true);
    }
  }, []);

  useEffect(() => {
    const id = taskDetails.map(item => item.detailValue);
    getCardDetails(id.toString());
  }, []);

  const closeDrawer = () => {
    setVisible(false);
    setByPipe(false);
  };

  return (
    <KianDrawer
      visible={visible}
      onClose={closeDrawer}
      onCancel={closeDrawer}
      title="مشاهده کار"
      drawerId={DRAWER_FOR_SHOW_AND_UPDATE_TASK}
      renderHeader="مشاهده کار"
    >
      {byPipe && (
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
              مرتبط با
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
              <Link
                to={`/pipeline-management/${cardData?.pipe}/${cardData?.id}`}
                target
              >
                <p>لینک به کارت</p>
              </Link>
            </span>
          </span>
        </div>
      )}

      <TaskForm
        initialFormValues={data}
        onCancel={closeDrawer}
        onSubmit={closeDrawer}
        editMode
      />
    </KianDrawer>
  );
};

DrawerForShowAndUpdateTask.propTypes = {
  data: PropTypes.object.isRequired,
};
export default DrawerForShowAndUpdateTask;
