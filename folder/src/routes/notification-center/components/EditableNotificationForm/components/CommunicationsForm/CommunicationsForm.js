import React, { useMemo } from 'react';
import { Form, Icon } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CommunicationsForm.scss';
import Label from '../Label/Label';
import CPSelect from '../../../../../../components/CP/CPSelect';
import { channelDataSource } from '../../../../constants/channelDataSource';

const CommunicationsForm = ({
  index,
  handleDelete,
  channelTypeValue,
  handleChange,
  receiptsValue,
  errors,
  channelNotSelected,
}) => {
  const generateErrorMessage = useMemo(() => {
    if (errors && errors[index]?.receipts) {
      if (channelNotSelected) {
        return <small>لطفا راه ارتباطی را انتخاب کنید</small>;
      } else if (Array.isArray(errors[index].receipts)) {
        const error = errors[index].receipts.find(e => typeof e === 'string');
        return <small>{error}</small>;
      }
      return <small>{errors[index].receipts}</small>;
    }
    return undefined;
  }, [errors, channelNotSelected]);
  return (
    <div className={s.inputs}>
      <div className={s.channel}>
        {!index && <Label text="راه ارتباطی" />}
        <Form.Item
          htmlFor={`communicationList.${index}.notificationChannel`}
          validateStatus={
            errors && errors[index]?.notificationChannel ? 'error' : 'success'
          }
          help={
            errors &&
            errors[index]?.notificationChannel && (
              <small>{errors[index]?.notificationChannel}</small>
            )
          }
        >
          <CPSelect
            name={`communicationList.${index}.notificationChannel`}
            value={channelTypeValue || undefined}
            dataSource={channelDataSource}
            placeholder="انتخاب کنید"
            onChange={handleChange(
              `communicationList.${index}.notificationChannel`,
            )}
          />
        </Form.Item>
      </div>
      <div className={s.receipts}>
        {!index && <Label text="آدرس ها" />}
        <Form.Item
          htmlFor={`communicationList.${index}.receipts`}
          validateStatus={
            errors && errors[index]?.receipts ? 'error' : 'success'
          }
          help={generateErrorMessage}
        >
          <div style={{ position: 'relative', width: '100%' }}>
            <CPSelect
              name={`communicationList.${index}.receipts`}
              onChange={value =>
                Array.isArray(value)
                  ? handleChange(`communicationList.${index}.receipts`)(value)
                  : undefined
              }
              value={receiptsValue}
              mode="tags"
              placeholder="وارد کنید"
            />
            {!!index && (
              <Icon
                className={s.deleteButton}
                type="minus-circle"
                onClick={handleDelete}
              />
            )}
          </div>
        </Form.Item>
      </div>
    </div>
  );
};

CommunicationsForm.propTypes = {
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  channelTypeValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  receiptsValue: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  channelNotSelected: PropTypes.bool.isRequired,
};

export default withStyles(s)(CommunicationsForm);
