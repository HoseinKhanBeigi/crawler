import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './LeadTagsListTab.scss';
import CPTooltip from '../CP/CPTooltip';
import CPLoading from '../CP/CPLoading';
import CPEmpty from '../CP/CPEmpty';

const LeadTagsListTab = props => {
  const { userTagsList } = props;

  return (
    <>
      <div className={s.container}>
        <CPLoading
          tip="در حال دریافت لیست برچسب‌ها"
          spinning={userTagsList === null}
        >
          {userTagsList?.length ? (
            userTagsList?.map(item => (
              <div
                className={s.item}
                key={item.id}
                style={{ backgroundColor: item.color }}
              >
                <CPTooltip title={item.name}>{item.name}</CPTooltip>
              </div>
            ))
          ) : (
            <CPEmpty description="برچسبی برای نمایش وجود ندارد" />
          )}
        </CPLoading>
      </div>
    </>
  );
};
LeadTagsListTab.propTypes = {
  userTagsList: PropTypes.object,
};

LeadTagsListTab.defaultProps = {
  userTagsList: null,
};

const mapStateToProps = state => ({
  userTagsList: state.tag.userTagsList,
});

export default connect(mapStateToProps, null)(withStyles(s)(LeadTagsListTab));
