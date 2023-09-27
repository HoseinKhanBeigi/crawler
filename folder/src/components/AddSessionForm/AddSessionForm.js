import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFullSearchAction } from '../../store/fullSearch/fullSearch.actions';
import { getTemplatesAction } from '../../store/phoneCalls/phoneCalls.actions';
import FormBuilder from '../FormBuilder';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import { sessionServices } from '../../service/sessionService';
import { schema } from './schema';
import useSessionForm from '../../routes/sessions/hooks/useSessionForm';
import branchManagementService from '../../service/branchManagementService';

const AddSessionForm = props => {
  const { levantId, templates, onSubmit } = props;
  const [loading, setLoading] = useState(false);
  const [crmLeadUsers, setCrmLeadUsers] = useState([]);
  const [crmFilteredUsers, setCrmFilteredUsers] = useState([]);
  const [searchDetail, setSearchDetail] = useState(null);
  const [sessionAttachments, setSessionAttachments] = useState([]);
  const [
    customRequestProceedingDisabled,
    setCustomRequestProceedingDisabled,
  ] = useState(false);
  const {
    attendeesList,
    sessionForUsersList,
    handleAttendeesSearch,
    handleSessionForSearch,
  } = useSessionForm(props.getFullSearchAction, props.getTemplatesAction);

  const customRequest = async ({ onSuccess, onError, file }) => {
    sessionServices.postSessionAttachment(file).then(
      response => {
        const prev = [...sessionAttachments];
        const uploaded = { id: response.result, proceeding: false };
        prev.push(uploaded);
        setSessionAttachments(prev);
        onSuccess(null, file);
      },
      () => {
        onError('');
      },
    );
  };
  const customRequestProceeding = async ({ onSuccess, onError, file }) => {
    sessionServices.postSessionAttachment(file).then(
      response => {
        const prev = [...sessionAttachments];
        const uploaded = { id: response.result, proceeding: true };
        prev.push(uploaded);
        setSessionAttachments(prev);
        setCustomRequestProceedingDisabled(true);
        onSuccess(null, file);
      },
      () => {
        onError('');
      },
    );
  };

  function handleTime(d, value) {
    const hours = value?.hours() || 0;
    const minutes = value?.minutes() || 0;
    const currentDate = new Date(d);
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    return new Date(currentDate).getTime();
  }

  function bodyFactory(form) {
    return {
      id: props.editMode ? form.id : undefined,
      attendees: form?.attendees.map(item => ({ levantId: item.key })),
      sessionAttachments,
      planners: [{ levantId: form?.planners }],
      sessionFors: props.withSessionFor
        ? form?.sessionFors.map(item => ({ levantId: item.key }))
        : [{ levantId: props.leadLevantId }],
      attendeesNotify: form?.attendeesNotify ? form?.attendeesNotify[0] : false,
      context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
      creator: { levantId },
      description: form?.description,
      startDate: handleTime(form?.sessionDate, form?.startTime),
      endDate: handleTime(form?.sessionDate, form?.endTime),
      name: form?.name,
      sessionStatus: form?.sessionStatus,
      sessionTypeId: form?.sessionTypeId,
    };
  }

  useEffect(() => {
    branchManagementService.getAllCurrentUnitEmployee().then(response => {
      if (response.additionalInfo) {
        const { additionalInfo, ...other } = response;
        // eslint-disable-next-line no-param-reassign
        response = { ...other };
      }
      const crmUser = Object.values(response.result);
      setCrmLeadUsers(crmUser);
      setCrmFilteredUsers(crmUser);
    });
  }, []);

  const handleSearch = value => {
    if (value) {
      const newList = crmLeadUsers.filter(item =>
        item.fullName.includes(value),
      );
      setCrmFilteredUsers(newList);
    } else {
      setCrmFilteredUsers(crmLeadUsers);
    }
  };

  const handleSubmit = form => {
    setLoading(true);
    if (!props.editMode) {
      sessionServices.postNewSession(bodyFactory(form)).then(() => {
        onSubmit();
        setLoading(false);
      });
    } else {
      sessionServices.putSession(bodyFactory(form)).then(() => {
        onSubmit();
        setLoading(false);
      });
    }
  };

  return (
    <FormBuilder
      schema={schema(
        sessionForUsersList,
        handleSearch,
        templates,
        crmFilteredUsers,
        searchDetail,
        setSearchDetail,
        customRequest,
        customRequestProceeding,
        handleSessionForSearch,
        attendeesList,
        handleAttendeesSearch,
        customRequestProceedingDisabled,
        props.editMode ? props.initialValues?.sessionAttachments : undefined,
        props.onRemoveFile,
        props.withSessionFor,
      )}
      initialValues={props.initialValues}
      onSubmit={handleSubmit}
      layout="vertical"
      submitLabel={props.editMode ? 'ثبت تغییرات' : 'ثبت جلسه'}
      cancelLabel={props.editMode ? 'انصراف' : undefined}
      onCancel={props.editMode ? props.onCancelEdit : undefined}
      loading={loading}
    />
  );
};

AddSessionForm.defaultProps = {
  templates: [],
  levantId: null,
  onSubmit: () => {},
  initialValues: undefined,
  editMode: false,
  onCancelEdit: () => {},
  onRemoveFile: () => {},
  withSessionFor: true,
};
AddSessionForm.propTypes = {
  withSessionFor: PropTypes.bool,
  leadLevantId: PropTypes.string.isRequired,
  getTemplatesAction: PropTypes.func.isRequired,
  getFullSearchAction: PropTypes.func.isRequired,
  templates: PropTypes.array,
  onSubmit: PropTypes.func,
  levantId: PropTypes.string,
  initialValues: PropTypes.object,
  editMode: PropTypes.bool,
  onCancelEdit: PropTypes.func,
  onRemoveFile: PropTypes.func,
};
const mapState = state => ({
  templates: state.phoneCalls.session,
  levantId: state?.neshanAuth?.jwt?.levantId,
  leadLevantId: state.lead?.data?.levantId,
});
const mapDispatch = {
  getFullSearchAction,
  getTemplatesAction,
};

export default connect(mapState, mapDispatch)(AddSessionForm);
