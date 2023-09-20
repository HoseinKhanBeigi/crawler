/* eslint-disable import/first */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Select } from 'antd';
import CPButton from '../../../../../../CP/CPButton/CPButton';
import Text from 'antd/lib/typography/Text';
import useAddNonOperationBranch from './hook';

const FormCreateOperationBranch = props => {
  const { onSubmit, onCancle, tableData } = props;

  const [data, target, setSelect] = useAddNonOperationBranch(tableData);
  return (
    <Row type="flex" gutter={[6, 2]} align="bottom" justify="space-between">
      <Col span={24}>
        <Text style={{ fontSize: '12px' }}>نام شعبه</Text>
        <Text type="danger"> *</Text>
      </Col>
      <Col span={13}>
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder="انتخاب کنید"
          optionFilterProp="children"
          onChange={setSelect}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {data.map(item => (
            <Select.Option value={item.code} key={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col>
        <CPButton
          type="danger"
          style={{ borderColor: '#ffa8a8', marginLeft: 8 }}
          onClick={onCancle}
          ghost
        >
          انصراف
        </CPButton>
        <CPButton
          type="primary"
          disabled={!target}
          onClick={onSubmit.bind(null, target)}
        >
          تایید
        </CPButton>
      </Col>
    </Row>
  );
};

FormCreateOperationBranch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancle: PropTypes.func.isRequired,
  tableData: PropTypes.array.isRequired,
};

export default FormCreateOperationBranch;
