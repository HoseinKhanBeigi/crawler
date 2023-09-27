import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './LeadProductsProfileTab.scss';
import CPEmpty from '../CP/CPEmpty';

const LeadProductsProfileTab = props => {
  const { productList } = props;

  const renderItem = () => (
    <div className={s.section}>
      <div className={s.section__list}>
        {productList?.map(p => (
          <span key={p?.id} ellipsis className={s.chipe_tag}>
            {p?.title || '---'}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className={s.container}>
        {productList?.length ? (
          renderItem()
        ) : (
          <CPEmpty description="محصولی برای نمایش وجود ندارد" />
        )}
      </div>
    </>
  );
};

LeadProductsProfileTab.propTypes = {
  productList: PropTypes.array,
};
LeadProductsProfileTab.defaultProps = {
  productList: [],
};

const mapStateToProps = state => ({
  productList: state?.lead?.data?.productList,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(s)(LeadProductsProfileTab));
