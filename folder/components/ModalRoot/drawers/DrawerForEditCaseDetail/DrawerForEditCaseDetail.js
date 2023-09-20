import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiOpenInNew } from '@mdi/js';
import PropTypes from 'prop-types';
import { DRAWER_FOR_VIEW_CASE_DETAIL } from '../../repository';
import Link from '../../../Link';
import EditCaseForm from '../../../EditCaseForm/EditCaseForm';
import KianDrawer from '../../../KianDrawer/KianDrawer';

const DrawerForEditCaseDetail = props => {
  const { data } = props;
  const [visible, setVisible] = useState(true);
  const closeDrawer = () => {
    setVisible(false);
  };
  return (
    <KianDrawer
      visible={visible}
      onClose={closeDrawer}
      onCancel={closeDrawer}
      title="مشاهده درخواست"
      drawerId={DRAWER_FOR_VIEW_CASE_DETAIL}
      renderHeader={
        <div style={{ display: 'flex' }}>
          <p>مشاهده درخواست</p>
          {data?.id && (
            <div style={{ display: 'grid', placeItems: 'center' }}>
              <Link to={`/show-case/${data.id}`} target>
                <Icon
                  path={mdiOpenInNew}
                  style={{ width: '16px', marginRight: '8px' }}
                  color="#178ffe"
                />
              </Link>
            </div>
          )}
        </div>
      }
    >
      <EditCaseForm data={data} onCancel={closeDrawer} onFinish={closeDrawer} />
    </KianDrawer>
  );
};

DrawerForEditCaseDetail.propTypes = {
  data: PropTypes.object.isRequired,
};
export default DrawerForEditCaseDetail;
