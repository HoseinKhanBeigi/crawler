import React, { useState, useMemo, useEffect } from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KianTable from '../../components/KianTable';
import withModal from '../../components/HOC/withModal';
import { PRODUCT_SETTING_TABLE } from '../../store/settings/settings.constants';
import { columns, searchData } from './tableData';
import {
  MODAL_FOR_PRODUCT_SETTING,
  DRAWER_FOR_PRODUCT_SETTING,
} from '../../components/ModalRoot/repository';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import productSettingServices from '../../service/productSettingService';
import { Actions } from '../../utils/aclActions';
import pipelineService from '../../service/pipelineServices';

const productSetting = props => {
  const [actions, setActions] = useState();
  const [pipelines, setPipelines] = useState();
  const [productId, setProductId] = useState('');
  const [pipelineId, setPipelineId] = useState('');
  const showMessageModal = ({ ...initialValues }) => () => {
    props.showModalAction({
      type: MODAL_FOR_PRODUCT_SETTING,
      props: {
        initialValues,
      },
    });
  };
  const showMessageDetailModal = ({ ...initialValues }) => () => {
    props.showModalAction({
      type: DRAWER_FOR_PRODUCT_SETTING,
      props: {
        initialValues,
      },
    });
  };

  const getActions = () => {
    if (productId && pipelineId) {
      pipelineService
        .getPipelineProductActions(productId, pipelineId)
        .then(res => {
          setActions(res.result);
        })
        .catch(err => err);
    }
  };

  const getProductPipeline = () => {
    if (productId) {
      pipelineService
        .getPipelines(productId)
        .then(res => setPipelines(res.result))
        .catch(err => err);
    }
  };

  useEffect(() => {
    getProductPipeline();
  }, [productId]);

  useEffect(() => {
    getActions();
  }, [pipelineId]);

  const actionTypes = useMemo(() => {
    if (actions) {
      return Object.values(actions).map(action => ({
        value: action?.id,
        text: action?.name,
      }));
    }
    return [];
  }, [actions]);

  const pipelineTypes = useMemo(() => {
    if (pipelines) {
      return Object.values(pipelines)?.map(pipeline => ({
        value: pipeline?.id.toString(),
        text: pipeline?.title,
      }));
    }
    return [];
  }, [pipelines]);

  const availableProducts = props.products?.map(({ title, id }) => ({
    text: title,
    value: id.toString(),
  }));

  const productOnChange = id => {
    const productCode = props.products.filter(
      product => product.id.toString() === id.toString(),
    )[0]?.code;
    setProductId(productCode);
  };

  const pipelineOnChange = id => {
    setPipelineId(id);
  };

  const rowAction = ({ id }, action) => async () => {
    const body = {
      id,
      action,
    };
    kianTableApi(PRODUCT_SETTING_TABLE).setLoading(true);
    productSettingServices
      .doActionOnProductSetting(body)
      .then(() => {
        kianTableApi(PRODUCT_SETTING_TABLE).refreshTable();
      })
      .catch(() => {
        kianTableApi(PRODUCT_SETTING_TABLE).refreshTable();
      });
  };
  const deleteRow = ({ id }) => async () => {
    productSettingServices
      .deleteProductSetting(id)
      .then(() => {
        kianTableApi(PRODUCT_SETTING_TABLE).refreshTable();
      })
      .catch(() => {
        kianTableApi(PRODUCT_SETTING_TABLE).refreshTable();
      });
  };
  const contextMenu = [
    {
      label: 'ویرایش',
      icon: 'edit',
      authority: Actions.productSettingsUpdate,
      action: row => showMessageModal(row)(),
    },
    {
      label: 'مشاهده',
      icon: 'edit',
      authority: Actions.productSettingsUpdate,
      action: row => showMessageDetailModal(row)(),
    },
    {
      label: 'فعال/غیرفعال',
      icon: 'redo',
      authority: Actions.productSettingActivate,
      action: row => {
        rowAction(row, !row.active)();
      },
    },
    {
      label: 'حذف',
      icon: 'delete',
      authority: Actions.productSettingsDelete,
      action: row => deleteRow(row, 'DELETE')(),
    },
  ];
  return (
    <Row>
      <Col span={24}>
        <KianTable
          endpoint="actionNotification"
          tableId={PRODUCT_SETTING_TABLE}
          rowKey="id"
          columns={columns}
          searchData={searchData({
            availableProducts,
            pipelineTypes,
            actionTypes,
            onSearchProducts: productOnChange,
            onSearchPipelines: pipelineOnChange,
          })}
          contextMenu={contextMenu}
          activityButton={[
            {
              label: 'پیکربندی جدید',
              authority: Actions.productSettingsCreate,
              action: showMessageModal({}),
              icon: 'plus-circle',
            },
          ]}
          withSort={false}
        />
      </Col>
    </Row>
  );
};

productSetting.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  products: state.getProducts.data,
});

export default withModal(connect(mapStateToProps)(productSetting));
