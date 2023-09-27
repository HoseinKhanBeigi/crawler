import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CPModal from '../../../CP/CPModal';
import CPButton from '../../../CP/CPButton';
import CPDivider from '../../../CP/CPDivider';
import CPInput from '../../../CP/CPInput';
import CPRadio from '../../../CP/CPRadio';
import {
  getSearchListAction,
  postSaveSearchAction,
} from '../../../../store/search/search.actions';
import CPMessage from '../../../CP/CPMessage';
import { MODAL_FOR_FILTER_PRESETS } from '../../repository';

const shareableSchema = [
  {
    value: true,
    name: 'بله',
  },
  {
    value: false,
    name: 'خیر',
  },
];

const ModalForFilterPresets = props => {
  const { filterObject, filterType } = props;
  const [visible, setVisible] = useState(true);
  const [shareable, setShareable] = useState(true);
  const [title, setTitle] = useState('');

  const closeModal = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    const result = await props.postSaveSearchAction({
      searchObject: JSON.stringify(filterObject),
      filterType,
      title,
      shareable,
    });

    if (result === 'OK') {
      CPMessage('با موفقیت ذخیره شد.', 'success');
      props.getSearchListAction(filterType);
      closeModal();
    } else {
      CPMessage('ثبت نشد. لطفا مجددا تلاش کنید.', 'error');
    }
  };

  return (
    <CPModal
      title="ذخیره جستجو"
      visible={visible}
      onCancel={closeModal}
      footer={null}
      modalType={MODAL_FOR_FILTER_PRESETS}
    >
      <CPInput
        label="نام این دسته بندی را انتخاب کنید :"
        className="margin-b-10"
        onChange={e => {
          setTitle(e.target.value);
        }}
        value={title}
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
          setShareable(e.target.value);
        }}
      />
      <CPDivider />
      <div className="text-right">
        <CPButton onClick={handleSubmit} type="primary" disabled={!title}>
          ثبت
        </CPButton>
        <CPButton onClick={closeModal} className="btn default-btn margin-r-10">
          انصراف
        </CPButton>
      </div>
    </CPModal>
  );
};

ModalForFilterPresets.propTypes = {
  filterObject: PropTypes.object.isRequired,
  filterType: PropTypes.string.isRequired,
  postSaveSearchAction: PropTypes.func.isRequired,
  getSearchListAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  postSaveSearchAction,
  getSearchListAction,
};

export default connect(null, mapDispatch)(ModalForFilterPresets);
