import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './LazyFile.scss';
import glusterService from '../../service/glusterService';

class LazyFile extends React.Component {
  handelDownload = () => {
    const { path, token } = this.props;
    glusterService.downloadFile(path, token);
  };

  render() {
    const { className, icon } = this.props;

    return (
      <Button
        type="link"
        className={cs(s.lazyFile, className)}
        onClick={this.handelDownload}
        icon={icon}
      />
    );
  }
}

LazyFile.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  path: PropTypes.string,
  token: PropTypes.string,
};

LazyFile.defaultProps = {
  className: null,
  icon: null,
  path: null,
  token: null,
};

export default withStyles(s)(LazyFile);
export const LazyFileTest = LazyFile;
