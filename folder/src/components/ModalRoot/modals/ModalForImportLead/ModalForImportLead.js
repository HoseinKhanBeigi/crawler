/* eslint-disable prettier/prettier */
import React from 'react';
import { Icon, Progress, Upload } from 'antd';
import saveAs from 'file-saver';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './ModalForImportLead.scss';
import CPModal from '../../../CP/CPModal';
import Link from '../../../Link';
import CPMessage from '../../../CP/CPMessage';
import excel from './excel.svg';
import {
  getLeadImportProgressAction,
  postImportLeadsAction,
} from '../../../../store/leads/leads.actions';
import CPInput from '../../../CP/CPInput';
import CPDivider from '../../../CP/CPDivider';
import CPButton from '../../../CP/CPButton';
import CPAlert from '../../../CP/CPAlert';
import { MODAL_FOR_IMPORT_LEAD } from '../../repository';
import {kianTableApi} from "../../../KianTable/helpers/globalApi";
import leadService from "../../../../service/leadService";

const { Dragger } = Upload;


class ModalForImportLead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      result: null,
      trackingId: null,
      visible: true,
      fileName: null,
      loading: false,
      percentage: 0,
    };
  }

  componentWillUnmount() {
    clearInterval(this.getResult);
  }

  onClick = () => {
    if (!this.state.list) {
      this.setState({ visible: false });
    } else {
      this.uploadExcel();
    }
  };

  onChange = info => {
    const { status } = info.file;
    if (status === 'error') {
      CPMessage('خطا در آپلود فرم', 'error');
    }

    this.setState({ list: info.fileList });
  };

  uploadExcel = async () => {
    const { trackingId } = this.state;
    if (trackingId) {
      this.setState({
        loading: true,
      });
      this.getResult = setInterval(async () => {
        const progress = await this.props.getLeadImportProgressAction({
          trackingId,
        });
        this.setState({
          percentage: progress.percentage,
        });
        if (progress.completed) {
          clearInterval(this.getResult);
          CPMessage('فایل آپلود شد.', 'success');
          this.setState({
            result: progress.result,
            list: null,
            fileName: null,
            loading: false,
            percentage: 100,
          });
          kianTableApi(this.props.tableIndex).resetTable();
          return false;
        }
        if (!progress.completed && progress.percentage < 100) {
          return false;
        }
        return CPMessage('لطفا مجددا تلاش نمایید.', 'error');
      }, 1000);
    } else {
      CPMessage('لطفا مجددا تلاش نمایید.', 'error');
      this.closeModal();
    }
  };

  downloadTemplate =  async (e) => {
    e.preventDefault();
    await leadService.downloadLegalLeadSampleExcel(this.props.leadType)
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  customRequest = ({ onSuccess, onError, file }) => {
    const { fileName } = this.state;
    const checkInfo = async () => {
      const response = await this.props.postImportLeadsAction({
        fileName,
        body: { file },
        leadType: this.props.leadType,
      });
      this.setState({ trackingId: response.id, percentage: 0 });
      if (response.err) {
        onError(response);
      }
      onSuccess(null, file);
    };
    checkInfo();
  };

  handleChange = e => {
    this.setState({
      fileName: e.target.value,
    });
  };

  render() {
    const { className } = this.props;
    const {
      list,
      result,
      trackingId,
      fileName,
      visible,
      loading,
      percentage,
    } = this.state;
    const settings = {
      customRequest: this.customRequest,
      accept: '.xlsx',
      removable: true,
      fileList: list,
      onChange: info => this.onChange(info),
    };

    return (
      <div className={cs('ModalForImportLead', className)}>
        <CPModal
          title="افزودن گروهی سرنخ"
          visible={visible}
          footer={null}
          onCancel={this.closeModal}
          modalType={MODAL_FOR_IMPORT_LEAD}
        >
          {result && (
            <CPAlert
              className="margin-b-10"
              message="نتیجه :"
              type="info"
              description={result}
            />
          )}
          <div className={cs(s.container, 'row')}>
            <div className={s.download}>
              <Link
                onClick={e => this.downloadTemplate(e)}
                to="/#"
                target="_blank"
              >
                <Icon type="download" />
                دانلود اکسل نمونه برای افزودن گروهی سرنخ ها
              </Link>
            </div>
            <div className={s.addFile}>
              <CPInput
                placeholder="نام فایل"
                type="text"
                value={this.state.fileName}
                onChange={this.handleChange}
                className="margin-b-10"
              />
              <Dragger
                {...settings}
                className={
                  (list !== null && list?.length === 1) || !fileName
                    ? 'blocked'
                    : undefined
                }
              >
                <p className="ant-upload-drag-icon">
                  <img src={excel} height={50} alt="" />
                </p>
                <b>فایل اکسل موردنظر را آپلود نمایید</b>
              </Dragger>
            </div>
          </div>
          <CPDivider />
          <Progress
            percent={percentage}
            strokeColor={{
              from: '#108ee9',
              to: '#87d068',
            }}
          />
          <CPDivider />
          <CPButton
            loading={loading}
            disabled={!trackingId || !fileName}
            className="btn primary-btn margin-l-5"
            onClick={this.onClick}
          >
            تایید
          </CPButton>
          <CPButton onClick={this.closeModal}>انصراف</CPButton>
        </CPModal>
      </div>
    );
  }
}

ModalForImportLead.propTypes = {
  className: PropTypes.string,
  postImportLeadsAction: PropTypes.func.isRequired,
  token: PropTypes.string,
  getLeadImportProgressAction: PropTypes.func.isRequired,
  uploadResult: PropTypes.object,
  leadType: PropTypes.string,
  tableIndex: PropTypes.string,
};

ModalForImportLead.defaultProps = {
  className: null,
  token: null,
  uploadResult: null,
  leadType: null,
  tableIndex: '',
};

const mapStateToProps = state => ({
  token: state.user.data && state.user.data.access_token,
  uploadResult: state.leads.getLeadImportProgressData,
});

const mapDispatch = {
  postImportLeadsAction,
  getLeadImportProgressAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForImportLead));
export const ModalForImportLeadTest = ModalForImportLead;
