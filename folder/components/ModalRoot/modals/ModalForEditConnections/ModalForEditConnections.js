import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_EDIT_CONNECTIONS } from '../../repository';
import CPSearchFilter from '../../../CP/CPSearchFilter';
import CPSelect from '../../../CP/CPSelect';
import CPInput from '../../../CP/CPInput';
import CPButton from '../../../CP/CPButton';
import {
  putAPersonRelationOfCompanyAction,
  getPersonsCompaniesAction,
} from '../../../../store/leads/leads.actions';
import styles from './ModalForEditConnections.scss';
import HandleAclPermission from '../../../HandleAclPermission';
import { Actions } from '../../../../utils/aclActions';

export const relationTypeList = [
  {
    text: 'مدیرعامل',
    value: 'CEO',
  },
  {
    text: 'نماینده',
    value: 'AGENT',
  },
  {
    text: 'رئیس هیئت مدیره',
    value: 'CHAIRMAN_OF_THE_BOARD',
  },
  {
    text: 'عضو هیئت مدیره',
    value: 'MEMBER_OF_THE_BOARD',
  },
  {
    text: 'نایب رئیس هیئت مدیره',
    value: 'VICE_CHAIRMAN_OF_THE_BOARD',
  },
  {
    text: 'سایر',
    value: 'OTHER',
  },
];

const ModalForEditConnetions = props => {
  const {
    roleId,
    searchDefaultValue,
    selectDefaultValue,
    otherRelationTitle,
  } = props;
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState(selectDefaultValue);
  const [realationType, setRelationType] = useState(new Map([]));
  const [role, setRole] = useState(otherRelationTitle);

  const closeModal = () => {
    setVisible(false);
  };
  const handleSubmit = () => {
    const body = {
      id: roleId,
      relationType: selectDefaultValue === 'OTHER' ? 'OTHER' : selected,
      otherRelationTypeTitle: role,
    };
    props.putAPersonRelationOfCompanyAction(body);
    closeModal();
  };

  function renderOtherRelationBox() {
    if (selected === 'OTHER') {
      return (
        <div>
          <CPInput
            className={styles.relationInput}
            placeholder="عنوان نقش"
            value={role}
            onChange={e => setRole(e.target.value)}
          />
        </div>
      );
    } else if (otherRelationTitle && selected === 'OTHER') {
      return (
        <div>
          <CPInput
            placeholder="عنوان نقش"
            className={styles.relationInput}
            value={role}
            onChange={e => setRole(e.target.value)}
          />
        </div>
      );
    }
    return false;
  }
  useEffect(() => {
    if (selected !== 'OTHER' && !otherRelationTitle) {
      setRole(null);
    }
  }, [selected]);

  useEffect(() => {
    if (selectDefaultValue === 'سایر') {
      setSelected('OTHER');
    }
  }, []);

  useEffect(() => {
    setRelationType(new Map(relationTypeList.map(t => [t.value, t])));
  }, []);
  return (
    <CPModal
      title="ویرایش ارتباط جدید"
      visible={visible}
      footer={false}
      width={550}
      onCancel={closeModal}
      modalType={MODAL_FOR_EDIT_CONNECTIONS}
      hideModalAction={closeModal}
    >
      <div className={styles.container}>
        <div className={styles.search}>
          <CPSearchFilter
            withSearchButton={false}
            onClickItem={() => {}}
            defaultValue={searchDefaultValue}
            disabled
            newRelationSearchInput
          />
        </div>
        <div className={styles.searchContainer}>
          <CPSelect
            className={styles.selector}
            defaultValue={selected}
            dataSource={[...realationType.values()]}
            onChange={setSelected}
            placeholder="عنوان نقش را انتخاب کنید."
          />
          {renderOtherRelationBox()}
        </div>
      </div>

      <div className={styles.submit}>
        <HandleAclPermission wich={Actions.leadRelationCreate}>
          <CPButton type="primary" onClick={handleSubmit}>
            تایید
          </CPButton>
        </HandleAclPermission>
      </div>
    </CPModal>
  );
};

ModalForEditConnetions.propTypes = {
  putAPersonRelationOfCompanyAction: PropTypes.func.isRequired,
  roleId: PropTypes.string.isRequired,
  searchDefaultValue: PropTypes.object.isRequired,
  selectDefaultValue: PropTypes.object.isRequired,
  otherRelationTitle: PropTypes.string.isRequired,
};

const mapStateToProps = ({ leads }) => ({
  leadData: leads.postNewRelationForAPersonData,
});

const mapDispatch = {
  getPersonsCompaniesAction,
  putAPersonRelationOfCompanyAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(styles)(ModalForEditConnetions));
