import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { AutoComplete, Input } from 'antd';
import { connect } from 'react-redux';
import cs from 'classnames';
import debounce from 'lodash/debounce';
import s from './HeaderSearchBar.scss';
import { getFullSearchAction } from '../../store/fullSearch/fullSearch.actions';
import Link from '../Link';
import { formatNumbers } from '../../utils';

const { Option } = AutoComplete;
const { Search } = Input;

const HeaderSearchBar = props => {
  const { className } = props;
  const [value, setValue] = useState(null);
  const [noData, setNoData] = useState(null);

  const onClickItem = () => {
    setValue(null);
    setNoData(null);
  };

  const onSearch = async v => {
    const data = formatNumbers(v);
    setValue(null);
    try {
      const searchData = await props.getFullSearchAction(
        data,
        undefined,
        undefined,
        false,
      );
      const options = searchData.content.map(item => {
        // fallback values to empty string
        const { id, levantId } = item;
        const mobilePhone = item.mobilePhone || '';
        const name =
          item.firstName || item.lastName
            ? `(${item.firstName || '---'} ${item.lastName || '---'})`
            : item.name
            ? item.name
            : '';

        if (searchData.content.length !== 0) {
          return (
            <Option disabled key={id} className="show-all">
              <Link to={`/lead/${levantId}`} onClick={() => onClickItem(data)}>
                {`${mobilePhone} ${name}`}
              </Link>
            </Option>
          );
        }
        setNoData('نتیجه ای یافت نشد!');
        return item;
      });

      setValue(!data ? [] : options);
    } catch (e) {
      return e;
    }
    return null;
  };
  return (
    <div className={cs([s.headerSearchBar], className)}>
      <AutoComplete
        dataSource={value}
        style={{ width: '100%', direction: 'rtl !important' }}
        onSearch={debounce(onSearch, 1000)}
        notFoundContent={noData}
      >
        <Search placeholder="جستجو" className="headerSearchBar" />
      </AutoComplete>
    </div>
  );
};

HeaderSearchBar.propTypes = {
  className: PropTypes.string,
  getFullSearchAction: PropTypes.func.isRequired,
};

HeaderSearchBar.defaultProps = {
  className: null,
};

const mapStateToProps = state => ({
  searchData: state.fullSearch.data,
});

const mapDispatch = {
  getFullSearchAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(HeaderSearchBar));
export const HeaderSearchBarTest = HeaderSearchBar;
