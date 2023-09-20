import React, { useState } from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';
import CPTooltip from '../CP/CPTooltip';

const MoreList = props => {
  const { list, index, renderContent } = props;
  const [showRemain, setShowRemain] = useState(false);

  const handleRemain = () => {
    const newList = list.slice(2, list?.length);
    return newList?.map((item, i) => (
      <span>
        {renderContent(item)}
        {i === newList.length - 1 ? '' : ' , '}
      </span>
    ));
  };

  const handleShowRemain = () => setShowRemain(true);
  return index === list.length - 1 ? (
    <>
      {!showRemain && (
        <span>
          <span style={{ marginLeft: '8px' }}>...</span>
          <CPTooltip title={handleRemain()}>
            <Tag
              color="#f9f9f9"
              style={{
                color: '#6e6e6e',
                border: '1px solid #d9d9d9',
                cursor: 'pointer',
              }}
            >
              {`${list.length - 2}+`}
            </Tag>
          </CPTooltip>
        </span>
      )}
      {showRemain &&
        list.slice(2, list?.length)?.map(item => (
          <Tag
            color="#f9f9f9"
            onClick={handleShowRemain}
            style={{
              color: '#6e6e6e',
              border: '1px solid #d9d9d9',
            }}
          >
            {renderContent(item)}
          </Tag>
        ))}
    </>
  ) : (
    ''
  );
};
MoreList.propTypes = {
  list: PropTypes.array,
  index: PropTypes.number,
  renderContent: PropTypes.func.isRequired,
};
MoreList.defaultProps = {
  list: [],
  index: null,
};
export default MoreList;
