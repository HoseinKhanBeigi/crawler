import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';
import saveAs from 'file-saver';
import { connect } from 'react-redux';
import ReactToPrint from 'react-to-print';
import cs from 'classnames';
import s from './PreviewImage.scss';
import { getCrmActivitiesAction } from '../../store/newActivities/newActivities.actions';
import { postPrintActivityAction } from '../../store/documentToken/documentToken.actions';
import { pageSizeInTableList } from '../../webConfig';
import ImageTools from '../ImageTools';
import glusterService from '../../service/glusterService';

const pagination = `page=0&size=${pageSizeInTableList}`;

class PreviewImage extends React.Component {
  constructor(props) {
    super(props);
    this.previewImg = null;
  }

  submitLogActivity = async () => {
    const { levantId, imgInformation } = this.props;
    const body = {
      targetLevantId: levantId,
      token: imgInformation?.token,
      url: imgInformation?.path,
    };
    const response = await this.props.postPrintActivityAction(body);
    if (!response.err) {
      this.props.getCrmActivitiesAction({
        levantId,
        pagination,
      });
    }

    return null;
  };

  handleDownload = () => {
    const { imgInformation } = this.props;
    const { path, token } = imgInformation;
    glusterService.downloadFile(path, token);
  };

  render() {
    const { preview } = this.props;
    if (!preview) {
      return <div />;
    }

    return (
      <div className={s.preview}>
        <div className={s.previewActions}>
          <p className={s.previewTitle}>پیش نمایش</p>
          <Icon
            className={cs(s.previewAction)}
            type="close"
            onClick={() => {
              this.props.closePreview();
            }}
          />
          <Icon
            className={cs(s.previewAction)}
            type="save"
            onClick={() => {
              saveAs(preview);
            }}
          />
          <ReactToPrint
            trigger={() => (
              <Icon className={cs(s.previewAction)} type="printer" />
            )}
            content={() => this.previewImg}
            onAfterPrint={this.submitLogActivity}
          />
          <Icon
            className={cs(s.previewAction)}
            type="download"
            onClick={this.handleDownload}
          />
        </div>
        <div className={s.imgWrapper}>
          <ImageTools>
            <img
              src={preview}
              alt=""
              ref={el => {
                this.previewImg = el;
              }}
              className={cs(s.placeholder, s.object_fit_cover)}
            />
          </ImageTools>
        </div>
      </div>
    );
  }
}

PreviewImage.propTypes = {
  preview: PropTypes.object,
  imgInformation: PropTypes.object,
  closePreview: PropTypes.func.isRequired,
  getCrmActivitiesAction: PropTypes.func.isRequired,
  postPrintActivityAction: PropTypes.func.isRequired,
  levantId: PropTypes.string,
};

PreviewImage.defaultProps = {
  preview: null,
  imgInformation: null,
  levantId: null,
};

const mapStateToProps = state => ({
  levantId: state.neshanAuth?.jwt?.levantId,
});

const mapDispatch = {
  getCrmActivitiesAction,
  postPrintActivityAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(PreviewImage));
export const PreviewImageTest = PreviewImage;
