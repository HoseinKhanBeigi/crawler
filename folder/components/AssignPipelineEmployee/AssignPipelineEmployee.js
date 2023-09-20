import React, { useEffect, useState } from 'react';
import { Col, Divider, Row } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './AssignPipelineEmployee.scss';
import CPButton from '../CP/CPButton';
import AssignmentPipelineProduct from '../AssignmentPipelineProduct';
import branchManagementService from '../../service/branchManagementService';
import CPMessage from '../CP/CPMessage';
import CPLoading from '../CP/CPLoading';

const AssignPipelineEmployee = props => {
  const { onSuccess, employeeInfoDetail, okTitle, editMode } = props;
  const [pipelines, setPipelines] = useState([]);
  const [pipelineSubmitLoading, setPipelineSubmitLoading] = useState(false);
  const [getInitialPipelineLoading, setGetInitialPipelineLoading] = useState(
    false,
  );

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const addNewPipeline = () => {
    const id = getRndInteger(1, 20000); // returns a random integer from 1 to 20000;
    const obj = {
      id,
      pipelineIds: [],
      productCode: null,
    };
    const prevPipelines = [...pipelines];
    prevPipelines.push(obj);
    setPipelines(prevPipelines);
  };

  const removePipeline = candidatePipeline => {
    const { id } = candidatePipeline;
    const filtered = pipelines.filter(item => item.id !== id);
    setPipelines(() => [...filtered]);
  };

  const generateProduct = (item, value) =>
    // eslint-disable-next-line array-callback-return,consistent-return
    pipelines.map(p => {
      const candidate = p;
      if (candidate.id === item.id) {
        candidate.productCode = value;
        candidate.pipelineIds = [];
      }
      return candidate;
    });

  const onSelectProduct = (item, value) => {
    const candidatePipelines = generateProduct(item, value);
    setPipelines(candidatePipelines);
  };

  const generatePipeline = (item, value) => {
    const i = { ...item };
    const ps = [...pipelines];
    // eslint-disable-next-line array-callback-return,consistent-return
    ps.map(p => {
      if (p.id === i.id && p.productCode === i.productCode) {
        // eslint-disable-next-line no-param-reassign
        p.pipelineIds = value;
        return p;
      }
    });
    return ps;
  };

  const onSelectPipeline = (item, value) => {
    const candidatePipelines = generatePipeline(item, value);
    setPipelines(candidatePipelines);
  };

  const makeBody = () => {
    const candidatePipelines = pipelines;
    const purePipeline = [];
    candidatePipelines.map(p => {
      const candidate = { ...p };
      delete candidate.id;
      purePipeline.push({
        pipelineIds: p.pipelineIds,
        productCode: p.productCode,
      });
      return p;
    });
    return purePipeline;
  };

  const submitPipeline = () => {
    if (pipelines.length) {
      setPipelineSubmitLoading(true);
      const body = {
        accesses: makeBody(),
      };
      branchManagementService
        .putChangeProductPipelineUserAccess(body, employeeInfoDetail?.userId)
        .then(response => {
          const { result } = response;
          onSuccess(result);
          setPipelineSubmitLoading(false);
        })
        .catch(() => {
          CPMessage('خطای سرویس', 'error');
          setPipelineSubmitLoading(false);
        });
    } else
      CPMessage('لطفا ابتدا لیست پایپ لاین های خود را ایجاد کنید!', 'warning');
  };

  useEffect(() => {
    function initPipelines() {
      const { userId } = employeeInfoDetail;
      const makePipelineProductListInit = items => {
        const list = [...items];
        const pipelinesItem = [];
        list.map(value => {
          const id = getRndInteger(1, 20000); // returns a random integer from 1 to 20000;
          pipelinesItem.push({
            id,
            pipelineIds: value.pipelineIds,
            productCode: value.productCode,
          });
          return value;
        });
        setPipelines(pipelinesItem);
      };

      setGetInitialPipelineLoading(true);
      branchManagementService.getUserPipelineProductList(userId).then(
        response => {
          const { accesses } = response;
          if (accesses?.length) {
            makePipelineProductListInit(accesses);
          }
          setGetInitialPipelineLoading(false);
        },
        () => {
          setGetInitialPipelineLoading(false);
        },
      );
    }

    if (editMode) initPipelines();
  }, []);

  return (
    <>
      <CPLoading
        spinning={getInitialPipelineLoading && editMode}
        tip="در حال دریافت پایپ لاین های اختصاص داده شده..."
      >
        <Row gutter={24}>
          <Col span={24}>
            <div className={s.employeeInfoDescription_container}>
              <div style={{ minHeight: '200px' }}>
                {pipelines?.map(pipeline => (
                  <div style={{ marginBottom: '20px' }} key={pipeline.id}>
                    <AssignmentPipelineProduct
                      pipeline={pipeline}
                      onRemove={removePipeline}
                      onSelectProduct={onSelectProduct}
                      onSelectPipeline={onSelectPipeline}
                    />
                  </div>
                ))}
                <Row gutter={24} justify="center" type="flex">
                  <Col span={12}>
                    <CPButton
                      icon="plus"
                      type="dashed"
                      style={{ width: '269px', margin: '12px 0 30px 0' }}
                      onClick={addNewPipeline}
                    >
                      محصول جدید
                    </CPButton>
                  </Col>
                </Row>
              </div>

              <Row gutter={24}>
                <Divider />
              </Row>
              <Row
                gutter={24}
                style={{ justifyContent: 'space-between', direction: 'ltr' }}
              >
                <Col span={24} style={{ textAlign: 'left' }}>
                  <CPButton
                    type="primary"
                    disabled={!pipelines?.length && !editMode}
                    onClick={submitPipeline}
                    className={s.button}
                    loading={pipelineSubmitLoading}
                  >
                    {okTitle}
                  </CPButton>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </CPLoading>
    </>
  );
};

AssignPipelineEmployee.propTypes = {
  onSuccess: PropTypes.func,
  employeeInfoDetail: PropTypes.object,
  okTitle: PropTypes.string,
  editMode: PropTypes.bool,
};
AssignPipelineEmployee.defaultProps = {
  onSuccess: () => {},
  employeeInfoDetail: {},
  okTitle: 'ثبت و گام بعدی',
  editMode: false,
};

export default withStyles(s)(AssignPipelineEmployee);
