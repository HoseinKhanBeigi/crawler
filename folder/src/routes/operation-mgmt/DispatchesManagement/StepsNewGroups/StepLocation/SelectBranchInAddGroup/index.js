import React from 'react';
import { Button, Select, Tag } from 'antd';
import PropType from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';
import CPMultiSelect from '../../../../../../components/CP/CPMultiSelect/CPMultiSelect';
import useSelectBranchInAddGroup from './hook';

const { Option } = Select;

const SelectBranchInAddGroup = props => {
  const {
    loading,
    active,
    cities,
    cityId,
    representativies,
    branches,
    representativieSelected,
    branchSelected,
    onBranchSelected,
    onCitySelect,
    onRepresentativeSelect,
    onRepresentativieSelected,
    onClear,
  } = useSelectBranchInAddGroup();
  const { branchesAdded, onAddBranch, onRemoveBranch } = props;

  return (
    <>
      <div className={s.selectedContainer}>
        <div className={s.label}>شهر *</div>
        <Select
          placeholder="انتخاب کنید"
          loading={loading === 'cities'}
          onChange={onCitySelect}
          value={cityId}
          className={s.select}
        >
          {cities.map(item => (
            <Option value={item.value} key={item.value}>
              {item.text}
            </Option>
          ))}
        </Select>
      </div>
      <div className={s.selectedContainer}>
        <div className={s.label}>نمایندگی *</div>
        <CPMultiSelect
          placeholder="انتخاب کنید"
          dataSource={representativies}
          value={representativieSelected}
          onChange={onRepresentativieSelected}
          onBlur={onRepresentativeSelect}
          disabled={!active.includes('representative')}
        />
      </div>
      <div className={s.selectedContainer}>
        <div className={s.label}>شعبه *</div>
        <CPMultiSelect
          placeholder="انتخاب کنید"
          dataSource={branches}
          value={branchSelected}
          onChange={onBranchSelected}
          disabled={!active.includes('branch')}
        />
      </div>
      <div className={s.addContainer}>
        <Button
          size="small"
          onClick={() => {
            onAddBranch(branchSelected, branches);
            onClear();
          }}
          type="primary"
          className={s.btn}
          disabled={branchSelected.length <= 0}
        >
          افزودن
        </Button>
      </div>
      <div className={s.title}>لیست شعب</div>
      <div className={s.tagList}>
        {branchesAdded.map(item => (
          <Tag
            closable
            key={item.value}
            onClose={() => onRemoveBranch(item.value)}
            style={{ marginBottom: '4px' }}
          >
            {item.text}
          </Tag>
        ))}
      </div>
    </>
  );
};
SelectBranchInAddGroup.propTypes = {
  branchesAdded: PropType.array,
  onAddBranch: PropType.func.isRequired,
  onRemoveBranch: PropType.func.isRequired,
};
SelectBranchInAddGroup.defaultProps = {
  branchesAdded: [],
};
export default withStyles(s)(SelectBranchInAddGroup);
