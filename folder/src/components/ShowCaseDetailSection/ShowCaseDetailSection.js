import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ShowCaseDetailSection.scss';
import { getTemplatesAction } from '../../store/phoneCalls/phoneCalls.actions';
import FormBuilder from '../FormBuilder';
import { schema } from './schema';
import CPLoading from '../CP/CPLoading';
import UploadedFileList from './UploadedFileList';
import history from '../../history';

const ShowCaseDetailSection = props => {
  const { data, applications, templates } = props;
  const {
    caseStatusType,
    casePriorityType,
    channel,
    caseType,
    caseOwnerLevantId,
    description,
    caseAssignFullName,
  } = data;
  const channelName =
    applications.filter(value => value.code === channel) || [];
  const caseTypeName =
    templates?.filter(value => value.code === caseType) || [];

  useEffect(() => {
    props.getTemplatesAction('CALL');
  }, []);

  const goToProfile = () => {
    const to = `/lead/${caseOwnerLevantId}`;
    history.push(to);
  };

  const renderForm = () => {
    const { attachmentUrl, caseOwnerFullName, subject } = data;

    return (
      <div className={s.container}>
        <CPLoading
          spinning={!data?.id || !applications?.length || !templates?.length}
          tip="در حال دریافت اطلاعات درخواست..."
        >
          <Row
            gutter={24}
            align="middle"
            type="flex"
            style={{ marginBottom: '20px', marginRight: '0!important' }}
          >
            <div className={s.avatar}>
              <Icon type="user" className={s.avatar_user} />
            </div>
            <Button type="link" className={s.title} onClick={goToProfile}>
              {caseOwnerFullName || '---'}
            </Button>
          </Row>
          <h3 className={s.label}>عنوان</h3>
          <h2 className={s.title_detail}>{subject || '---'}</h2>
          <FormBuilder
            enableReinitialize
            schema={schema(
              caseStatusType,
              casePriorityType,
              channelName[0],
              caseTypeName[0],
              caseAssignFullName,
              description,
            )}
            hideSubmit
            layout="vertical"
          />
          <UploadedFileList files={attachmentUrl} />
        </CPLoading>
      </div>
    );
  };
  return <>{renderForm()}</>;
};

ShowCaseDetailSection.propTypes = {
  data: PropTypes.object,
  applications: PropTypes.array,
  templates: PropTypes.array,
  getTemplatesAction: PropTypes.func,
};
ShowCaseDetailSection.defaultProps = {
  data: [],
  applications: [],
  templates: [],
  getTemplatesAction: () => {},
};

const mapState = state => ({
  applications: state.applications.data,
  templates: state.phoneCalls.call,
});
const mapDispatch = {
  getTemplatesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ShowCaseDetailSection));
