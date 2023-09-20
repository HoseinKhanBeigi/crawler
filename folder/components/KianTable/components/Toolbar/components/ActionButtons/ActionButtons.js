import React, { useState, useEffect, useCallback } from 'react';
import { Tooltip, Popover, Badge, Checkbox, Radio } from 'antd';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPButton from '../../../../../CP/CPButton';
import s from './ActionButtons.scss';
import { postUISettingsAction } from '../../../../../../store/settings/settings.actions';
import { createSettingsWithHiddenColumns } from '../../../../../../utils/uiSettings';

const ActionButtons = props => {
  const {
    handleCollapse,
    withSearch,
    columns,
    resetTable,
    setColumns,
    uiSettings,
    loading,
    tableId,
  } = props;
  const [columnsSnapshot, setColumnsSnapshot] = useState(columns); // first snapshot of columns. to keep it as a compare object.
  const [hasHiddenColumn, setHasHiddenColumn] = useState(false); // to toggle eye icon. with (eye, eye-invisible)
  const [initialCheckboxValues, setInitialCheckboxValues] = useState([]); // columns initial checkbox values
  const [checkboxValues, setCheckboxValues] = useState([]); // columns checkbox values
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(0); // auto refresh interval
  const [autoRefreshLiveNumber, setAutoRefreshLiveNumber] = useState(0); // auto refresh live number

  const handleAutoRefreshChange = ({ target: { value } }) => {
    setAutoRefreshInterval(value);
  };

  const renderAutoRefreshToggle = () => {
    const options = [
      {
        label: 'غیر فعال',
        value: 0,
        disabled: autoRefreshInterval === 0,
      },
      {
        label: '10 ثانیه',
        value: 10,
        disabled: autoRefreshInterval === 10,
      },
      {
        label: '30 ثانیه',
        value: 30,
        disabled: autoRefreshInterval === 30,
      },
      {
        label: '60 ثانیه',
        value: 60,
        disabled: autoRefreshInterval === 60,
      },
      {
        label: '90 ثانیه',
        value: 90,
        disabled: autoRefreshInterval === 90,
      },
    ];
    return (
      <div className={s.radioGroup}>
        <Radio.Group
          options={options}
          onChange={handleAutoRefreshChange}
          value={autoRefreshInterval}
        />
      </div>
    );
  };

  // create a memorized function to work with lodash debounce
  const saveHiddenColumns = useCallback(
    debounce(cols => {
      const hiddenColumns = columnsSnapshot
        .filter(t => !cols.find(c => c.title === t.title))
        .map(x => x.dataIndex || x.key);
      const settings = createSettingsWithHiddenColumns(
        uiSettings,
        tableId,
        hiddenColumns,
      );
      if (settings) props.postUISettingsAction(settings);
    }, 500),
    [columnsSnapshot],
  );

  // update columns when columns option checkboxes changed. we have all columns as a snapshot.
  const onColumnsChange = cols => {
    if (columnsSnapshot.length) {
      const filteredColumns = columnsSnapshot.filter(col =>
        cols.includes(col.dataIndex || col.key),
      );
      setCheckboxValues(cols);
      setColumns(filteredColumns);
      saveHiddenColumns(filteredColumns);
    }
  };

  // columns options as checkboxes, we add a disable checkbox as (ردیف) just for showing purpose.
  const getColumnsOptions = cols => {
    const columnsOptions = cols.map(({ title, dataIndex, key }) => ({
      label: title,
      value: dataIndex || key,
    }));

    return [
      { label: 'ردیف', value: 'rowIndex', disabled: true },
      ...columnsOptions,
    ];
  };

  // Initial checkbox values like: ['firstName', 'lastName']
  const initialCheckboxes = () =>
    getColumnsOptions(columns)
      .map(o => o.value)
      .filter(c => !uiSettings?.tables[tableId]?.hiddenColumns?.includes(c));

  // set true if columns length not equal to columnsSnapshot for showing invisible-eye instead of eye icon.
  useEffect(() => {
    if (
      (!columnsSnapshot.length || !initialCheckboxValues.length) &&
      columns.length
    ) {
      setColumnsSnapshot(columns); // setSnapshotColumns for dynamic tables
      setInitialCheckboxValues(initialCheckboxes()); // set initial checkbox values from uiSettings
    }
    setHasHiddenColumn(columns.length !== columnsSnapshot.length);
  }, [columns, columnsSnapshot]);

  useEffect(() => {
    if (columnsSnapshot.length) onColumnsChange(initialCheckboxes()); // set filtered columns to table
  }, [columnsSnapshot]);

  useEffect(() => {
    setAutoRefreshLiveNumber(autoRefreshInterval);
    if (autoRefreshInterval) {
      const interval = setInterval(resetTable, autoRefreshInterval * 1000);
      return () => {
        clearInterval(interval);
      };
    }
    return () => {};
  }, [autoRefreshInterval]);

  useEffect(() => {
    if (checkboxValues.length) {
      if (checkboxValues.length - columns.length !== 1)
        onColumnsChange(checkboxValues);
    }
  }, [columns]);

  useEffect(() => {
    if (autoRefreshLiveNumber > 0) {
      const time = setTimeout(() => {
        setAutoRefreshLiveNumber(autoRefreshLiveNumber - 1);
      }, 1000);

      return () => {
        clearTimeout(time);
      };
    }
    setAutoRefreshLiveNumber(autoRefreshInterval);

    return () => {};
  }, [autoRefreshLiveNumber]);

  useEffect(() => {
    if (loading) setAutoRefreshLiveNumber(autoRefreshInterval);
  }, [loading]);

  const renderColumnsToggle = () => {
    const options = getColumnsOptions(columnsSnapshot);
    return (
      <div className={s.checkboxGroup}>
        <Checkbox.Group
          options={options}
          onChange={onColumnsChange}
          defaultValue={initialCheckboxValues}
          value={checkboxValues}
        />
      </div>
    );
  };

  return (
    <>
      {withSearch && (
        <Tooltip title="جستجوی پیشرفته">
          <CPButton
            onClick={handleCollapse}
            icon="filter"
            className={cs(s.tool, 'toolbar-tool', s.leftSide, s.marginL4)}
          />
        </Tooltip>
      )}
      <Tooltip title="مدیریت ستون‌ها">
        <Popover
          content={renderColumnsToggle()}
          title="مدیریت نمایش ستون‌ها"
          trigger="click"
          placement="bottom"
        >
          <CPButton
            icon={hasHiddenColumn ? 'eye-invisible' : 'eye'}
            className={cs(s.tool, 'toolbar-tool', s.leftSide, s.marginL4)}
          />
        </Popover>
      </Tooltip>

      {/* Auto Refresh button */}
      <Badge
        dot={!!(loading && autoRefreshInterval)}
        count={autoRefreshLiveNumber}
        style={{ backgroundColor: '#2196F3' }}
        className={s.autoRefresh}
      >
        <Tooltip title="بروزرسانی خودکار">
          <Popover
            content={renderAutoRefreshToggle()}
            title="بازه زمانی"
            trigger="click"
            placement="bottom"
          >
            <CPButton
              icon="hourglass"
              className={cs(s.tool, 'toolbar-tool', s.leftSide, s.marginL4)}
            />
          </Popover>
        </Tooltip>
      </Badge>
    </>
  );
};
ActionButtons.propTypes = {
  handleCollapse: PropTypes.func,
  columns: PropTypes.array,
  postUISettingsAction: PropTypes.func.isRequired,
  uiSettings: PropTypes.object.isRequired,
  resetTable: PropTypes.func.isRequired,
  setColumns: PropTypes.func.isRequired,
  tableId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  withSearch: PropTypes.bool,
};
ActionButtons.defaultProps = {
  handleCollapse: () => {},
  withSearch: false,
  columns: [],
};

const mapState = ({ settings }) => ({
  uiSettings: settings.settings,
});

const mapDispatch = {
  postUISettingsAction,
};
export default connect(mapState, mapDispatch)(withStyles(s)(ActionButtons));
