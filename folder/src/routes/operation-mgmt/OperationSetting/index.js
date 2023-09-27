import React from 'react';
import { Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';
import NavigateCard from '../../../components/NavigateCard';
import { Actions } from '../../../utils/aclActions';

const OperationSetting = () => (
  <div className={s.container}>
    <Row type="flex" justify="center" align="center" gutter={16}>
      <NavigateCard
        title=" مدیریت عملیات"
        content="مشاهده، بررسی و تعریف عملیات"
        linkURL="/operation-mgmt/branches"
        buttonText="ورود به پنل"
        permission={Actions.operationBranchRelation}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <path
            id="Path_3995"
            data-name="Path 3995"
            d="M20.333,51H33.667V37.667H20.333Zm17.333,0h4.667A8.667,8.667,0,0,0,51,42.333V37.667H37.667ZM51,33.667V20.333H37.667V33.667Zm0-17.333V11.667A8.667,8.667,0,0,0,42.333,3H37.667V16.333ZM33.667,3H20.333V16.333H33.667ZM3,20.333V33.667H16.333V20.333ZM3,37.667v4.667A8.667,8.667,0,0,0,11.667,51h4.667V37.667ZM33.667,20.333V33.667H20.333V20.333Z"
            transform="translate(-3 -3)"
            fill="#9452ff"
          />
        </svg>
      </NavigateCard>
      <NavigateCard
        title="مدیریت توزیع"
        content="مشاهده، بررسی و تعریف عملیات توزیع"
        linkURL="/operation-mgmt/dispatches"
        buttonText="ورود به پنل"
        permission={Actions.dispatchGroupsTable}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48.002"
          viewBox="0 0 48 48.002"
        >
          <path
            id="Path_3994"
            data-name="Path 3994"
            d="M2,9.429A7.429,7.429,0,0,1,9.429,2h24a7.429,7.429,0,0,1,7.429,7.429v13.79a6.284,6.284,0,0,0-2.777-.647H37.43V9.429a4,4,0,0,0-4-4h-24a4,4,0,0,0-4,4V35.716a4,4,0,0,0,4,4h7.7l-2.887,3.429H9.429A7.429,7.429,0,0,1,2,35.716Zm10.858,1.714a1.714,1.714,0,1,0,0,3.429H30a1.714,1.714,0,0,0,0-3.429Zm.731,14.707a1.714,1.714,0,0,1,1.554-.992H38.081a4,4,0,0,1,3.058,1.424L49.6,36.326a1.714,1.714,0,0,1,0,2.208L41.14,48.578A4,4,0,0,1,38.081,50H15.143a1.714,1.714,0,0,1-1.312-2.818l8.215-9.754-8.215-9.753a1.714,1.714,0,0,1-.242-1.829ZM12.858,18a1.714,1.714,0,1,0,0,3.429H23.144a1.714,1.714,0,0,0,0-3.429Z"
            transform="translate(-2 -2)"
            fill="#ff5252"
          />
        </svg>
      </NavigateCard>
    </Row>
  </div>
);

export default withStyles(s)(OperationSetting);
