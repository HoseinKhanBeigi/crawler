import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Popconfirm, Tooltip } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './Tag.scss';
import tagService from '../../service/tagService';
import { LEADS_TABLE } from '../../store/settings/settings.constants';
import { kianTableApi } from '../KianTable/helpers/globalApi';
import { postUnTagAction } from '../../store/tag/tag.actions';

const Tag = props => {
  const {
    taggingClass,
    description,
    deletable,
    taggedId,
    tagId,
    color,
    name,
    type,
    leadId,
  } = props;
  const handleDeleteTag = async () => {
    try {
      const body = {
        tagIds: [tagId],
        taggedIds: [taggedId],
        taggingClass,
      };
      if (leadId) body.entityIds = [leadId];
      if (type) {
        await props.postUnTagAction(body, type);
      } else {
        await tagService.unTag([tagId], [taggedId], taggingClass);
      }
      kianTableApi(LEADS_TABLE).refreshTable();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Tooltip title={description}>
      <span
        style={{ backgroundColor: color }}
        className={s.tag}
        onClick={e => e.stopPropagation()}
        role="presentation"
      >
        {deletable && (
          <Popconfirm
            title="از حذف برچسب اطمینان دارید؟"
            okText="بله"
            onConfirm={handleDeleteTag}
          >
            <Icon type="close" />
          </Popconfirm>
        )}
        {name}
      </span>
    </Tooltip>
  );
};

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  taggingClass: PropTypes.string,
  description: PropTypes.string,
  taggedId: PropTypes.string,
  deletable: PropTypes.bool,
  color: PropTypes.string,
  tagId: PropTypes.number,
  type: PropTypes.string,
  leadId: PropTypes.string,
  postUnTagAction: PropTypes.func.isRequired,
};

Tag.defaultProps = {
  taggingClass: 'LEAD',
  description: null,
  deletable: true,
  taggedId: null,
  color: '#000',
  tagId: null,
  type: null,
  leadId: null,
};
const mapDispatch = {
  postUnTagAction,
};

const mapState = () => ({});

export default connect(mapState, mapDispatch)(withStyles(s)(Tag));
