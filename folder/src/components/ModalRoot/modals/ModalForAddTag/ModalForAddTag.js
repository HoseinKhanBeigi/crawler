import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import s from './ModalForAddTag.scss';
import CPModal from '../../../CP/CPModal';
import CPInput from '../../../CP/CPInput';
import CPTextArea from '../../../CP/CPTextArea';
import CPMessage from '../../../CP/CPMessage';
import {
  getTagsAction,
  postTagsAction,
  putTagsAction,
} from '../../../../store/tag/tag.actions';
import ColorItem from '../../../ColorItem';
import CPButton from '../../../CP/CPButton';
import { MODAL_FOR_ADD_TAG } from '../../repository';

const { Item } = Form;

const ModalForAddTag = props => {
  const [visible, setVisible] = useState(true);
  const { postTagsLoading, editMode } = props;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('فیلد الزامی می باشد.'),
  });

  function closeModal() {
    setVisible(false);
  }

  async function onsubmit(values) {
    const result = editMode
      ? await props.putTagsAction(values)
      : await props.postTagsAction(values);
    if (!result.err) {
      CPMessage('با موفقیت ثبت شد.', 'success');
      setVisible(false);
      await props.getTagsAction();
    } else {
      CPMessage('ثبت نشد. لطفا مجددا تلاش کنید.', 'error');
    }
  }

  return (
    <CPModal
      width={350}
      footer={false}
      title="افزودن برچسب"
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_TAG}
    >
      <Formik
        initialValues={props.initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onsubmit}
      >
        {formProps => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
          } = formProps;
          return (
            <form onSubmit={handleSubmit}>
              <Row type="flex" gutter={15}>
                <Col span={18}>
                  <Item
                    help={errors.name && touched.name ? errors.name : ''}
                    hasFeedback={!!(values.name && touched.name)}
                    validateStatus={
                      errors.name && touched.name ? 'error' : 'success'
                    }
                  >
                    <CPInput
                      label="عنوان"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="name"
                    />
                  </Item>
                </Col>
                <Col span={6}>
                  <ColorItem
                    title="رنگ"
                    onChange={color => setFieldValue('color', color)}
                    value={values.color}
                  />
                </Col>
              </Row>
              <Row className="margin-t-5">
                <Col span={24}>
                  <CPTextArea
                    label="توضیحات"
                    onChange={e => {
                      setFieldValue('description', e.target.value);
                    }}
                    onBlur={handleBlur}
                    name="description"
                    value={values.description}
                    placeholder="توضیحات"
                    rows={5}
                  />
                </Col>
              </Row>
              <Row className="margin-t-10">
                <Col className="text-left">
                  <CPButton onClick={closeModal}>انصراف</CPButton>
                  <CPButton
                    data-cy="submit-message-template"
                    type="primary"
                    htmlType="submit"
                    className="margin-r-5"
                    loading={postTagsLoading}
                  >
                    ثبت
                  </CPButton>
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>
    </CPModal>
  );
};

ModalForAddTag.propTypes = {
  postTagsAction: PropTypes.func.isRequired,
  getTagsAction: PropTypes.func.isRequired,
  putTagsAction: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  postTagsLoading: PropTypes.bool,
  editMode: PropTypes.bool,
};

ModalForAddTag.defaultProps = {
  initialValues: {},
  postTagsLoading: false,
  editMode: false,
};

const mapStateToProps = state => ({
  postTagsLoading: state.tag.postTagsLoading,
});

const mapDispatch = {
  postTagsAction,
  getTagsAction,
  putTagsAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(memo(ModalForAddTag)));
export const ModalForImportLeadTest = ModalForAddTag;
