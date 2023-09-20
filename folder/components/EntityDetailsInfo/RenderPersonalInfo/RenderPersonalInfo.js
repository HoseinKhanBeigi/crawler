import React, { memo } from 'react';
import { Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RenderPersonalInfo.scss';
import CPTooltip from '../../CP/CPTooltip';

const RenderPersonalInfo = props => {
  const { data } = props;
  if (data) {
    return data?.map(
      items =>
        items.content && (
          <span key={items.label} className={s.info}>
            <b>{items.label}</b>
            <p>{items.content}</p>
            {items.action && (
              <CPTooltip title={items.action.toolTip}>
                <Icon
                  className={s.cursor}
                  theme="twoTone"
                  type="phone"
                  onClick={() => items.action.method()}
                />
              </CPTooltip>
            )}
          </span>
        ),
    );
  }

  return null;
};

export default withStyles(s)(memo(RenderPersonalInfo));
