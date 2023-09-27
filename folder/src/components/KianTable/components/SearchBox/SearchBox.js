import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {
  AutoComplete,
  Col,
  Collapse,
  Divider,
  Icon,
  Input,
  Row,
  Select,
} from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import debounce from 'lodash/debounce';
import s from './SearchBox.scss';
import CPSelect from '../../../CP/CPSelect';
import CPInput from '../../../CP/CPInput';
import CPDateTimePicker from '../../../CP/CPDateTimePicker';
import CPButton from '../../../CP/CPButton';
import { createFilterParams } from '../../helpers/createQueryParams';
import ManageFilters from './components/ManageFilters';
import FilterPresets from './components/FilterPresets';
import {
  hasSearchParams,
  queryFilterObject,
  setSearchParams,
} from '../../helpers/searchParams';

/* eslint-disable react/prop-types */

const { Panel } = Collapse;

const SearchBox = props => {
  const {
    fields,
    onFilter,
    loading,
    filterType,
    showSearchBox,
    setShowSearchBox,
    excludeSearchFields,
  } = props;
  const [formData, setFormData] = useState({});
  const [currentFilter, setCurrentFilter] = useState({});

  const onChange = name => value => {
    setFormData({ ...formData, [name]: value });
  };

  const onChangeInput = name => e => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  // eslint-disable-next-line react/prop-types
  const createInput = ({ name, title, suffix, placeholder }) => (
    <div>
      <small>{title}:</small>
      <CPInput
        placeholder={placeholder}
        value={formData[name]}
        onChange={onChangeInput(name)}
        suffix={suffix}
      />
    </div>
  );

  // eslint-disable-next-line react/prop-types
  const createSelect = ({
    name,
    title,
    mode,
    onSearch = () => {},
    data,
    multipleSelect,
    placeholder = '',
    suffix = '',
  }) => {
    if (mode === 'multiple') {
      const handleChange = values => {
        const parsedValues = values.map(d => `${d.key}`).join(',');
        onChange(name)(parsedValues);
      };
      return (
        <div>
          <small>{title}:</small>
          <Select
            suffix={suffix}
            disabled={loading}
            onChange={handleChange}
            placeholder={placeholder}
            mode="multiple"
            notFoundContent={<p>نتیجه‌ای یافت نشد!</p>}
            labelInValue
            filterOption={false}
            onSearch={debounce(onSearch, 1000)}
          >
            {data?.map(option => (
              <Select.Option key={option.label} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      );
    }
    return (
      <div>
        <small>{title}:</small>
        <CPSelect
          dataSource={data}
          suffix={suffix}
          disabled={loading}
          placeholder={placeholder}
          value={formData[name]}
          onChange={value => {
            if (multipleSelect) {
              if (Array.isArray(value)) {
                const parsedValues = value.join(',');
                onChange(name)(parsedValues);
              }
            } else {
              onChange(name)(value);
            }
          }}
          mode="tags"
        />
      </div>
    );
  };

  // eslint-disable-next-line react/prop-types
  const createDateTimePicker = ({ name, title, pickTime = true }) => (
    <div>
      <small>{title}:</small>
      <CPDateTimePicker
        value={+formData[name]}
        onChange={onChange(name)}
        minDate={
          name === 'to' && formData.from !== ''
            ? new Date(+formData.from).getTime() + 24 * 60 * 60 * 1000
            : null
        }
        maxDate={name === 'from' && formData.to !== '' ? +formData.to : null}
        id={name}
        pickTime={pickTime}
      />
    </div>
  );

  const handleDropDownChange = (ev, value, name) => {
    onChange(name)(value);
    ev(value);
  };

  // eslint-disable-next-line react/prop-types
  const createDropDown = ({
    name,
    data,
    title,
    mode = 'default',
    placeholder = '',
    onChange: ev = () => {},
  }) => (
    <div>
      <small>{title}:</small>
      <CPSelect
        placeholder={placeholder}
        value={formData[name]}
        dataSource={data}
        onChange={value => handleDropDownChange(ev, value, name)}
        mode={mode}
        showSearch
        disabled={loading}
      />
    </div>
  );

  const createAutocomplete = ({ title, name, dataSource, onSearch }) => (
    <div>
      <small>{title}:</small>
      <AutoComplete
        filterOption={false}
        notFoundContent="نتیجه‌ای یافت نشد!"
        onChange={onChange(name)}
        value={formData[name]}
        optionLabelProp="text"
        onSearch={onSearch}
        dataSource={dataSource}
      >
        <Input suffix={<Icon type="search" />} />
      </AutoComplete>
    </div>
  );

  const generateField = field => {
    switch (field.type) {
      case 'input':
        return createInput(field);
      case 'select':
        return createSelect(field);
      case 'dropDown':
        return createDropDown(field);
      case 'autocomplete':
        return createAutocomplete(field);
      case 'fromDateTime': // keep this just for backward compatibility
      case 'toDateTime': // keep this just for backward compatibility
      case 'date':
        return createDateTimePicker(field);
      default:
        return null;
    }
  };

  const cleanFilterObject = (filterObj, full = true) => {
    const cleanFormData = {};
    fields.forEach(field => {
      if (full) {
        cleanFormData[field.name] = filterObj[field.name];
      } else if (filterObj[field.name])
        cleanFormData[field.name] = filterObj[field.name];
    });

    return cleanFormData;
  };

  const handleFilter = (filterObject, shouldUpdate = false) => {
    const cleanFilterObj = cleanFilterObject(filterObject);
    if (shouldUpdate) setFormData(cleanFilterObj);
    setCurrentFilter(cleanFilterObj);
    onFilter(createFilterParams(cleanFilterObj));
    setSearchParams(cleanFilterObj);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setShowSearchBox('');
    handleFilter(formData);
  };

  const filteredFormData = () => {
    const filteredData = {};
    const activeFilters = Object.keys(formData).filter(
      f => formData[f] && String(formData[f]).length,
    );
    activeFilters.forEach(active => {
      filteredData[active] = formData[active];
    });
    return filteredData;
  };

  const handleFilterPresetChange = filterObject => id => {
    const selectedPreset = filterObject.find(f => f.id === id);
    if (selectedPreset)
      setFormData(cleanFilterObject(JSON.parse(selectedPreset.searchObject)));
  };

  useEffect(() => {
    if (hasSearchParams()) {
      const filterObj = queryFilterObject(); // should clean it and map it to the fields
      handleFilter(cleanFilterObject(filterObj, false));
      setFormData(cleanFilterObject(filterObj, false));
    }
  }, [fields]);

  return (
    <>
      <Row type="flex" className={s.wrapper}>
        <Col span={24}>
          <Collapse
            className={cs(
              s.searchBox,
              showSearchBox ? 'visible' : 'invisible',
              'kian-table-search-box',
            )}
            activeKey={showSearchBox}
          >
            <Panel header="جستجو پیشرفته" key="searchBox">
              <form onSubmit={handleSubmit}>
                <Row type="flex" gutter={[16, 8]}>
                  {fields
                    .filter(item => !excludeSearchFields.includes(item.name))
                    .map(field => (
                      <>
                        {field?.divider &&
                          field?.divider.position === 'TOP' && (
                            <Divider orientation="left">
                              {field.divider.name}
                            </Divider>
                          )}
                        <Col
                          key={field.name}
                          xl={6}
                          lg={6}
                          md={8}
                          sm={12}
                          xs={24}
                          {...field.grid}
                        >
                          {generateField(field)}
                        </Col>
                        {field?.divider &&
                          field?.divider.position === 'BOTTOM' && (
                            <Divider orientation="left">
                              {field.divider.name}
                            </Divider>
                          )}
                      </>
                    ))}
                  <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                    <Row type="flex" gutter={[8, 8]}>
                      {filterType && (
                        <FilterPresets
                          filterType={filterType}
                          filterObject={filteredFormData()}
                          handleFilterPresetChange={handleFilterPresetChange}
                        />
                      )}
                      <Col span={filterType ? 4 : 24} className="searchButton">
                        <CPButton
                          type="primary"
                          icon="search"
                          loading={loading}
                          htmlType="submit"
                          disabled={!Object.keys(filteredFormData()).length}
                          style={{ width: filterType ? '100%' : 'auto' }}
                        >
                          {filterType ? '' : 'جستجو'}
                        </CPButton>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </form>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <ManageFilters
        filters={currentFilter}
        fields={fields}
        handleFilter={handleFilter}
      />
    </>
  );
};

SearchBox.propTypes = {
  fields: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  filterType: PropTypes.string.isRequired,
  showSearchBox: PropTypes.string.isRequired,
  setShowSearchBox: PropTypes.func.isRequired,
  excludeSearchFields: PropTypes.array,
};

SearchBox.defaultProps = {
  excludeSearchFields: [],
};

export default withStyles(s)(SearchBox);
