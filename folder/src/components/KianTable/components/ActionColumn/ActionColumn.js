import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Icon, Menu } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postUISettingsAction } from '../../../../store/settings/settings.actions';
import { isAclSkipped } from '../../../../utils/aclActions';

const { Item } = Menu;

const ActionColumn = props => {
  const { items, rowData, authorities } = props;
  const [finalItems, setFinalItems] = useState(items);

  const getLabel = item =>
    typeof item.label === 'function' ? item.label(rowData) : item.label;

  const menu = items?.length && (
    <Menu>
      {finalItems?.map(item => (
        <Item
          disabled={item.disabled}
          key={getLabel(item)}
          onClick={event => {
            event?.domEvent?.stopPropagation();
            item.action(rowData);
          }}
        >
          {getLabel(item)}
        </Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    const AuthorizationItem = () => {
      const final = [];
      items?.forEach(item => {
        const couldShow = authorities?.filter(
          au =>
            au?.code === item?.authority ||
            typeof item.authority === 'undefined',
        );
        if (couldShow?.length && !item.isNotAccess?.(rowData, couldShow))
          final.push(item);
      });
      if (!isAclSkipped(authorities)) setFinalItems(final);
    };
    AuthorizationItem();
  }, []);
  return (
    <>
      {finalItems?.length ? (
        <Dropdown overlay={menu}>
          <Button type="link" onClick={() => {}}>
            عملیات ها
            <Icon type="down" />
          </Button>
        </Dropdown>
      ) : (
        <div style={{ height: '32px' }} />
      )}
    </>
  );
};

ActionColumn.propTypes = {
  items: PropTypes.array.isRequired,
  rowData: PropTypes.object,
  authorities: PropTypes.array.isRequired,
};
ActionColumn.defaultProps = {
  rowData: {},
};
const mapDispatch = {
  postUISettingsAction,
};
const mapState = state => ({
  authorities: state?.acl?.authorities,
});

export default connect(mapState, mapDispatch)(ActionColumn);
