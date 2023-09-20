import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { addUnitDetailFormSchema } from './addUnitDetailFormSchema';
import FormBuilder from '../../../FormBuilder';
import CPLoading from '../../../CP/CPLoading';
import useProvincesAndCities from '../../../../hooks/useProvincesAndCities';
import { unitServices } from '../../../../service/unitService';

const AddUnitDetailForm = ({
  onCancel,
  onSubmit,
  submitLabel,
  cancelLabel,
  unitType,
  initialValue,
  editMode,
}) => {
  const { loading, cities, provinces, filterCities } = useProvincesAndCities();
  const [submitting, setSubmitting] = useState(false);
  const [currentProvinceId, setCurrentProvinceId] = useState(null);

  const onSelectProvince = id => {
    setCurrentProvinceId(id);
  };

  const filterCitiesBasedOnProvince = () => {
    (async () => {
      await filterCities(
        city =>
          city.province_id ===
          (currentProvinceId || initialValue?.provinceClassificationId),
      );
    })();
  };
  useEffect(filterCitiesBasedOnProvince, [currentProvinceId]);

  const submitHandler = ({
    name,
    address,
    tel,
    postalCode,
    cityClassificationId,
    operationType,
  }) => {
    setSubmitting(true);
    const operationTypeValue =
      unitType !== 'BRANCH' ? 'NON_OPERATIONAL' : operationType;
    const body = {
      ...(editMode && initialValue?.id && { id: initialValue.id }),
      unitType,
      name,
      operationType: operationTypeValue,
      contactDTO: {
        address,
        tel: tel.replace('-', ''),
        cityClassificationId,
        postalCode,
      },
    };
    if (editMode) {
      unitServices
        .updateUnitRequest(body, unitType)
        .then(response => {
          setSubmitting(false);
          onSubmit(response);
        })
        .catch(() => {
          setSubmitting(false);
        });
    } else {
      unitServices
        .registerUnitRequest(body, unitType)
        .then(response => {
          setSubmitting(false);
          onSubmit(response);
        })
        .catch(() => {
          setSubmitting(false);
        });
    }
  };
  const formikPropsRef = useRef(null);

  const [temp, forceRender] = useState(0);

  const bindFormikProps = props => {
    formikPropsRef.current = props;
    if (temp !== 1) {
      forceRender(1);
    }
  };

  useEffect(() => {
    if (currentProvinceId && formikPropsRef) {
      formikPropsRef.current.setFieldValue(
        'cityClassificationId',
        cities[0].id,
      );
    }
  }, [cities]);

  return (
    <CPLoading spinning={loading}>
      <FormBuilder
        initialValues={initialValue}
        bindFormikProps={bindFormikProps}
        schema={addUnitDetailFormSchema({
          cities,
          provinces,
          unitType,
          onSelectProvince,
        })}
        onSubmit={submitHandler}
        onCancel={onCancel}
        cancelLabel={cancelLabel}
        submitLabel={submitLabel}
        loading={submitting}
      />
    </CPLoading>
  );
};

AddUnitDetailForm.defaultProps = {
  cancelLabel: 'انصراف',
  initialValue: {},
  editMode: false,
};

AddUnitDetailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string,
  initialValue: PropTypes.object,
  unitType: PropTypes.oneOf(['BRANCH', 'REPRESENTATIVE', 'AGENT']).isRequired,
  editMode: PropTypes.bool,
};

export default AddUnitDetailForm;
