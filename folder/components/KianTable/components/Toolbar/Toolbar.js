import React, { useEffect } from 'react';
import { Col, Dropdown, Icon, Menu, Row, Tooltip } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Toolbar.scss';
import CPButton from '../../../CP/CPButton';
import { postUISettingsAction } from '../../../../store/settings/settings.actions';
import {
  createSettingsWithTablesSize,
  createSettingsWithTablesTheme,
} from '../../../../utils/uiSettings';
import CPToggleButton from '../../../CP/CPToggleButton';
import ActivityButton from './components/ActivityButton';
import ActionButtons from './components/ActionButtons';
import HandleAclPermission from '../../../HandleAclPermission';

const Toolbar = props => {
  const {
    downloadExcelAction,
    showActionButtons,
    setShowSearchBox,
    activityButton,
    toggleButton,
    showSearchBox,
    setThemeColor,
    actionButtons,
    resetTable,
    setColumns,
    themeColor,
    uiSettings,
    setSize,
    loading,
    columns,
    tableId,
    headerTitle,
    totalRecord,
    size,
    withSearch,
  } = props;

  const handleCollapse = () => {
    if (!showSearchBox) setShowSearchBox('searchBox');
    else setShowSearchBox('');
  };

  const switchTableSize = () => {
    const newSize =
      // eslint-disable-next-line no-nested-ternary
      size === 'small' ? 'middle' : size === 'middle' ? 'default' : 'small';
    setSize(newSize);
    props.postUISettingsAction(
      createSettingsWithTablesSize(uiSettings, newSize),
    );
  };

  const changeThemeColor = () => {
    const theme = themeColor === 'light' ? 'dark' : 'light';
    setThemeColor(theme);
    props.postUISettingsAction(
      createSettingsWithTablesTheme(uiSettings, theme),
    );
  };

  // Close SearchBox when user want to see table action buttons
  useEffect(() => {
    if (showSearchBox && showActionButtons) setShowSearchBox('');
  }, [showActionButtons]);

  const defaultMenuItems = [
    {
      label: 'تغییر اندازه',
      action: switchTableSize,
      title: 'تغییر اندازه',
    },
    {
      label: `${themeColor === 'dark' ? 'روشن' : 'تیره (آزمایشی)'}`,
      action: changeThemeColor,
      title: `${themeColor === 'dark' ? 'روشن' : 'تیره (آزمایشی)'}`,
    },
  ];

  const tableDefaultToolsMenu = () => (
    <Menu>
      {defaultMenuItems?.map(i => (
        <Menu.Item key={i.label} onClick={i.action}>
          {i.title}
        </Menu.Item>
      ))}
    </Menu>
  );

  const renderTool = tool => {
    if (tool?.isNotAccess?.(tool.authority)) {
      return null;
    }
    return (
      <HandleAclPermission key={tool.label} wich={tool?.authority}>
        <Tooltip title={!tool.disabled && tool.tooltip} key={tool.icon}>
          <CPButton
            icon={tool.icon}
            className={cs(
              s.tool,
              'toolbar-tool',
              tool.pushToLeft && s.leftSide,
              tool.invisible && s.invisible,
            )}
            loading={tool.loading}
            type="link"
            disabled={tool.disabled}
            onClick={tool.action}
          >
            {tool.label && <span>{tool.label}</span>}
          </CPButton>
        </Tooltip>
      </HandleAclPermission>
    );
  };

  const renderDefaultIconMenu = () => (
    <Dropdown overlay={tableDefaultToolsMenu()} placement="bottomCenter">
      <span className={s.default_tool__dot}>...</span>
    </Dropdown>
  );

  const handleToggleChange = value => {
    const { onChange } = toggleButton;
    onChange(value);
  };

  return (
    <Row
      type="flex"
      justify={headerTitle ? 'space-between' : 'end'}
      className={cs(s.toolbar, 'kian-table-toolbar')}
    >
      {headerTitle && (
        <div className={s.headerTitle}>
          <Row type="flex" align="center">
            <h3>{headerTitle}</h3>
            <span className={s.headerTitle__number}>{totalRecord}</span>
          </Row>
        </div>
      )}
      <div className={s.toggle_button}>
        {showActionButtons && (
          <div className={s.action_group_btn}>
            <Col>{actionButtons?.map(renderTool)}</Col>
          </div>
        )}
        {activityButton?.length ? (
          <ActivityButton items={activityButton} />
        ) : null}
        {toggleButton?.buttons?.length ? (
          <div className={s.toggleButton}>
            <CPToggleButton
              defaultValue={toggleButton.defaultValue}
              onChange={handleToggleChange}
              buttons={toggleButton?.buttons}
            />
          </div>
        ) : null}
        <ActionButtons
          handleCollapse={handleCollapse}
          withSearch={withSearch}
          columns={columns}
          resetTable={resetTable}
          setColumns={setColumns}
          uiSettings={uiSettings}
          loading={loading}
          tableId={tableId}
        />
        <div className={s.default_tool}>
          <div className={s.default_tool__icons}>
            <Tooltip title="بارگذاری مجدد">
              <Icon
                onClick={resetTable}
                className={s.default_tool__icon}
                style={{ fontWeight: 'bold' }}
                type="reload"
              />
            </Tooltip>
            <Tooltip title="دانلود اکسل">
              <Icon
                onClick={downloadExcelAction}
                className={s.default_tool__icon}
                style={{ fontWeight: 'bold' }}
                type="download"
              />
            </Tooltip>
          </div>
          {renderDefaultIconMenu()}
        </div>
        {/* {tableDefaultTools.map(tool => renderTool(tool))} */}
      </div>
    </Row>
  );
};

Toolbar.propTypes = {
  postUISettingsAction: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired,
  totalRecord: PropTypes.number.isRequired,
  showActionButtons: PropTypes.bool.isRequired,
  setShowSearchBox: PropTypes.func.isRequired,
  showSearchBox: PropTypes.string.isRequired,
  activityButton: PropTypes.array.isRequired,
  toggleButton: PropTypes.object,
  actionButtons: PropTypes.array.isRequired,
  setThemeColor: PropTypes.func.isRequired,
  themeColor: PropTypes.string.isRequired,
  uiSettings: PropTypes.object.isRequired,
  resetTable: PropTypes.func.isRequired,
  setColumns: PropTypes.func.isRequired,
  tableId: PropTypes.string.isRequired,
  downloadExcelAction: PropTypes.func,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setSize: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  withSearch: PropTypes.bool.isRequired,
};

Toolbar.defaultProps = {
  downloadExcelAction: null,
  toggleButton: {},
};

const mapState = ({ settings }) => ({
  uiSettings: settings.settings,
});

const mapDispatch = {
  postUISettingsAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(Toolbar));
