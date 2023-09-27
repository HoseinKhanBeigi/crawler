import { setContextMenuRowObject } from '../helpers/contextMenu';

const defaultFunc = () => {};

const onRowConfig = (onClick = defaultFunc) => (record, rowIndex) => ({
  onClick: () => onClick(record, rowIndex),
  onContextMenu: () => {
    setContextMenuRowObject(record);
  },
});

export default onRowConfig;
