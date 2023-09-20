import React, { useState } from 'react';
import { Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForDeleteTag.scss';
import CPModal from '../../../CP/CPModal';
import CPButton from '../../../CP/CPButton';
import {
  deleteTagsAction,
  getTagsAction,
} from '../../../../store/tag/tag.actions';
import CPMessage from '../../../CP/CPMessage';
import { MODAL_FOR_DELETE_TAG } from '../../repository';

const ModalForDeleteTag = props => {
  const [visible, setVisible] = useState(true);
  const { tagDetail, loading, usage } = props;
  function closeModal() {
    setVisible(false);
  }

  async function deleteTag() {
    const response = await props.deleteTagsAction(tagDetail.id);
    if (!response?.err) {
      CPMessage('با موفقیت حذف گردید.', 'success');
      setVisible(false);
      await props.getTagsAction();
    } else {
      CPMessage('ارتباط با سرور قطع می باشد.', 'error');
      setVisible(false);
    }
  }

  const getUsagesCount = () => usage?.reduce((a, b) => +a + +b.count, 0);

  return (
    <CPModal
      width={400}
      footer={false}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_DELETE_TAG}
    >
      <Row>
        <Col>
          <p className={s.content}>
            <Icon
              twoToneColor="#ff3c31"
              type="close-circle"
              theme="twoTone"
              className={s.delete}
            />
            آیا از حذف تگ<b> {tagDetail?.name} </b>اطمینان دارید ؟
            {getUsagesCount() > 0 && (
              <small>
                این برچسب با <b className={s.count}>({getUsagesCount()})</b>{' '}
                قسمت دیگر در ارتباط است.{' '}
              </small>
            )}
          </p>
        </Col>
        <Col className="text-left">
          <CPButton onClick={closeModal}>انصراف</CPButton>
          <CPButton
            type="primary"
            className="margin-r-5"
            loading={loading}
            onClick={deleteTag}
          >
            تایید
          </CPButton>
        </Col>
      </Row>
    </CPModal>
  );
};

ModalForDeleteTag.propTypes = {
  usage: PropTypes.object,
  tagDetail: PropTypes.object,
  loading: PropTypes.bool,
  deleteTagsAction: PropTypes.func.isRequired,
  getTagsAction: PropTypes.func.isRequired,
};

ModalForDeleteTag.defaultProps = {
  usage: null,
  tagDetail: null,
  loading: false,
};

const mapState = state => ({
  loading: state.tag.deleteLoading,
});

const mapDispatch = {
  deleteTagsAction,
  getTagsAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(ModalForDeleteTag));
export const ModalForDeleteTagTest = ModalForDeleteTag;
