import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Tooltip } from 'antd';
import CPTag from '../../CP/CPTag';
import { postUnTagAction } from '../../../store/tag/tag.actions';

const RenderTagInfo = props => {
  const { tags, levantId, profileType } = props;
  let tagsCount = tags?.length;

  function calculateTagsCount(count) {
    if (count > 0) {
      return count - 1;
    }
    return count;
  }

  async function unTag(tagId) {
    // for some of resaon i have to convert PERSON To PEPOEL
    const profileTypeConverted =
      profileType === 'PERSON' ? 'PEOPLE' : profileType;
    // isn't matter what you passed id's value
    const body = {
      id: tagId,
      taggedIds: [levantId],
      tagIds: [tagId],
      taggingClass: profileTypeConverted,
    };
    const response = await props.postUnTagAction(body);
    if (response?.err) {
      return false;
    }
    props.onCloseTag();
    tagsCount = calculateTagsCount(tagsCount);
    if (tagsCount <= 0) {
      props.displayHandler();
    }
    return true;
  }

  return (
    <>
      <Row type="flex" gutter={[8, 8]}>
        {tags.map(tag => (
          <Col key={tag.id}>
            <Tooltip title={tag.description}>
              <CPTag
                color={tag.color}
                closable
                onClose={() => {
                  unTag(tag.id);
                }}
              >
                {tag.name}
              </CPTag>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </>
  );
};
RenderTagInfo.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
  levantId: PropTypes.string,
  profileType: PropTypes.string,
  postUnTagAction: PropTypes.func.isRequired,
  displayHandler: PropTypes.func,
  onCloseTag: PropTypes.func.isRequired,
};
RenderTagInfo.defaultProps = {
  tags: null,
  levantId: null,
  profileType: null,
  displayHandler: null,
};

const mapStateToProps = () => ({});

const mapDispatch = {
  postUnTagAction,
};

export default connect(mapStateToProps, mapDispatch)(RenderTagInfo);
