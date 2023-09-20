import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Tag, Tooltip } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DrawerForGroupTagging.scss';
import CPDivider from '../../../CP/CPDivider';
import {
  getTagsAction,
  postTaggingAction,
  getUserTagsListAction,
} from '../../../../store/tag/tag.actions';
import { DRAWER_FOR_GROUP_TAGGING } from '../../repository';
import KianDrawer from '../../../KianDrawer/KianDrawer';

const DrawerForGroupTagging = props => {
  const {
    taggedIds,
    taggingClass,
    deSelectRows,
    tags,
    name,
    ids: leadIds,
    type: leadType,
  } = props;
  const [visible, setVisible] = useState(true);
  const [selectedTag, setSelectedTag] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.getTagsAction();
  }, []);

  const closeModal = () => {
    setVisible(false);
  };

  const pushTag = tag => {
    const old = [...selectedTag, tag];
    setSelectedTag(old);
  };

  const handlePopTag = tag => {
    const old = [...selectedTag];
    const newList = old.filter(item => item.id !== tag.id);
    setSelectedTag(newList);
  };

  const handleSubmit = async () => {
    // setLoading(true);
    try {
      const body = {
        tagIds: selectedTag.map(item => item.id),
        taggedIds,
        taggingClass,
      };
      if (leadIds?.length > 0) body.entityIds = leadIds;
      await props.postTaggingAction(body, leadType);
      deSelectRows();
      closeModal();
      const levantId = taggedIds[0];
      props.getUserTagsListAction(levantId);
    } catch {
      // ...
    }

    // setLoading(false);
  };

  return (
    <KianDrawer
      title={
        name
          ? `برچسب زدن به ${name}`
          : `برچسب زدن به ${taggedIds.length} فرد انتخابی`
      }
      visible={visible}
      onClose={closeModal}
      onCancel={closeModal}
      drawerId={DRAWER_FOR_GROUP_TAGGING}
      onOk={handleSubmit}
      okText="اعمال برچسب"
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
    </KianDrawer>
  );
};

DrawerForGroupTagging.propTypes = {
  taggedIds: PropTypes.array.isRequired,
  tags: PropTypes.array,
  taggingClass: PropTypes.string.isRequired,
  deSelectRows: PropTypes.func,
  postTaggingAction: PropTypes.func.isRequired,
  getUserTagsListAction: PropTypes.func.isRequired,
  getTagsAction: PropTypes.func.isRequired,
  name: PropTypes.string,
  ids: PropTypes.string,
  type: PropTypes.string,
};

DrawerForGroupTagging.defaultProps = {
  tags: [],
  deSelectRows: () => {},
  name: '',
  ids: null,
  type: null,
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
)(withStyles(s)(memo(DrawerForGroupTagging)));
