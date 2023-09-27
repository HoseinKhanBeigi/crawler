import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AutoComplete, Icon, Input, Button } from 'antd';
import debounce from 'lodash/debounce';
import { getFullSearchAction } from '../../../store/fullSearch/fullSearch.actions';
import partyService from '../../../service/partyService';

const { Option } = AutoComplete;

const CPSearchFilter = props => {
  const {
    onClickItem,
    searchAll,
    allowClear,
    autoFocus,
    size,
    onChange,
    filterActives,
    defaultValue,
    withSearchButton,
    ignoreContextWhenFullSearch,
    newRelationSearchInput,
    disabled,
    partyType,
  } = props;
  const [emptyResult, setEmptyResult] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  function generateFullName(item) {
    const { firstName, lastName, name, mobilePhone } = item;
    if (firstName || lastName) {
      return `${firstName} ${lastName}`;
    } else if (name) {
      return name;
    } else if (mobilePhone) {
      return mobilePhone;
    }
    return '';
  }

  const onSelectItem = selected => {
    const fullName = generateFullName(selected);
    const info = {
      fullName,
      ...selected,
    };

    if (!newRelationSearchInput) {
      partyService
        .getPersonContactInfoByLevantId(info?.levantId)
        .then(response => {
          onClickItem({ ...selected, ...response });
        });
    } else if (newRelationSearchInput) {
      onClickItem({ ...selected });
    }
  };

  const renderOption = item => {
    const { id } = item;
    let text;
    if (item.name) {
      text = item.name;
    } else if (item.firstName || item.lastName) {
      text = `${item?.firstName} ${item?.lastName}`;
    } else if (item.mobilePhone) {
      text = item.mobilePhone;
    }
    return (
      <Option
        key={id}
        text={text}
        value={text}
        onClick={() => onSelectItem(item)}
      >
        <div className="global-search-item">
          <span className="global-search-item-desc">
            {generateFullName(item)}
          </span>
        </div>
      </Option>
    );
  };

  async function getFullSearch(value) {
    if (value) {
      const searchData = await props.getFullSearchAction(
        value,
        partyType,
        searchAll,
        filterActives,
        ignoreContextWhenFullSearch,
      );
      if (searchData) {
        const options = searchData?.content?.map(item => renderOption(item));
        setSearchResult(options);
        setEmptyResult(null);
        if (defaultValue && searchData?.content?.length === 1) {
          onSelectItem(searchData?.content[0]);
        }
      } else {
        setSearchResult(null);
        setEmptyResult('نتیجه ای یافت نشد!');
      }
    } else {
      setSearchResult(null);
      setEmptyResult('نتیجه ای یافت نشد!');
    }
  }

  useEffect(() => {
    if (defaultValue) getFullSearch(defaultValue);
  }, []);

  const handleSearch = async value => {
    try {
      getFullSearch(value);
    } catch (e) {
      return false;
    }
    return false;
  };

  const renderSuffixInput = () =>
    withSearchButton ? (
      <Button
        className="search-btn"
        style={{ marginRight: -12 }}
        size={size}
        type="primary"
      >
        <Icon type="search" />
      </Button>
    ) : (
      <Icon
        type="search"
        style={{ color: '#b8b8b8', fontSize: '15px', paddingLeft: 10 }}
      />
    );

  return (
    <>
      <div className="global-search-wrappe" style={{ marginBottom: '18px' }}>
        <AutoComplete
          defaultValue={defaultValue}
          allowClear={allowClear}
          autoFocus={autoFocus}
          className="global-search"
          size={size}
          onChange={onChange}
          style={{ width: '100%' }}
          onSearch={debounce(handleSearch, 1000)}
          dataSource={searchResult}
          placeholder="جستجو..."
          notFoundContent={emptyResult}
          optionLabelProp="value"
          disabled={disabled}
        >
          <Input suffix={renderSuffixInput()} />
        </AutoComplete>
      </div>
    </>
  );
};

CPSearchFilter.defaultProps = {
  searchAll: true,
  allowClear: true,
  autoFocus: false,
  filterActives: false,
  size: 'large',
  onChange: () => {},
  defaultValue: '',
  withSearchButton: true,
  ignoreContextWhenFullSearch: true,
  newRelationSearchInput: false,
  disabled: false,
  partyType: 'UNKNOWN',
};
CPSearchFilter.propTypes = {
  onClickItem: PropTypes.func.isRequired,
  getFullSearchAction: PropTypes.func.isRequired,
  searchAll: PropTypes.bool,
  ignoreContextWhenFullSearch: PropTypes.bool,
  onChange: PropTypes.func,
  allowClear: PropTypes.bool,
  autoFocus: PropTypes.bool,
  filterActives: PropTypes.bool,
  size: PropTypes.string,
  defaultValue: PropTypes.string,
  withSearchButton: PropTypes.bool,
  newRelationSearchInput: PropTypes.bool,
  disabled: PropTypes.bool,
  partyType: PropTypes.string,
};

const mapDispatch = {
  getFullSearchAction,
};

export default connect(null, mapDispatch)(CPSearchFilter);
