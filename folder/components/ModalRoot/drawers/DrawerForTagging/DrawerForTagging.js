import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { DRAWER_FOR_TAGGING } from '../../repository';
import {
  getTagsAction,
  getUserTagsListAction,
  postTaggingAction,
  postUnTagAction,
} from '../../../../store/tag/tag.actions';
import CPMessage from '../../../CP/CPMessage';
import CPLoading from '../../../CP/CPLoading';
import CPButton from '../../../CP/CPButton';
import s from './DrawerForTagging.scss';
import KianDrawer from '../../../KianDrawer/KianDrawer';

const { CheckableTag } = Tag;

const DrawerForTagging = props => {
  const { levantId, userTagsList, profileType, tags } = props;
  const [visible, setVisible] = useState(true);
  const [untagLoading, setUntagLoading] = useState(false);
  const [taggedLoading, setTaggedLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    props.getUserTagsListAction(levantId);
    props.getTagsAction();
  }, []);

  const closeDrawer = () => {
    setSelectedTags([]);
    setVisible(false);
  };

  const handleUntag = async id => {
    setUntagLoading(true);
    const profileTypeConverted =
      profileType === 'PERSON' ? 'PEOPLE' : profileType;
    // isn't matter what you passed id's value
    const body = {
      id,
      taggedIds: [levantId],
      tagIds: [id],
      taggingClass: profileTypeConverted,
    };
    const response = await props.postUnTagAction(body);
    if (!response?.err) {
      CPMessage('برچسب انتخابی با موفقیت حذف شد.', 'success');
      await props.getUserTagsListAction(levantId);
      setUntagLoading(false);
    } else {
      CPMessage('خطا در حذف برچسب انتخابی!', 'error');
      await props.getUserTagsListAction(levantId);
      setUntagLoading(false);
    }
  };

  const handleCheckTag = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  const handleSubmitTag = async () => {
    setTaggedLoading(true);
    const profileTypeConverted =
      profileType === 'PERSON' ? 'PEOPLE' : profileType;
    const body = {
      tagIds: selectedTags.map(i => i.id),
      taggedIds: [levantId],
      taggingClass: profileTypeConverted,
    };
    const result = await props.postTaggingAction(body);
    setTaggedLoading(false);
    setSelectedTags([]);
    if (result.ok) {
      props.getUserTagsListAction(levantId);
    }
  };

  return (
    <KianDrawer
      title="برچسب زدن"
      drawerId={DRAWER_FOR_TAGGING}
      visible={visible}
      onClose={closeDrawer}
    >
      <div style={{ paddingBottom: '24px' }}>
        <h3 style={{ paddingBottom: '10px' }}>برچسب های انتخاب شده</h3>
        <CPLoading tip="به روزرسانی لیست برچسب‌ها..." spinning={untagLoading}>
          {userTagsList?.length ? (
            userTagsList?.map(item => (
              <Tag
                style={{ marginBottom: '5px' }}
                color={item?.color}
                key={item.id}
                closable
                onClose={() => handleUntag(item.id)}
              >
                {item?.name}
              </Tag>
            ))
          ) : (
            <p className={s.empty}>برچسبی برای نمایش وجود ندارد.</p>
          )}
        </CPLoading>
      </div>
      <div>
        <h3 style={{ paddingBottom: '16px' }}>برچسب ها</h3>
        {tags?.length ? (
          tags?.map(item => (
            <CheckableTag
              style={{
                marginBottom: '10px',
                border: `1px solid #1890ff`,
                padding: '3px 12px 4px',
                borderRadius: '16px',
                fontSize: '14px',
              }}
              onChange={checked => handleCheckTag(item, checked)}
              checked={selectedTags.indexOf(item) > -1}
              key={item.id}
            >
              {item?.name}
            </CheckableTag>
          ))
        ) : (
          <p className={s.empty}>برچسبی برای نمایش وجود ندارد.</p>
        )}
        <div className={s.footer}>
          <CPButton style={{ marginLeft: '8px' }} onClick={closeDrawer}>
            لغو
          </CPButton>
          <CPButton
            type="primary"
            onClick={handleSubmitTag}
            loading={taggedLoading}
          >
            تایید
          </CPButton>
        </div>
      </div>
    </KianDrawer>
  );
};
DrawerForTagging.defaultProps = {
  levantId: '',
  profileType: '',
  userTagsList: [],
  tags: [],
};
DrawerForTagging.propTypes = {
  levantId: PropTypes.string,
  tags: PropTypes.array,
  getUserTagsListAction: PropTypes.func.isRequired,
  getTagsAction: PropTypes.func.isRequired,
  postTaggingAction: PropTypes.func.isRequired,
  postUnTagAction: PropTypes.func.isRequired,
  userTagsList: PropTypes.array,
  profileType: PropTypes.string,
};

const mapState = state => ({
  levantId: state.lead.data.levantId,
  profileType: state.lead.data.profileType,
  userTagsList: state.tag.userTagsList,
  tags: state?.tag?.data?.content,
});
const mapDispatch = {
  getUserTagsListAction,
  postUnTagAction,
  getTagsAction,
  postTaggingAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(DrawerForTagging));
