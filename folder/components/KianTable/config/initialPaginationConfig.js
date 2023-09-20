import { pageSizeInTableList as pageSize } from '../../../webConfig';

const initialPaginationConfig = {
  current: 1,
  pageSize,
  total: 0,
  showSizeChanger: true,
  showTotal: total => `تعداد کل: ${total}`,
  hideOnSinglePage: false,
  pageSizeOptions: ['10', '15', '25', '50', '100'],
  showQuickJumper: true,
};

export default initialPaginationConfig;
