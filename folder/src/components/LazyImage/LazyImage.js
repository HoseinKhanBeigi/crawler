/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus,jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import saveAs from 'file-saver';
import { Icon } from 'antd';
import s from './LazyImage.scss';
import {
  getDocAction,
  getFileTokenAction,
} from '../../store/docDownload/docDownload.actions';
import ImageTools from '../ImageTools';
import CPTooltip from '../CP/CPTooltip';

class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
      objectURL: null,
      pdfObjectUrl: null,
    };
  }

  componentDidMount() {
    this.getImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.getImage();
    }
  }

  getImage = async () => {
    try {
      const { getTokenBefore, path, objectToken } = this.props;
      let token = null;
      if (getTokenBefore) {
        const pathBodyObj = {
          names: [path],
        };
        token = await this.props.getFileTokenAction(pathBodyObj);
      }

      if ((objectToken || getTokenBefore) && path) {
        const blob = await this.props.getDocAction({
          path,
          objectToken: token?.resp?.token || objectToken?.token,
        });
        const objectURL = await URL.createObjectURL(blob);
        this.setState({ pdfObjectUrl: blob });
        if (objectURL) {
          const img = new Image();
          img.onload = () => {
            this.setState({
              loaded: true,
              objectURL,
            });
          };
          img.onerror = () => {
            this.setState({
              error: true,
            });
          };
          img.src = objectURL;
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  handelDownload = () => {
    const { objectURL } = this.state;
    const { path } = this.props;
    const slashIndex = path.lastIndexOf('/');
    const originalName = path.slice(slashIndex);

    if (objectURL) {
      saveAs(objectURL, `${originalName}`);
    }
  };

  sendImagePath = () => {};

  handelDownloadPdf = () => {
    const { pdfObjectUrl } = this.state;
    const { path } = this.props;
    const slashIndex = path.lastIndexOf('/');
    const originalName = path.slice(slashIndex);
    saveAs(pdfObjectUrl, originalName);
  };
  renderImg = () => {
    const { download, ref, className, hasZoom, path } = this.props;
    const { error, loaded, objectURL } = this.state;
    if (error || !path) {
      return (
        <div className={s.noData}>
          <CPTooltip title="دانلود این فایل">
            <Icon
              style={{ padding: '10px', fontSize: '18px', color: '#1890ff' }}
              type="download"
              onClick={this.handelDownloadPdf}
            />
          </CPTooltip>
          {/* <Icon type="warning" /> */}
        </div>
      );
    } else if (!loaded) {
      return (
        <div className={s.noData}>
          <Icon type="loading" />
        </div>
      );
    }

    return hasZoom ? (
      <ImageTools>
        <img
          className={cs(s.downloadable, className)}
          src={objectURL}
          alt={objectURL}
          ref={ref}
          {...(download
            ? { onClick: this.handelDownload }
            : {
                onClick: () => {
                  this.props.onClick(objectURL);
                },
              })}
        />
      </ImageTools>
    ) : (
      <img
        className={cs(s.downloadable, className)}
        src={objectURL}
        alt={objectURL}
        ref={ref}
        {...(download
          ? { onClick: this.handelDownload }
          : {
              onClick: () => {
                this.props.onClick(objectURL);
              },
            })}
      />
    );
  };

  render() {
    const { objectToken, getTokenBefore } = this.props;
    if (!objectToken && !getTokenBefore) {
      return <span> نمایش این فایل پشتیبانی نمی‌شود!</span>;
    }

    return this.renderImg();
  }
}

LazyImage.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string, // file address like: image.jpg
  objectToken: PropTypes.object,
  getDocAction: PropTypes.func.isRequired,
  getFileTokenAction: PropTypes.func.isRequired,
  onClick: PropTypes.func, // get file objectURL on image click
  download: PropTypes.bool, // if true: file will save on image click
  ref: PropTypes.func,
  hasZoom: PropTypes.bool,
  getTokenBefore: PropTypes.bool,
};

LazyImage.defaultProps = {
  className: '',
  objectToken: null,
  path: null,
  onClick: () => {},
  download: false,
  ref: () => {},
  hasZoom: false,
  getTokenBefore: false,
};

const mapState = () => ({});

const mapDispatch = {
  getDocAction,
  getFileTokenAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(LazyImage));
export const LazyImageTest = LazyImage;
