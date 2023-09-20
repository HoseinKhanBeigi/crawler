import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Popover, Tooltip } from 'antd';
import Tag from '../../Tag';

const Tags = ({ data, user }) => {
  // eslint-disable-next-line no-unused-vars
  const {
    tags,
    levantId,
    firstName,
    lastName,
    permission = null,
    type = null,
    leadId = null,
  } = data;
  const title = () => {
    if (firstName || lastName)
      return `برچسب‌های ${firstName || ''} ${lastName || ''}`;

    return 'برچسب‌ها';
  };
  const statusIsNotAccess = () => {
    if (
      permission &&
      user?.levantId &&
      permission === 'MINE' &&
      user?.levantId !== data?.aclLevantId?.toString()
    ) {
      return true;
    }
    return false;
  };
  const tagsContent = () =>
    tags.map(t => (
      <Tag
        taggedId={levantId}
        leadId={leadId}
        color={t.color}
        name={t.name}
        tagId={t.id}
        key={t.id}
        type={type}
        deletable={!statusIsNotAccess()}
      />
    ));

  return tags ? (
    <Popover content={tagsContent()} title={title()}>
      <Icon type={tags.length > 1 ? 'tags' : 'tag'} />
    </Popover>
  ) : (
    <Tooltip title="بدون برچسب">
      <Icon type="tag" style={{ color: '#b1b1b1' }} />
    </Tooltip>
  );
};

Tags.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object,
};

Tags.defaultProps = {
  data: null,
  user: null,
};
const mapDispatch = {};

const mapState = ({ user }) => ({
  user: user?.currentUserInfoEmployee,
});

export default connect(mapState, mapDispatch)(Tags);
