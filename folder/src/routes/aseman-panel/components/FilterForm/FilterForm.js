import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FilterForm.scss';
import FormBuilder from '../../../../components/FormBuilder';
import { filters, filtersSchema } from '../../utils/filtersSchema';
import { AsemanPanelContext } from '../../store';
import { filterAction } from '../../store/actions';
import {
  mockChannels,
  mockProducts,
  mockProviders,
} from '../../mock/constants';

const FilterForm = ({ filterFields }) => {
  const {
    state: { filter },
    dispatch,
  } = useContext(AsemanPanelContext);
  const [selectedDateFilterOption, setSelectedDateFilterOption] = useState(
    filter[filters.DATE],
  );
  const formikPropsRef = useRef();
  const bindFormikProps = props => {
    formikPropsRef.current = props;
  };
  const submitFormHandler = form => {
    dispatch(filterAction(form));
  };
  useEffect(() => {
    if (
      JSON.stringify(filter) !== JSON.stringify(formikPropsRef.current.values)
    ) {
      formikPropsRef.current?.resetForm(filter);
    }
  }, [filter]);

  return (
    <div className={s.filterForm}>
      <FormBuilder
        hideSubmit
        bindFormikProps={bindFormikProps}
        schema={filtersSchema({
          saleChannels: mockChannels,
          providers: mockProviders,
          filterFields,
          products: mockProducts,
          selectedDateFilterOption,
          setSelectedDateFilterOption,
        })}
        initialValues={filter}
        onSubmit={submitFormHandler}
      />
      <Button block type="primary" onClick={formikPropsRef.current?.submitForm}>
        اعمال فیلتر
      </Button>
    </div>
  );
};

FilterForm.propTypes = {
  filterFields: PropTypes.array.isRequired,
};

export default withStyles(s)(FilterForm);
