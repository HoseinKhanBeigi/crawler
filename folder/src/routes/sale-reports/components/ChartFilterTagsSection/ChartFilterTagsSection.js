import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-jalaali';
import { Tag } from 'antd';
import {
  dateFilterOptions,
  filterFormFieldsName,
  filterFormFieldsNameTranslate,
} from '../../../../helpers/chartReportServiceHelpers';
import saleOpportunityStates from '../../../../utils/saleOpportunityStates';

/* eslint-disable no-case-declarations */

const getFilterNameByIdAndType = (type, value, data) => {
  let name = '';
  switch (type) {
    case filterFormFieldsName.users:
      const userInfo = data.crmUsers.find(user => user.levantId === value);
      name = `${userInfo.firstName} ${userInfo.lastName}`;
      break;
    case filterFormFieldsName.saleProducts:
      const productInfo = data.productsList.find(
        product => product.id === value,
      );
      name = productInfo.name;
      break;
    case filterFormFieldsName.dateFrom:
      name = `از تاریخ: ${moment(value).format('jYYYY/jMM/jDD')}`;
      break;
    case filterFormFieldsName.dateTo:
      name = `تا تاریخ: ${moment(value).format('jYYYY/jMM/jDD')}`;
      break;
    case filterFormFieldsName.saleState:
      name = saleOpportunityStates[value];
      break;
    case filterFormFieldsName.date:
      name = value;
      break;
    default:
      break;
  }
  return name;
};

const generateFlattenFiltersObject = (type, value, data) => {
  const arr = [];
  switch (type) {
    case filterFormFieldsName.users:
      arr.push(
        ...value.map(id => ({
          type,
          value: id,
          name: getFilterNameByIdAndType(type, id, data),
        })),
      );
      break;
    case filterFormFieldsName.saleProducts:
      arr.push(
        ...value.map(id => ({
          type,
          value: id,
          name: getFilterNameByIdAndType(type, id, data),
        })),
      );
      break;
    case filterFormFieldsName.saleState:
      arr.push(
        ...value.map(id => ({
          type,
          value: id,
          name: getFilterNameByIdAndType(type, id, data),
        })),
      );
      break;
    default:
      if (value !== dateFilterOptions.SELECT_RANGE) {
        arr.push({
          type,
          value,
          name: getFilterNameByIdAndType(type, value, data),
        });
      }
      break;
  }
  return arr;
};

const ChartFilterTagsSection = ({
  filters,
  key,
  crmUsers,
  productsList,
  // setFilterFormValues,
  filterFields,
}) => {
  const [flattenFilterValues, setFlattenFilterValues] = useState([]);
  const getFiltersNameHandler = filtersForm => {
    if (filtersForm) {
      setFlattenFilterValues(
        Object.entries(filtersForm).reduce(
          (flattenArr, [filterType, value]) => [
            ...flattenArr,
            ...generateFlattenFiltersObject(filterType, value, {
              crmUsers,
              productsList,
            }),
          ],
          [],
        ),
      );
    }
  };

  useEffect(() => {
    getFiltersNameHandler(filters);
  }, [filters]);

  return (
    <div>
      {filterFields
        .filter(
          filterName =>
            filterName !== filterFormFieldsName.date &&
            flattenFilterValues &&
            !flattenFilterValues
              .reduce((p, c) => [...p, c.type], [])
              .includes(filterName),
        )
        .map((item, index) => (
          <Tag
            // eslint-disable-next-line react/no-array-index-key
            key={`tags_${key}_${filterFormFieldsNameTranslate[item]}_${index}`}
          >
            {`همه ${filterFormFieldsNameTranslate[item]}`}
          </Tag>
        ))}
      {flattenFilterValues?.map((item, i) => (
        <Tag
          // eslint-disable-next-line react/no-array-index-key
          key={`tags_${key}_${item.value}_${i}`}
        >
          {item.name}
        </Tag>
      ))}
    </div>
  );
};

ChartFilterTagsSection.defaultProps = {
  filterFields: [],
};

ChartFilterTagsSection.propTypes = {
  filters: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired,
  crmUsers: PropTypes.array.isRequired,
  productsList: PropTypes.array.isRequired,
  // setFilterFormValues: PropTypes.func.isRequired,
  filterFields: PropTypes.array,
};
export default ChartFilterTagsSection;
