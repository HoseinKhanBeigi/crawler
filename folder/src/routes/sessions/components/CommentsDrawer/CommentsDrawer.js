import React from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './CommentsDrawer.scss';
import CPDrawer from '../../../../components/CP/CPDrawer';
import useSessionComment from '../../hooks/useSessionComment';
import CPLoading from '../../../../components/CP/CPLoading';
import CPEmpty from '../../../../components/CP/CPEmpty';
import Comment from './components/Comment/Comment';
import CPTextArea from '../../../../components/CP/CPTextArea';
import CPButton from '../../../../components/CP/CPButton';
import CPToolTip from '../../../../components/CP/CPTooltip';

const initialValue = {
  comment: '',
};

const maxCommentChar = 800;

const validationSchema = Yup.object().shape({
  comment: Yup.string()
    .trim()
    .required('این فیلد اجباری است')
    .max(maxCommentChar, `حداکثر ${maxCommentChar} حرف مجاز است`),
});

const CommentsDrawer = ({ showComment, onClose, sessionId, levantId }) => {
  const { comments, loading, postNewComment } = useSessionComment(
    showComment,
    sessionId,
    levantId,
  );
  return (
    <CPDrawer
      width={420}
      visible={showComment}
      className={s.commentDrawer}
      title="نظرات"
      placement="left"
      closable
      destroyOnClose
      mask
      maskClosable
      onClose={onClose}
    >
      {!loading ? (
        <>
          <div className={s.container}>
            {!comments?.length ? (
              <div className={s.center}>
                <CPEmpty description="کامنتی برای این جلسه ثبت نشده است" />
              </div>
            ) : (
              comments.map(comment => <Comment data={comment} />)
            )}
          </div>
          <div className={s.input}>
            <Formik
              onSubmit={(values, formikActions) => {
                postNewComment(values.comment);
                formikActions.resetForm();
              }}
              validationSchema={validationSchema}
              initialValues={initialValue}
            >
              {formikProps => (
                <Form onSubmit={formikProps.handleSubmit}>
                  <Form.Item
                    required
                    validateStatus={
                      formikProps.errors?.comment ? 'error' : 'success'
                    }
                    help={
                      formikProps.errors?.comment && formikProps.errors?.comment
                    }
                  >
                    <div style={{ position: 'relative' }}>
                      <CPTextArea
                        name="comment"
                        rows={4}
                        value={formikProps.values.comment}
                        onChange={formikProps.handleChange}
                        placeholder="متن نظر را بنویسید"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          left: '10px',
                          top: '10px',
                        }}
                      >
                        <CPToolTip title={`حداکثر ${maxCommentChar} کارکتر`}>
                          <Icon
                            type="info-circle"
                            style={{ color: 'rgba(0,0,0,.45)' }}
                          />
                        </CPToolTip>
                      </div>
                    </div>
                  </Form.Item>
                  <div className={s.buttons}>
                    <CPButton onClick={onClose}>لفو</CPButton>
                    <CPButton type="primary" htmlType="submit">
                      ارسال نظر
                    </CPButton>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      ) : (
        <div className={s.center}>
          <CPLoading spinning />
        </div>
      )}
    </CPDrawer>
  );
};

CommentsDrawer.propTypes = {
  showComment: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
  levantId: PropTypes.string.isRequired,
};

const mapState = state => ({
  levantId: state.neshanAuth?.jwt?.levantId,
});
export default connect(mapState)(withStyle(s)(CommentsDrawer));
