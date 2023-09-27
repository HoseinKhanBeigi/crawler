import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal';
import SendEmailForm from '../../../Forms/SendEmailForm';
import { checkExistEmailAction } from '../../../../store/sendEmail/sendEmail.actions';
import CPAlert from '../../../CP/CPAlert';
import CPMessage from '../../../CP/CPMessage';
import s from './ModalForSendEmail.scss';
import { MODAL_FOR_SEND_EMAIL } from '../../repository';

const { Panel } = Collapse;

const ModalForSendEmail = ({
  selectedLevantIds,
  checkExistEmailAction: checkExistEmail,
}) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [notExistEmail, setNotExistEmail] = useState([]);

  const closeModal = () => {
    setVisible(false);
  };

  const panelHeader = () =>
    notExistEmail.length
      ? `تعداد ${notExistEmail.length} نفر از ${selectedLevantIds.length} نفر انتخابی فاقد ایمیل می‌باشند!`
      : null;

  const renderListOfNotExistEmails = () => (
    <ul>
      {notExistEmail.map(user => (
        <ol key={user.levantId}>
          {user.firstName
            ? `${user.firstName} ${user.lastName}`
            : user.levantId}
        </ol>
      ))}
    </ul>
  );

  useEffect(() => {
    checkExistEmail(selectedLevantIds).then(response => {
      setLoading(false);
      if (response) {
        setNotExistEmail(response);
        if (response.length === selectedLevantIds.length) {
          CPMessage('افراد انتخابی فاقد ایمیل معتبر می‌باشند!', 'warning');
          closeModal();
        }
      } else {
        closeModal();
      }
    });
  }, []);

  return (
    <CPModal
      title="ارسال ایمیل گروهی"
      visible={visible}
      onCancel={closeModal}
      footer={false}
      modalType={MODAL_FOR_SEND_EMAIL}
    >
      <div className={s.root}>
        {!loading && notExistEmail.length ? (
          <Collapse>
            <Panel key="1" header={panelHeader()}>
              {renderListOfNotExistEmails()}
            </Panel>
          </Collapse>
        ) : (
          <CPAlert
            type={loading ? 'info' : 'success'}
            message={
              // eslint-disable-next-line no-nested-ternary
              loading
                ? 'در حال دریافت لیست ایمیل‌ها'
                : selectedLevantIds.length > 1
                ? `${selectedLevantIds.length} نفر انتخابی دارای ایمیل معتبر می‌باشند.`
                : `فرد انتخابی دارای ایمیل معتبر است`
            }
          >
            this is it
          </CPAlert>
        )}
        <SendEmailForm
          isBulk
          onSubmit={closeModal}
          levantIds={selectedLevantIds}
        />
      </div>
    </CPModal>
  );
};

ModalForSendEmail.propTypes = {
  selectedLevantIds: PropTypes.array.isRequired,
  checkExistEmailAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  checkExistEmailAction,
};

export default connect(null, mapDispatch)(withStyles(s)(ModalForSendEmail));
