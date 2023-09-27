import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ItemsWithPopUp.scss';

const ItemsWithPopUp = ({ items, showCount }) => {
  const { length } = items;
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      {items?.slice(0, showCount)?.map(item => (
        <Tag key={item?.id} className={s.eachItem}>
          {item?.title}
        </Tag>
      ))}
      {length > showCount && (
        <span
          onMouseEnter={() => length > showCount && setShowPopup(true)}
          onMouseLeave={() => setTimeout(() => setShowPopup(false), 300)}
          className={s.counter}
        >
          {length - showCount}+
        </span>
      )}
      {showPopup && (
        <span className={s.popupContainer}>
          <span className={s.popup}>
            {items?.slice(showCount, length)?.map(item => (
              <span key={item?.id}>{item?.title}</span>
            ))}
          </span>
        </span>
      )}
    </>
  );
};

ItemsWithPopUp.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  showCount: PropTypes.number,
};

ItemsWithPopUp.defaultProps = {
  items: [],
  showCount: 3,
};

export default withStyles(s)(memo(ItemsWithPopUp));
