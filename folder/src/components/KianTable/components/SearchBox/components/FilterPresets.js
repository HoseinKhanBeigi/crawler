import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Icon, Row } from 'antd';
import CPSelect from '../../../../CP/CPSelect';
import {
  deleteFilterPresetAction,
  getSearchListAction,
} from '../../../../../store/search/search.actions';
import CPButton from '../../../../CP/CPButton';
import withModal from '../../../../HOC/withModal';
import { MODAL_FOR_FILTER_PRESETS } from '../../../../ModalRoot/repository';

const FilterPresets = props => {
  const {
    filterType,
    filterPresets,
    isDeleting,
    handleFilterPresetChange,
    filterObject,
    showModalAction,
  } = props;

  useEffect(() => {
    props.getSearchListAction(filterType);
  }, []);

  const deleteFilterPreset = id => async e => {
    e.stopPropagation();
    await props.deleteFilterPresetAction(id);
    props.getSearchListAction(filterType);
  };

  const renderFilterPresets = () =>
    filterPresets?.map(item => ({
      key: item.id,
      value: item.id,
      text: (
        <span className="select-option-with-delete-icon">
          <Icon
            type={isDeleting ? 'loading' : 'close'}
            onClick={deleteFilterPreset(item.id)}
          />
          {item.title}
        </span>
      ),
    }));

  const showFilterPresetModal = () => {
    showModalAction({
      type: MODAL_FOR_FILTER_PRESETS,
      props: {
        filterObject,
        filterType,
      },
    });
  };

  return (
    <Col span={20}>
      <Row gutter={[8, 8]} type="flex">
        <Col span={18}>
          <small>جستجوهای ذخیره شده</small>
          <CPSelect
            dataSource={renderFilterPresets()}
            onChange={handleFilterPresetChange(filterPresets)}
          />
        </Col>
        <Col span={6}>
          <CPButton
            style={{ marginTop: '25px' }}
            icon="save"
            type="dashed"
            onClick={showFilterPresetModal}
            block
          />
        </Col>
      </Row>
    </Col>
  );
};

FilterPresets.propTypes = {
  filterType: PropTypes.string.isRequired,
  filterPresets: PropTypes.array.isRequired,
  getSearchListAction: PropTypes.func.isRequired,
  deleteFilterPresetAction: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  handleFilterPresetChange: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
  filterObject: PropTypes.object.isRequired,
};

const mapState = state => ({
  filterPresets: state.search.getSearchListData,
  isDeleting: state.search.isDeleting,
});

const mapDispatch = {
  getSearchListAction,
  deleteFilterPresetAction,
};

export default connect(mapState, mapDispatch)(withModal(FilterPresets));
