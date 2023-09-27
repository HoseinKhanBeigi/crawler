import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Tag, Tooltip } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { DRAWER_FOR_TASK_TAGGING } from '../../repository';
import CPDivider from '../../../CP/CPDivider';
import {
  getTagsAction,
  getTaskTagsListAction,
  postTaggingAction,
  postUnTagAction,
} from '../../../../store/tag/tag.actions';
import s from './DrawerForTaskTagging.scss';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import { TASK_MANAGEMENT_TABLE } from '../../../../store/settings/settings.constants';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';

const DrawerForTaskTagging = props => {
  const { data, taskTags, tags } = props;
  const [visible, setVisible] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    props.getTaskTagsListAction(data.id);
    props.getTagsAction();
  }, []);

  useEffect(() => {
    if (taskTags) {
      setSelectedTags([...taskTags]);
    }
  }, [taskTags]);

  const closeDrawer = () => {
    setSelectedTags([]);
    setVisible(false);
    kianTableApi(TASK_MANAGEMENT_TABLE).refreshTable();
  };

  const pushTag = async tag => {
    const newTagList = [...selectedTags, tag];
    const body = {
      tagIds: [tag.id],
      taggedIds: [data.id],
      taggingClass: 'TASK',
    };
    await props.postTaggingAction(body, '');
    setSelectedTags(newTagList);
    props.getTaskTagsListAction(data.id);
  };

  const handlePopTag = async tag => {
    const old = [...selectedTags];
    const newList = old.filter(item => item.id !== tag.id);
    const body = {
      tagIds: [tag.id],
      taggedIds: [data.id],
      taggingClass: 'TASK',
    };
    await props.postUnTagAction(body, '');
    setSelectedTags(newList);
    props.getTaskTagsListAction(data.id);
  };
  const allTagsRendered = useMemo(() => {
    if (selectedTags) {
      return tags
        .filter(
          tag =>
            !selectedTags.find(selectedTag => selectedTag.name === tag.name),
        )
        .map(tag => (
          <Col key={tag.id}>
            <Tooltip title={tag.description}>
              <Tag color={tag.color} onClick={() => pushTag(tag)}>
                {tag.name}
              </Tag>
            </Tooltip>
          </Col>
        ));
    }
    return tags.map(tag => (
      <Col key={tag.id}>
        <Tooltip title={tag.description}>
          <Tag color={tag.color} onClick={() => pushTag(tag)}>
            {tag.name}
          </Tag>
        </Tooltip>
      </Col>
    ));
  }, [selectedTags, tags]);

  const taskTagsRendered = useMemo(() => {
    if (selectedTags) {
      return (
        <Col>
          برچسب های {data.title}
          <Row gutter={[8, 8]} type="flex">
            {selectedTags?.map(tag => (
              <Row key={tag.id}>
                <Tooltip title={tag.description}>
                  <Tag
                    closable
                    color={tag.color}
                    onClose={() => handlePopTag(tag)}
                  >
                    {tag.name}
                  </Tag>
                </Tooltip>
              </Row>
            ))}
          </Row>
        </Col>
      );
    }
    return <Col>لطفا یک برچسب انتخاب نمایید</Col>;
  }, [selectedTags, handlePopTag]);

  return (
    <KianDrawer
      title={`برچسب زدن به ${data.title}`}
      visible={visible}
      onClose={closeDrawer}
      drawerId={DRAWER_FOR_TASK_TAGGING}
      okText="اعمال برچسب"
    >
      <Row gutter={[8, 8]} type="flex" className={s.selectTagMessage}>
        {taskTagsRendered}
      </Row>
      <CPDivider dashed />
      <Row gutter={[8, 8]} type="flex">
        {allTagsRendered}
      </Row>
    </KianDrawer>
  );
};

DrawerForTaskTagging.defaultProps = {
  tags: [],
};

DrawerForTaskTagging.propTypes = {
  tags: PropTypes.array,
  getTagsAction: PropTypes.func.isRequired,
  postTaggingAction: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  taskTags: PropTypes.array.isRequired,
  getTaskTagsListAction: PropTypes.func.isRequired,
  postUnTagAction: PropTypes.func.isRequired,
};

const mapState = state => ({
  taskTags: state?.tag?.taskTagsList,
  tags: state?.tag?.data?.content,
});
const mapDispatch = {
  getTaskTagsListAction,
  postUnTagAction,
  getTagsAction,
  postTaggingAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(DrawerForTaskTagging));
