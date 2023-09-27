import React from 'react';
import Icon from '@mdi/react';
import { mdiCheckCircle, mdiAccountCircle, mdiCloseCircle } from '@mdi/js';

export const aclActionGrantTypes = {
  ENABLE: 'ENABLE',
  DISABLE: 'DISABLE',
  MINE: 'MINE',
};

export const aclActionGrantTypesMessage = {
  [aclActionGrantTypes.ENABLE]: (
    <p
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Icon
        style={{ width: 18, marginLeft: 6, color: '#13c29a' }}
        path={mdiCheckCircle}
      />
      فعال
    </p>
  ),
  [aclActionGrantTypes.MINE]: (
    <p
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Icon
        style={{ width: 18, marginLeft: 6, color: '#faad14' }}
        path={mdiAccountCircle}
      />
      شخصی
    </p>
  ),
  [aclActionGrantTypes.DISABLE]: (
    <p
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Icon
        style={{ width: 18, marginLeft: 6, color: '#ff5252' }}
        path={mdiCloseCircle}
      />
      غیرفعال
    </p>
  ),
};

export const grantTypesListSortedByPriority = [
  aclActionGrantTypes.ENABLE,
  aclActionGrantTypes.MINE,
  aclActionGrantTypes.DISABLE,
];
