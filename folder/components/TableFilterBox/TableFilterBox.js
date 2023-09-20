import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './TableFilterBox.scss';
import CPDropdown from '../CP/CPDropdown';
import CPSelect from '../CP/CPSelect';

const TableFilterBox = props => {
  const {
    className,
    actionsTitle,
    actionType,
    actions,
    data,
    selectItemsFunc,
  } = props;

  return (
    <div className={cs(s.root, className)}>
      <ul className={s.actions}>
        <li className={s.actionsList}>
          <CPDropdown
            menuList={actions}
            title={actionsTitle}
            iconType="caret-down"
            onClick={actionType}
          />
        </li>
        {data?.length > 0 && (
          <li className="margin-r-5">
            <CPSelect
              className="margin-b-5"
              defaultValue={data[0].value}
              dataSource={data}
              onChange={selectItemsFunc}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

TableFilterBox.propTypes = {
  className: PropTypes.string,
  actionType: PropTypes.func,
  selectItemsFunc: PropTypes.func,
  actionsTitle: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
};

TableFilterBox.defaultProps = {
  className: null,
  actionType: () => {},
  selectItemsFunc: () => {},
  actionsTitle: 'فعالیت ها',
  actions: null,
  data: null,
};

export default withStyles(s)(memo(TableFilterBox));
export const TableFilterBoxTest = TableFilterBox;
