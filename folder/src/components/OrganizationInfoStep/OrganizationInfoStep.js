import React, { useEffect, useState } from 'react';
import { Col, Divider, Form, Input, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './OrganizationInfoStep.scss';
import { formatNumbers } from '../../utils/index';
import CPButton from '../CP/CPButton';
import CPMessage from '../CP/CPMessage';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import branchManagementService from '../../service/branchManagementService';

const InputGroup = Input.Group;
const { Item } = Form;

const OrganizationInfoStep = props => {
  const { onChangeStep, onDiscardStep, editMode, personInfo } = props;
  const [organizationNumber, setOrganizationNumber] = useState(null);
  const [voipMapperInfo, setVoipMapperInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasExtnumber, setHasExtnumber] = useState(false);
  const [prefixOrganizationNumber, setPrefixOrganizationNumber] = useState(
    null,
  );
  const [extensionNumber, setExtensionNumber] = useState(null);

  function makeBody() {
    const body = {
      context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
      extensionNumber,
      levantId: personInfo?.levantId,
      enable: true,
      organizationNumber: prefixOrganizationNumber.concat(organizationNumber),
      mobile: personInfo?.mobilePhone,
    };
    if (voipMapperInfo?.id) {
      body.id = voipMapperInfo?.id;
    }
    return body;
  }

  const submitAddInfo = () => {
    if (organizationNumber && prefixOrganizationNumber && extensionNumber) {
      setLoading(true);
      const body = makeBody();
      branchManagementService.postAddingOrganizationInfo(body).then(
        () => {
          setLoading(false);
          onChangeStep();
        },
        () => setLoading(false),
      );
    } else {
      CPMessage('لطفا فیلدهای خالی را پر کنید!', 'warning');
    }
  };

  const submitEditInfo = () => {
    if (organizationNumber && prefixOrganizationNumber && extensionNumber) {
      setLoading(true);
      const body = makeBody();
      branchManagementService.putEditEmployeeVoipInfo(body).then(
        () => {
          setLoading(false);
          onChangeStep();
        },
        () => setLoading(false),
      );
    } else {
      CPMessage('لطفا فیلدهای خالی را پر کنید!', 'warning');
    }
  };

  function organizationNumberFactory(number) {
    const item = number?.toString();
    const pre = item?.slice(0, 3);
    const restNumber = item?.slice(3);
    setPrefixOrganizationNumber(pre);
    setOrganizationNumber(restNumber);
  }

  function getEmployeeVoipInfo() {
    setLoading(true);
    branchManagementService
      .getEmployeeVoipInfoBylevantId(personInfo?.levantId)
      .then(
        response => {
          const {
            extensionNumber: extNumber,
            organizationNumber: orgNumber,
          } = response;
          if (extNumber || orgNumber) {
            setHasExtnumber(true);
          }
          setVoipMapperInfo(response);
          organizationNumberFactory(orgNumber);
          setExtensionNumber(extNumber);
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
      );
  }

  const onChangeOrgNumber = async value => {
    const convertedValue = await formatNumbers(value);
    setOrganizationNumber(convertedValue);
  };

  const onChangePrefixNumber = async value => {
    const convertedValue = await formatNumbers(value);
    setPrefixOrganizationNumber(convertedValue);
  };

  const onChangeExtensionNumber = async value => {
    const convertedValue = await formatNumbers(value);
    setExtensionNumber(convertedValue);
  };

  useEffect(() => {
    if (editMode) {
      getEmployeeVoipInfo();
    }
  }, []);
  return (
    <>
      <div
        className={s.employeeInfoDescription_container}
        style={{ minHeight: '308px' }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Item label="شماره سازمانی">
              <InputGroup compact>
                <Input
                  maxLength={8}
                  placeholder="43000043"
                  style={{ width: '70%', textAlign: 'left' }}
                  value={organizationNumber}
                  onChange={e => onChangeOrgNumber(e.target.value)}
                />
                <Input
                  maxLength={3}
                  placeholder="021"
                  style={{ width: '30%', textAlign: 'left' }}
                  value={prefixOrganizationNumber}
                  onChange={e => onChangePrefixNumber(e.target.value)}
                />
              </InputGroup>
            </Item>
          </Col>
          <Col span={12}>
            <Item label="داخلی">
              <Input
                maxLength={3}
                placeholder="124"
                style={{ textAlign: 'left' }}
                value={extensionNumber}
                onChange={e => onChangeExtensionNumber(e.target.value)}
              />
            </Item>
          </Col>
        </Row>
      </div>
      <Row gutter={24}>
        <Divider />
      </Row>
      <Row
        gutter={24}
        style={{ justifyContent: 'space-between', direction: 'ltr' }}
      >
        <Col span={24} style={{ textAlign: 'left' }}>
          {!editMode && (
            <>
              <CPButton
                type="primary"
                onClick={submitAddInfo}
                disabled={
                  !organizationNumber &&
                  !extensionNumber &&
                  !prefixOrganizationNumber &&
                  !editMode
                }
                className={s.button}
                loading={loading}
              >
                ثبت و گام بعدی
              </CPButton>
              <CPButton type="link" onClick={onDiscardStep}>
                رد کردن این مرحله
              </CPButton>
            </>
          )}
          {editMode && (
            <CPButton
              type="primary"
              onClick={hasExtnumber ? submitEditInfo : submitAddInfo}
              disabled={
                !organizationNumber &&
                !extensionNumber &&
                !prefixOrganizationNumber &&
                !editMode
              }
              className={s.button}
              loading={loading}
            >
              ثبت مشخصات
            </CPButton>
          )}
        </Col>
      </Row>
    </>
  );
};

OrganizationInfoStep.propTypes = {
  onChangeStep: PropTypes.func,
  personInfo: PropTypes.object,
  editMode: PropTypes.bool,
  onDiscardStep: PropTypes.func,
};
OrganizationInfoStep.defaultProps = {
  onChangeStep: () => {},
  personInfo: {},
  editMode: false,
  onDiscardStep: () => {},
};
export default withStyles(s)(OrganizationInfoStep);
