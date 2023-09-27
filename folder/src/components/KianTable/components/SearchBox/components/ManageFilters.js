import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Tag } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManageFilters.scss';
import convertToJalaliDate from '../../../../../utils/date';

const ManageFilters = props => {
  const { filters, fields, handleFilter } = props;

  const filterName = name => fields.find(f => f.name === name)?.title;

  const filterValue = name => {
    const field = fields.find(f => f.name === name);
    switch (field?.type) {
      case 'input':
        return filters[name].toString();
      case 'fromDateTime':
      case 'toDateTime':
      case 'date':
        return convertToJalaliDate(+filters[name], 'jYYYY/jMM/jDD HH:mm:ss ');
      case 'dropDown':
        return field.data.find(f => String(f.value) === String(filters[name]))
          ?.text;
      case 'select':
        if (field.mode === 'multiple') {
          const array = [];
          filters[name]
            .split(',')
            .forEach(id =>
              array.push(field.data.find(f => String(f.value) === id)?.label),
            );
          return array;
        }
        return filters[name];
      default:
        return '؟؟؟';
    }
  };

  const removeFilter = name => () => {
    handleFilter(
      { ...filters, [name]: typeof filters[name] === 'object' ? [] : '' },
      true,
    );
  };

  function removeAllFilters() {
    const cleanFilters = {};
    Object.keys(filters).forEach(name => {
      if (filters[name] && String(filters[name]).length) {
        cleanFilters[name] = typeof filters[name] === 'object' ? [] : '';
      }
    });
    handleFilter(cleanFilters, true);
  }

  const filteredFilterKeys = () =>
    Object.keys(filters).filter(
      name => filters[name] && String(filters[name]).length,
    );

  const renderFilterBadges = () =>
    filteredFilterKeys().map(filter => (
      <Col key={filter}>
        <Tag
          color="purple"
          closable
          onClose={removeFilter(filter)}
        >{`${filterName(filter)}: ${filterValue(filter)}`}</Tag>
      </Col>
    ));

  return filteredFilterKeys().length ? (
    <Row type="flex" className={s.filtersManager}>
      {filteredFilterKeys().length > 1 ? (
        <Col>
          <Tag closable visible onClose={removeAllFilters} color="red">
            حذف همه
          </Tag>
        </Col>
      ) : null}
      {renderFilterBadges()}
    </Row>
  ) : null;
};

ManageFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default withStyles(s)(ManageFilters);
