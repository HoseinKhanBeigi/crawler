import React, { useEffect, useState } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiOpenInNew } from '@mdi/js';
import s from './SessionDrawer.scss';
import RenderDetailRow from './components/RenderDetailRow/RenderDetailRow';
import RenderUploadPreview from './components/RenderUploadPreview/RenderUploadPreview';
import { itemsList } from './constant/itemsList';
import Link from '../../../../components/Link';
import AddSessionForm from '../../../../components/AddSessionForm';
import CPButton from '../../../../components/CP/CPButton';
import { kianTableApi } from '../../../../components/KianTable/helpers/globalApi';
import { SESSION_LIST_TABLE } from '../../../../store/settings/settings.constants';
import { sessionServices } from '../../../../service/sessionService';
import CommentsDrawer from '../CommentsDrawer/CommentsDrawer';
import useSessionGetFilesUrl from '../../hooks/useSessionGetFilesUrl';
import convertTimestampToHHmmFormat from '../../../../utils/convertTimestampToHHmmFormat';
import KianDrawer from '../../../../components/KianDrawer/KianDrawer';
import { DRAWER_FOR_EDIT_SESSION_DETAIL } from '../../../../components/ModalRoot/repository';

const convertServerValuesToFormValues = (serverData, filesUrl) => ({
  ...serverData,
  attendeesNotify: serverData?.attendeesNotify
    ? [`${serverData?.attendeesNotify}`]
    : undefined,
  sessionDate: serverData?.startDate,
  startTime: convertTimestampToHHmmFormat(serverData?.startDate),
  endTime: convertTimestampToHHmmFormat(serverData?.endDate),
  planners: serverData?.planners[0].levantId,
  attendees: serverData?.attendees.map(d => ({
    key: d.levantId,
    label: `${d.lastName} ${d.firstName}`,
  })),
  sessionFors: serverData?.sessionFors.map(d => ({
    key: d.levantId,
    label: `${d.lastName} ${d.firstName}`,
  })),
  sessionAttachments: serverData?.sessionAttachments.map(file => ({
    uid: file.id,
    name: file.fileName,
    proceeding: file.proceeding,
    thumbUrl: filesUrl ? filesUrl[file.id] : undefined,
    url: filesUrl ? filesUrl[file.id] : undefined,
  })),
});

// eslint-disable-next-line react/prop-types
const SessionDrawer = ({ sessionData: data, editMode: editing, drawerId }) => {
  const [editMode, setEditMode] = useState(editing);
  const [showComment, setShowComment] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [visible, setVisible] = useState(true);
  const { filesUrl } = useSessionGetFilesUrl(sessionData);

  const onClose = () => {
    setVisible(false);
    setEditMode(false);
  };

  const isEditDrawer = drawerId === DRAWER_FOR_EDIT_SESSION_DETAIL;

  const closeHandler = () => (isEditDrawer ? onClose() : setEditMode(false));

  useEffect(() => {
    setSessionData(data);
  }, [data]);

  const refreshData = () => {
    kianTableApi(SESSION_LIST_TABLE).refreshTable();
    sessionServices.getSessionDetailById(sessionData.id).then(value => {
      if (value.additionalInfo?.ok) {
        setSessionData(value);
      }
    });
    closeHandler();
  };
  const removeFileHandler = file =>
    sessionServices.removeSessionAttachmentById(file.uid);

  const renderContainer = () =>
    editMode ? (
      <AddSessionForm
        editMode
        onSubmit={refreshData}
        onRemoveFile={removeFileHandler}
        onCancelEdit={closeHandler}
        initialValues={convertServerValuesToFormValues(sessionData, filesUrl)}
      />
    ) : (
      <>
        {itemsList(sessionData).map(item => (
          <RenderDetailRow
            data={item.data}
            title={item.title}
            type={item.type}
          />
        ))}
        <RenderUploadPreview
          filesUrl={filesUrl}
          proceeding
          fileList={sessionData.sessionAttachments}
        />
        <RenderUploadPreview
          filesUrl={filesUrl}
          fileList={sessionData.sessionAttachments}
        />
        <div className={s.footer}>
          <CPButton onClick={() => setShowComment(true)}>نظرات</CPButton>
          <CPButton type="primary" onClick={() => setEditMode(true)}>
            ویرایش جلسه
          </CPButton>
        </div>
      </>
    );

  return (
    <KianDrawer
      title={`${isEditDrawer ? 'ویرایش' : 'مشاهده'} جلسه`}
      renderHeader={
        <div className={s.header}>
          <p>{`${isEditDrawer ? 'ویرایش' : 'مشاهده'} جلسه`}</p>
          {sessionData && (
            <Link to={`/session/${sessionData.id}`} target>
              <Icon
                path={mdiOpenInNew}
                style={{ width: '16px', marginRight: '8px' }}
                color="#178ffe"
              />
            </Link>
          )}
        </div>
      }
      visible={visible}
      onClose={() => {
        onClose();
        setEditMode(false);
      }}
      drawerId={drawerId}
    >
      <>
        {sessionData && renderContainer()}
        <CommentsDrawer
          onClose={() => setShowComment(false)}
          showComment={showComment}
          sessionId={sessionData?.id}
        />
      </>
    </KianDrawer>
  );
};

SessionDrawer.defaultProps = {
  editMode: false,
};

SessionDrawer.propTypes = {
  editMode: PropTypes.bool,
  sessionData: PropTypes.object.isRequired,
  drawerId: PropTypes.string.isRequired,
};

export default withStyle(s)(SessionDrawer);
