import React, { useState, useEffect } from 'react';
import { Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CPSelect from '../CP/CPSelect';
import CPMessage from '../CP/CPMessage';
import { getPipelinesAction } from '../../store/opportunities/opportunities.actions';
import CPMultiSelect from '../CP/CPMultiSelect';

const AssignmentPipelineProduct = props => {
  const {
    products,
    pipeline,
    onRemove,
    onSelectProduct,
    onSelectPipeline,
  } = props;
  const [employeePipelines, setEmployeePipelines] = useState();
  const [employeeProducts, setEmployeeProducts] = useState([]);
  const [pipelinesValue, setPipelinesValue] = useState(
    pipeline.pipelineIds.length ? pipeline.pipelineIds : [],
  );

  const availableProducts = () => {
    const filteredProducts = products?.map(({ title, code }) => ({
      text: title,
      value: code,
    }));
    setEmployeeProducts(filteredProducts);
  };

  const availablePipeline = async code => {
    const result = await props.getPipelinesAction(code);
    if (!result.err) {
      const lists = result.map(({ id, title }) => ({
        text: title,
        value: id,
      }));
      setEmployeePipelines(lists);
    } else CPMessage('خطا در دریافت لیست پایپ لاین!');
    return true;
  };

  const onChangePipeline = value => {
    const prevPipelines = [...value];
    onSelectPipeline(pipeline, prevPipelines);
    setPipelinesValue(prevPipelines);
  };

  const onRemoveItem = () => {
    onRemove(pipeline);
  };

  const onChangeProduct = value => {
    onSelectProduct(pipeline, value);
    setPipelinesValue([]);
    availablePipeline(value);
  };

  useEffect(() => {
    availableProducts();
    availablePipeline(pipeline.productCode);
  }, []);

  return (
    <>
      <Row gutter={24} align="top" type="flex">
        <Col span={11}>
          <small>محصول</small>
          <CPSelect
            defaultValue={pipeline?.productCode}
            dataSource={employeeProducts}
            onChange={value => {
              onChangeProduct(value);
            }}
          />
        </Col>
        <Col span={11}>
          <small>پایپ لاین</small>
          <CPMultiSelect
            value={pipelinesValue}
            onChange={(value, opt) => {
              onChangePipeline(value, opt);
            }}
            dataSource={employeePipelines}
          />
        </Col>
        <Col span={2}>
          <Icon
            type="minus-circle"
            style={{ color: '#ff4d4f', cursor: 'pointer', marginTop: '25px' }}
            onClick={onRemoveItem}
          />
        </Col>
      </Row>
    </>
  );
};

AssignmentPipelineProduct.propTypes = {
  products: PropTypes.array,
  pipeline: PropTypes.object,
  onSelectProduct: PropTypes.func,
  onSelectPipeline: PropTypes.func,
  getPipelinesAction: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};
AssignmentPipelineProduct.defaultProps = {
  products: [],
  pipeline: {},
  onRemove: () => {},
  onSelectProduct: () => {},
  onSelectPipeline: () => {},
};
const mapStateToProps = state => ({
  products: state.getProducts.data,
});

const mapDispatch = {
  getPipelinesAction,
};

export default connect(mapStateToProps, mapDispatch)(AssignmentPipelineProduct);
