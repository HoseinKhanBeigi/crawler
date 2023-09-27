import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Tag } from 'antd';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_BULK_UNTAG } from '../../repository';
import { postUnTagAction } from '../../../../store/tag/tag.actions';

const { CheckableTag } = Tag;

const ModalForBulkUnTag = props => {
  const {
    tagged,
    deSelectRows,
    taggingClass,
    ids: leadIds,
    type: leadType,
  } = props;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [validTags, setValidTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const closeModal = () => {
    setVisible(false);
  };

  const makeValidTagsForUnTagging = () => {
    setValidTags(tagged.filter(t => t.tags).map(t => t.tags));
  };

  const handleSelectTag = (status, tag) => {
    let tags = [...selectedTags];
    if (status) {
      tags.push(tag.id);
    } else {
      tags = selectedTags.filter(t => t !== tag.id);
    }
    setSelectedTags(tags);
  };

  const renderValidTags = () => {
    const flatTagsArray = validTags.flat(Infinity);
    const uniqueTags = {};

    flatTagsArray.forEach(t => {
      uniqueTags[t.id] = t;
    });

    return Object.values(uniqueTags).map(t => (
      <CheckableTag
        key={t.id}
        checked={selectedTags.includes(t.id)}
        onChange={status => handleSelectTag(status, t)}
      >
        {t.name}
      </CheckableTag>
    ));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const taggedLevantIds = tagged.map(t => t.levantId);
    try {
      const body = {
        tagIds: selectedTags,
        taggedIds: taggedLevantIds,
        taggingClass,
      };
      if (leadIds?.length > 0) body.entityIds = leadIds;
      await props.postUnTagAction(body, leadType);
      deSelectRows();
      closeModal();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(makeValidTagsForUnTagging, []);
  return (
    <CPModal
      title={`حذف برچسب از ${tagged.length} سرنخ انتخابی`}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_BULK_UNTAG}
      okText="حذف برچسب"
      confirmLoading={loading}
      okButtonProps={{
        disabled: !validTags.length || !selectedTags.length,
      }}
      onOk={handleSubmit}
    >
      {validTags.length ? (
        <div>
          <h4>
            برچسب‌هایی که قصد حذف آن از سرنخ‌های انتخابی دارید، انتخاب نمایید:
          </h4>
          <div style={{ marginTop: 30 }}>{renderValidTags()}</div>
        </div>
      ) : (
        <Alert
          type="error"
          showIcon
          description="لیست انتخابی شما دارای هیچ برچسبی نمی‌باشد!"
          message="خطا"
        />
      )}
    </CPModal>
  );
};

ModalForBulkUnTag.propTypes = {
  tagged: PropTypes.array.isRequired,
  deSelectRows: PropTypes.func.isRequired,
  taggingClass: PropTypes.string.isRequired,
  postUnTagAction: PropTypes.func.isRequired,
  ids: PropTypes.string,
  type: PropTypes.string,
};

ModalForBulkUnTag.defaultProps = {
  ids: null,
  type: null,
};
const mapStateToProps = () => {};

const mapDispatch = {
  postUnTagAction,
};

export default connect(mapStateToProps, mapDispatch)(ModalForBulkUnTag);
