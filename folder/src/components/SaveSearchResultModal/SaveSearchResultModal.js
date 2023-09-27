/* eslint-disable no-restricted-syntax */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './SaveSearchResultModal.scss';
import CPModal from '../CP/CPModal';
import CPButton from '../CP/CPButton';
import CPDivider from '../CP/CPDivider';
import CPInput from '../CP/CPInput';
import CPRadio from '../CP/CPRadio';
import {
  getSearchListAction,
  postSaveSearchAction,
} from '../../store/search/search.actions';
import CPMessage from '../CP/CPMessage';

export const shareableSchema = [
  {
    value: true,
    name: 'بله',
  },
  {
    value: false,
    name: 'خیر',
  },
];

class SaveSearchResultModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      shareable: true,
    };
  }

  onChangeInput = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async () => {
    const { searchQuery, filterType, handleCancel } = this.props;
    // filter empty values in searchQuery
    const filteredSearchQuery = Object.keys(searchQuery).reduce(
      (obj, key) =>
        searchQuery[key] === '' || !searchQuery[key].length
          ? obj
          : { ...obj, [key]: searchQuery[key] },
      {},
    );

    const { searchName, shareable } = this.state;
    if (Object.keys(filteredSearchQuery).length) {
      const searchQueryParse = JSON.stringify(filteredSearchQuery);
      const body = {
        searchObject: searchQueryParse,
        filterType,
        title: searchName,
        shareable,
      };

      const result = await this.props.postSaveSearchAction(body);

      if (result === 'OK') {
        CPMessage('با موفقیت ذخیره شد.', 'success');
        this.props.getSearchListAction(this.props.filterType);
        handleCancel();
      } else {
        CPMessage('ثبت نشد. لطفا مجددا تلاش کنید.', 'error');
        handleCancel();
      }
    } else {
      CPMessage('تمامی فیلدها خالی می باشد.', 'error');
    }
  };

  render() {
    const { className, visible, handleCancel } = this.props;
    const { searchName, shareable } = this.state;

    return (
      <CPModal
        className={cs('SaveSearchResultModal', className)}
        title="ذخیره جستجو"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <CPInput
          label="نام این دسته بندی را انتخاب کنید :"
          className="margin-b-10"
          onChange={e => {
            this.onChangeInput('searchName', e.target.value);
          }}
          value={searchName}
        />
        <span className="controlLabel margin-b-10">
          آیا مایل هستید که این دسته بندی با دیگر گروه های کاری سازمان شما به
          اشتراک گذاشته شود؟
        </span>
        <CPRadio
          className="margin-t-10"
          model={shareableSchema}
          value={shareable}
          onChange={e => {
            this.onChangeInput('shareable', e.target.value);
          }}
        />
        <CPDivider />
        <div className="text-right">
          <CPButton
            onClick={this.handleSubmit}
            type="primary"
            className="btn primary-btn"
          >
            ثبت
          </CPButton>
          <CPButton
            onClick={handleCancel}
            className="btn default-btn margin-r-10"
          >
            انصراف
          </CPButton>
        </div>
      </CPModal>
    );
  }
}

SaveSearchResultModal.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
  searchQuery: PropTypes.object,
  filterType: PropTypes.string,
  postSaveSearchAction: PropTypes.func.isRequired,
  getSearchListAction: PropTypes.func.isRequired,
};

SaveSearchResultModal.defaultProps = {
  className: null,
  visible: false,
  handleCancel: () => {},
  searchQuery: null,
  filterType: null,
};

const mapState = () => {};

const mapDispatch = {
  postSaveSearchAction,
  getSearchListAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(SaveSearchResultModal));
export const SaveSearchResultModalTest = SaveSearchResultModal;
