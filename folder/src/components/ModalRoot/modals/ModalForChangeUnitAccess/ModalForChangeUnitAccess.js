import React, { useEffect, useMemo, useState } from 'react';
import { Descriptions } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './ModalForChangeUnitAccess.scss';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_CHANGE_UNIT_ACCESS } from '../../repository';
import {
  getAclMenuListAction,
  getAclAuthoritiesListAction,
} from '../../../../store/acl/acl.actions';
import CautionMessage from '../../../../routes/login/components/CautionMessage/CautionMessage';
import unitAccessService from '../../../../service/unitAccessService';
import UnitsList from '../../../../routes/login/components/UnitsList/UnitsList';
import CPLoading from '../../../CP/CPLoading';
import CPButton from '../../../CP/CPButton';
// import PropTypes from "prop-types";

const ModalForChangeUnitAccess = props => {
  const { unit } = props;
  const [visible, setVisible] = useState(true);
  const [allUnits, setAllUnit] = useState([]);
  const units = useMemo(() => allUnits.filter(item => unit.id !== item.id), [
    allUnits,
  ]);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showChangeDefaultUnit, setShowChangeDefaultUnit] = useState(false);
  const [selectedDefaultUnit, setSelectedDefaultUnit] = useState(null);
  const closeModal = () => {
    setVisible(false);
  };

  const changeUnitHandler = async () => {
    try {
      await unitAccessService.changeCurrentUnit(selectedUnit?.code);
      closeModal();
      await props.getAclMenuListAction();
      await props.getAclAuthoritiesListAction();
      window.location.reload();
    } catch (e) {
      // ...
    }
  };

  const openChangeDefaultUnitForm = () => {
    setShowChangeDefaultUnit(true);
  };

  const closeChangeDefaultUnitForm = () => {
    setShowChangeDefaultUnit(false);
  };

  const changeDefaultUnitFormHandler = async () => {
    try {
      await unitAccessService.setDefaultUnit(selectedDefaultUnit?.id);
      closeModal();
    } catch (e) {
      // ...
    }
  };

  useEffect(() => {
    (async () => {
      setLoadingUnits(true);
      try {
        const {
          accessibleUnit = [],
        } = await unitAccessService.readAllAccessibleUnit();
        setAllUnit(accessibleUnit);
      } catch (e) {
        closeModal();
      }
      setLoadingUnits(false);
    })();
  }, []);

  const renderDescriptionData = () => {
    const items = [
      { value: unit.name, label: `نام واحد سازمانی` },
      { value: unit.code, label: `کد واحد سازمانی` },
    ];
    return (
      <Descriptions layout="vertical" column={2}>
        {items.map(item => (
          <Descriptions.Item label={item.label} className={s.label}>
            {item.value || '---'}
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  };

  const ChangeUnit = (
    <div>
      <div className={s.currentUnitInfo}>
        <h4>واحد سازمانی فعلی</h4>
        <div className={s.desc_container}>{renderDescriptionData()}</div>
      </div>
      <div className={s.changeUnit}>
        <h4>واحد سازمانی های دیگر</h4>
        <CautionMessage message="ابتدا واحد سازمانی مورد نظر خود را انتخاب و سپس روی دکمه تغییر دسترسی کلیک کنید" />
        <div className={s.unitList}>
          {loadingUnits ? (
            <CPLoading spinning />
          ) : (
            <UnitsList
              units={units}
              selectedUnitId={selectedUnit?.id || null}
              onChange={setSelectedUnit}
            />
          )}
        </div>
        <CPButton
          disabled={!selectedUnit}
          type="primary"
          onClick={changeUnitHandler}
        >
          تغییر واحد
        </CPButton>
      </div>
      <div className={s.changeDefaultUnit}>
        <CautionMessage message="شما می توانید شعبه یا نمایندگی پیشفرض خود را تنظیم کنید تا با هر بار ورود به سیستم مستقیما به آن وارد شوید. برای تغییر مسیر پیشفرض ورود به داشبورد روی تغییر پیشفرض کلیک کنید" />
        <CPButton onClick={openChangeDefaultUnitForm}>
          تغییر واحد پیشفرض
        </CPButton>
      </div>
    </div>
  );

  const ChangeDefaultUnit = (
    <div className={s.defaultUnitForm}>
      <div className={s.unitList}>
        <UnitsList
          units={allUnits}
          selectedUnitId={selectedDefaultUnit?.id || null}
          onChange={setSelectedDefaultUnit}
        />
      </div>
      <div className={s.defaultUnitForm__footer}>
        <CPButton onClick={closeChangeDefaultUnitForm}>انصراف</CPButton>
        <CPButton
          disabled={!selectedDefaultUnit}
          type="primary"
          onClick={changeDefaultUnitFormHandler}
        >
          ثبت تغییرات
        </CPButton>
      </div>
    </div>
  );

  return (
    <CPModal
      modalType={MODAL_FOR_CHANGE_UNIT_ACCESS}
      onCancel={closeModal}
      visible={visible}
      title={
        showChangeDefaultUnit ? 'تغییر واحد پیشفرض' : 'مدیریت واحد سازمانی'
      }
      footer={false}
      className={s.wrapper}
    >
      {showChangeDefaultUnit ? ChangeDefaultUnit : ChangeUnit}
    </CPModal>
  );
};

ModalForChangeUnitAccess.propTypes = {
  unit: PropTypes.array.isRequired,
  getAclMenuListAction: PropTypes.func.isRequired,
  getAclAuthoritiesListAction: PropTypes.func.isRequired,
};

const mapState = state => ({
  unit: state.user?.currentUserInfoEmployee?.unit || {},
});
const mapDispatch = {
  getAclMenuListAction,
  getAclAuthoritiesListAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForChangeUnitAccess));
