/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/first */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Popover } from 'antd';
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';

const RemoveButton = ({ data, onDelete }) => {
  const [remove, setRemove] = useState(false);
  const handleDelete = () => {
    onDelete(data);
    setRemove(false);
  };
  return (
    <Popover
      content={
        <>
          <p style={{ fontSize: '12px', marginBottom: '10px' }}>
            آیا از حذف این شعبه اطمینان دارید ؟
          </p>
          <Button
            type="primary"
            className="margin-l-5"
            onClick={handleDelete.bind(null)}
          >
            بله
          </Button>
          <Button
            type="default"
            className="default-btn"
            onClick={setRemove.bind(null, false)}
          >
            خیر
          </Button>
        </>
      }
      title="حذف"
      trigger="click"
      visible={remove}
      onVisibleChange={setRemove}
    >
      <Button type="link" onClick={setRemove.bind(null, true)}>
        <Icon path={mdiTrashCanOutline} color="#ff4d4f" size="16px" />
      </Button>
    </Popover>
  );
};
RemoveButton.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default RemoveButton;
