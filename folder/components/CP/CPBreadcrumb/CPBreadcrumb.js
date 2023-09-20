import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Breadcrumb } from 'antd';
import s from './CPBreadcrumb.scss';
import Link from '../../Link/Link';
import history from '../../../history';

function CPBreadcrumb(props) {
  function goToUrl(e, url) {
    e.preventDefault();
    if (url) history.push(url);
  }

  const { links, params, routes, itemRender, separator } = props;
  return (
    <Breadcrumb
      itemRender={itemRender}
      params={params}
      routes={routes}
      separator={separator}
    >
      {links.map(item => (
        <Breadcrumb.Item key={`${item.url}`}>
          {item.url ? (
            <Link to="/" onClick={e => goToUrl(e, item.url)}>
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

CPBreadcrumb.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
  itemRender: PropTypes.node,
  params: PropTypes.object,
  routes: PropTypes.arrayOf(PropTypes.object),
  separator: PropTypes.string,
};

CPBreadcrumb.defaultProps = {
  itemRender: '',
  separator: '/',
  params: null,
  routes: [],
  links: [{ title: 'صفحه نخست', url: '/' }],
};

export default withStyles(s)(CPBreadcrumb);
