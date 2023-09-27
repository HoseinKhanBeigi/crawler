import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import saveAs from 'file-saver';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal';
import CPDateRangePicker from '../../../CP/CPDateRangePicker';
import s from './ModalForDownloadTableExcel.scss';
import { downloadTableExcelAction } from '../../../../store/reports/reports.actions';
import CPMessage from '../../../CP/CPMessage';
import { MODAL_FOR_DOWNLOAD_TABLE_EXCEL } from '../../repository';

const ModalForDownloadTableExcel = ({
  endpoint,
  fileName,
  searchQuery,
  ...props
}) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const closeModal = () => setVisible(false);
  const handleChange = data => {
    setFromDate(data?.startDate);
    setToDate(data?.endDate);
  };

  const submit = async (start, end) => {
    setLoading(true);
    // eslint-disable-next-line no-underscore-dangle
    const from = new Date(fromDate?._d)?.getTime() || start;
    // eslint-disable-next-line no-underscore-dangle
    const to = new Date(toDate?._d)?.getTime() || end;

    const response = await props.downloadTableExcelAction(
      from,
      to,
      endpoint,
      searchQuery?.replace('?', '&'),
    );
    setLoading(false);
    if (response) {
      try {
        saveAs(response, `${fileName}(${from}-${to}).xlsx`);
        closeModal();
      } catch (index) {
        CPMessage('خطا در دریافت فایل اکسل', 'error');
      }
    } else {
      CPMessage('لطفا مجددا تلاش نمایید.', 'error');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchQuery);
    const from = params.get('from');
    const to = params.get('to');
    if (searchQuery && from && to) submit(from, to);
    if (searchQuery && (!from || !to)) {
      CPMessage('انتخاب بازه زمانی برای دانلود اجباری است.', 'error');
    }
  }, []);

  return (
    <>
      {!searchQuery && (
        <CPModal
          title="ذخیره اطلاعات در فایل اکسل"
          width={375}
          visible={visible}
          onCancel={closeModal}
          modalType={MODAL_FOR_DOWNLOAD_TABLE_EXCEL}
          okText="دانلود"
          okButtonProps={{
            disabled: !fromDate || !toDate,
            loading,
          }}
          onOk={submit}
        >
          <Row type="flex" gutter={[16, 16]} className={s.root}>
            <Col span={24}>لطفا بازه زمانی را مشخص نمایید:</Col>
            <Col span={24}>
              <CPDateRangePicker onChange={data => handleChange(data)} />
            </Col>
          </Row>
        </CPModal>
      )}
    </>
  );
};

ModalForDownloadTableExcel.propTypes = {
  downloadTableExcelAction: PropTypes.func.isRequired,
  endpoint: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  searchQuery: PropTypes.any,
};

const mapDispatch = {
  downloadTableExcelAction,
};

ModalForDownloadTableExcel.defaultProps = {
  searchQuery: null,
};

export default connect(
  null,
  mapDispatch,
)(withStyles(s)(ModalForDownloadTableExcel));
