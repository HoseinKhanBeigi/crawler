import React from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import { Tag } from 'antd';
import PropTypes from 'prop-types';
import s from './RenderDetailRow.scss';

function RenderDetailRow({ title, data, type, titleMaxWidth, tagColor }) {
  const renderData = () => {
    if (!data) {
      return '---';
    }
    switch (type) {
      case 'tag':
        return Array.isArray(data) ? (
          <div className={s.tags}>
            {data.map(d => (
              <Tag style={{ margin: 0 }} color={tagColor}>
                {d || '---'}
              </Tag>
            ))}
          </div>
        ) : (
          <Tag style={{ margin: 0 }} color={tagColor}>
            {data || '---'}
          </Tag>
        );
      case 'node':
        return data;
      case 'string':
      default:
        return <p className={s.paragraph}>{data || '---'}</p>;
    }
  };
  return (
    <div className={s.row}>
      <p className={s.title} style={{ maxWidth: titleMaxWidth }}>
        {title}
      </p>
      {renderData()}
    </div>
  );
}

RenderDetailRow.defaultProps = {
  type: 'string',
  titleMaxWidth: 180,
  tagColor: undefined,
};

RenderDetailRow.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  type: PropTypes.oneOf(['tag', 'string', 'node']),
  titleMaxWidth: PropTypes.number,
  tagColor: PropTypes.string,
};
export default withStyle(s)(RenderDetailRow);
