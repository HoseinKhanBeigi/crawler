import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tags.scss';
import CPButton from '../../components/CP/CPButton';
import { deleteTagsAction, getTagsAction } from '../../store/tag/tag.actions';
import { anyModalOpen } from '../../store/opportunities/opportunities.actions';
import TagCard from '../../components/TagCard';
import withModal from '../../components/HOC/withModal';
import CPAlert from '../../components/CP/CPAlert';
import { MODAL_FOR_ADD_TAG } from '../../components/ModalRoot/repository';
import HandleAclPermission from '../../components/HandleAclPermission';
import { Actions } from '../../utils/aclActions';

const Tags = props => {
  useEffect(() => {
    (async () => {
      await props.getTagsAction();
    })();
  }, []);

  const showMessageModal = () => {
    props.showModalAction({
      type: MODAL_FOR_ADD_TAG,
      props: {
        initialValues: {
          name: '',
          color: '#1890ff',
          description: '',
        },
      },
    });
  };

  const renderError = () => (
    <CPAlert
      className={s.error}
      message="ارتباط با سرور قطع می باشد."
      type="error"
    />
  );

  const renderTags = () => {
    const { data } = props;
    return data?.length ? (
      <Row gutter={15} type="flex">
        {data?.map(tag => (
          <Col key={tag.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <TagCard
              key={tag.id}
              backgroundColor={tag.color}
              title={tag.name}
              tagDetail={tag}
            />
          </Col>
        ))}
      </Row>
    ) : null;
  };

  return (
    <div className={s.root}>
      <HandleAclPermission wich={Actions.tagging}>
        <CPButton
          onClick={showMessageModal}
          className="btn primary-btn"
          icon="plus"
        >
          ایجاد برچسب جدید
        </CPButton>
      </HandleAclPermission>
      {props.error ? renderError() : renderTags()}
    </div>
  );
};

Tags.propTypes = {
  getTagsAction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  data: PropTypes.array,
  showModalAction: PropTypes.func.isRequired,
  error: PropTypes.object,
};

Tags.defaultProps = {
  data: [],
  error: {},
};

const mapState = state => ({
  data: state.tag.data?.content,
  error: state.tag.error,
  loading: state.tag.loading,
});

const mapDispatch = {
  anyModalOpen,
  deleteTagsAction,
  getTagsAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(withModal(Tags)));
