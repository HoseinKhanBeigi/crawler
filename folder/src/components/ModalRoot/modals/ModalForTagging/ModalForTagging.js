import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Tag, Tooltip } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForTagging.scss';
import CPModal from '../../../CP/CPModal';
import CPDivider from '../../../CP/CPDivider';
import {
  getTagsAction,
  postTaggingAction,
  getUserTagsListAction,
} from '../../../../store/tag/tag.actions';
import { MODAL_FOR_TAGGING } from '../../repository';

const ModalForTagging = props => {
  const { taggedIds, taggingClass, deSelectRows, tags, name } = props;
  const [visible, setVisible] = useState(true);
  const [selectedTag, setSelectedTag] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.getTagsAction();
  }, []);

  function closeModal() {
    setVisible(false);
  }

  const pushTag = tag => {
    const old = [...selectedTag, tag];
    setSelectedTag(old);
  };

  const handlePopTag = tag => {
    const old = [...selectedTag];
    const newList = old.filter(item => item.id !== tag.id);
    setSelectedTag(newList);
  };

  async function handleSubmit() {
    setLoading(true);
    const result = await props.postTaggingAction({
      tagIds: selectedTag.map(item => item.id),
      taggedIds,
      taggingClass,
    });
    setLoading(false);

    if (result.ok) {
      deSelectRows();
      closeModal();
      const levantId = taggedIds[0];
      props.getUserTagsListAction(levantId);
    }
  }

  return (
    <CPModal
      title={
        name
          ? `برچسب زدن به ${name}`
          : `برچسب زدن به ${taggedIds.length} فرد انتخابی`
      }
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_TAGGING}
      onOk={handleSubmit}
      okButtonProps={{ disabled: !selectedTag }}
      confirmLoading={loading}
    >
      <Row gutter={[8, 8]} type="flex" className={s.selectTagMessage}>
        {selectedTag.length ? (
          <Col>
            الصاق برچسب
            {selectedTag?.map(item => (
              <Tag
                closable
                color={item.color}
                onClose={() => handlePopTag(item)}
              >
                {item.name}
              </Tag>
            ))}
            به {name || `${taggedIds.length} فرد انتخابی`}
          </Col>
        ) : (
          <Col>لطفا یک برچسب انتخاب نمایید</Col>
        )}
      </Row>
      <CPDivider dashed />
      <Row gutter={[8, 8]} type="flex">
        {tags.map(tag => (
          <Col key={tag.id}>
            <Tooltip title={tag.description}>
              <Tag color={tag.color} onClick={() => pushTag(tag)}>
                {tag.name}
              </Tag>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </CPModal>
  );
};

ModalForTagging.propTypes = {
  taggedIds: PropTypes.array.isRequired,
  tags: PropTypes.array,
  taggingClass: PropTypes.string.isRequired,
  deSelectRows: PropTypes.func,
  postTaggingAction: PropTypes.func.isRequired,
  getUserTagsListAction: PropTypes.func.isRequired,
  getTagsAction: PropTypes.func.isRequired,
  name: PropTypes.string,
};

ModalForTagging.defaultProps = {
  tags: [],
  deSelectRows: () => {},
  name: '',
};

const mapStateToProps = ({ tag }) => ({
  isTagging: tag.postTagsLoading,
  tags: tag?.data?.content,
});

const mapDispatch = {
  postTaggingAction,
  getTagsAction,
  getUserTagsListAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(memo(ModalForTagging)));
