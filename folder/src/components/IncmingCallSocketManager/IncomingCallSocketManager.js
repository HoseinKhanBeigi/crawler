import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import mqtt from 'mqtt';
import { Icon, notification } from 'antd';
import { connect } from 'react-redux';
import { resolveVariable, BASE_VARIABLE_KEYS } from '../../serviceConfig';
import withStickyWindow from '../HOC/withStickWindow';
import KnownCallInfoNotification from '../KnownCallInfoNotification';
import UnknownCallInfoNotification from '../UnknownCallInfoNotification';
import OutgoingCallInfoNotification from '../OutgoingCallInfoNotification';
import {
  STICKY_WINDOW_FOR_REGISTER_CALL_DETAIL,
  STICKY_WINDOW_FOR_UPDATE_CALL_DETAIL,
  STICKY_WINDOW_FOR_ADD_LEAD_CALL,
} from '../StickyWindowRoot/StickyWindows/StickyWindowRepository';

const IncomingCallSocketManager = props => {
  let onCallingSocket = null;
  const showModal = type => modalProps => () => {
    props.showStickyWindowAction({
      type,
      props: modalProps,
    });
  };

  const onShowKnownCallDetail = callInfo => {
    showModal(STICKY_WINDOW_FOR_REGISTER_CALL_DETAIL)({
      data: { ...callInfo },
    })();
  };

  const onAddLeadCallDetail = callInfo => {
    showModal(STICKY_WINDOW_FOR_ADD_LEAD_CALL)({
      data: { ...callInfo },
    })();
  };

  const onUpdateCallDetail = callInfo => {
    showModal(STICKY_WINDOW_FOR_UPDATE_CALL_DETAIL)({
      data: { ...callInfo },
    })();
  };

  const outgoingCallAction = data => {
    const { callInfo } = data;
    const { callerPhoneNumber } = callInfo;
    notification.open({
      message: `در حال شماره گیری ${callerPhoneNumber}`,
      description: (
        <OutgoingCallInfoNotification
          onShowCallDetail={onShowKnownCallDetail}
          data={data}
        />
      ),
      placement: 'bottomRight',
      icon: <Icon type="phone" theme="twoTone" />,
      duration: 0,
      key: callerPhoneNumber,
    });
  };

  const incomingCallAction = data => {
    const { neededAction, voipCallId } = data;
    notification.open({
      message: 'شما تماس ورودی دارید',
      description:
        neededAction === 'FILL_CALL_FORM' ? (
          <KnownCallInfoNotification
            onShowCallDetail={onShowKnownCallDetail}
            data={data}
          />
        ) : neededAction === 'FILL_UPDATE_LEAD_FORM' ||
          neededAction === 'FILL_CREATE_LEAD_FORM' ? (
          <UnknownCallInfoNotification
            onShowAddLeadCallDetail={onAddLeadCallDetail}
            onShowUpdateCallDetail={onUpdateCallDetail}
            data={data}
          />
        ) : (
          ''
        ),
      placement: 'bottomRight',
      icon: <Icon type="phone" theme="twoTone" />,
      duration: 0,
      key: voipCallId,
    });
  };

  function openSubscript() {
    onCallingSocket.subscribe('VOIP', { QOS: 2 });
  }

  function IncomingCallOpenSocket() {
    const { levantId } = props;
    onCallingSocket.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log(
        'successfully connected to : ',
        resolveVariable(BASE_VARIABLE_KEYS.MQTT_URL),
      );
    });

    openSubscript();

    onCallingSocket.on('message', (topic, message) => {
      if (message && message.toString()) {
        const payload = JSON.parse(message.toString());
        const { voipType } = payload;
        const { operatorLevantId } = payload;
        if (levantId) {
          if (
            levantId &&
            operatorLevantId === levantId &&
            voipType === 'INCOMING'
          ) {
            notification.destroy();
            incomingCallAction(payload);
          } else if (
            voipType === 'OUTGOING' &&
            levantId &&
            operatorLevantId === levantId
          ) {
            notification.destroy();
            outgoingCallAction(payload);
          }
        }
      }
    });
  }

  function onSocketConnectionError() {
    onCallingSocket.on('error', () => {
      // error
      // eslint-disable-next-line no-console
      console.log('mqtt error');
    });
    onCallingSocket.on('offline', () => {
      // offline
      // eslint-disable-next-line no-console
      console.log('mqtt offline');
    });
  }

  useEffect(() => {
    try {
      const options = {
        mqttClientId: resolveVariable(BASE_VARIABLE_KEYS.MQTT_CLIENT_ID),
        mqttUsername: resolveVariable(BASE_VARIABLE_KEYS.MQTT_USER_NAME),
        mqttPassword: resolveVariable(BASE_VARIABLE_KEYS.MQTT_PASSWORD),
        clean: resolveVariable(BASE_VARIABLE_KEYS.MQTT_CLEAN),
      };
      onCallingSocket = mqtt.connect(
        resolveVariable(BASE_VARIABLE_KEYS.MQTT_URL),
        options,
      );
      onSocketConnectionError();
      IncomingCallOpenSocket();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(
        'failed to connect to mqtt with this url : ',
        resolveVariable(BASE_VARIABLE_KEYS.MQTT_URL),
      );
    }
  }, []);
  return true;
};

IncomingCallSocketManager.propTypes = {
  levantId: PropTypes.string,
  showStickyWindowAction: PropTypes.func.isRequired,
  hideAllStickyWindowAction: PropTypes.func.isRequired,
};

IncomingCallSocketManager.defaultProps = {
  levantId: null,
};

const mapState = state => ({
  levantId: state?.neshanAuth?.jwt?.levantId,
});

export default connect(
  mapState,
  null,
)(withStickyWindow(IncomingCallSocketManager));
