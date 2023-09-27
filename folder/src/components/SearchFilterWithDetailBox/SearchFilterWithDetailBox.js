import React from 'react';
import { Descriptions } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchFilterWithDetailBox.scss';
import CPSearchFilter from '../CP/CPSearchFilter';
import CPEmpty from '../../components/CP/CPEmpty';

const { Item } = Descriptions;

const SearchFilterWithDetailBox = props => {
  const {
    onClickItem,
    lists,
    headerTitle,
    withSearchButton,
    width,
    defaultValue,
  } = props;

  const handleSearchItemClick = item => {
    onClickItem(item);
  };

  const renderUserInfoDesc = () => (
    <Descriptions layout="vertical" column={2}>
      {lists?.map(item => (
        <Item label={item?.label} className={s.label}>
          {item?.value || '- - -'}
        </Item>
      ))}
    </Descriptions>
  );

  return (
    <>
      <div className={s.header_title}>{headerTitle}</div>
      <div className={s.input_container} style={{ width }}>
        <CPSearchFilter
          defaultValue={defaultValue}
          onClickItem={handleSearchItemClick}
          size="medium"
          withSearchButton={withSearchButton}
        />
      </div>
      {lists.length > 0 && (
        <div className={s.desc_container}>{renderUserInfoDesc()}</div>
      )}
      {!lists.length && <CPEmpty description="نتیجه ای یافت نشد!" />}
    </>
  );
};

SearchFilterWithDetailBox.propTypes = {
  onClickItem: PropTypes.func,
  lists: PropTypes.array,
  headerTitle: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withSearchButton: PropTypes.bool,
  defaultValue: PropTypes.string,
};
SearchFilterWithDetailBox.defaultProps = {
  onClickItem: () => {},
  lists: [],
  width: 228,
  defaultValue: '',
  withSearchButton: true,
  headerTitle: 'نام مخاطب مورد نظر را جستجو کنید',
};
export default withStyles(s)(SearchFilterWithDetailBox);
