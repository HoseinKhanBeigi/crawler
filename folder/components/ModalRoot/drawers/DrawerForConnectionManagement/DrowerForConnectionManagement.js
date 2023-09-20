import React, { useEffect, useMemo, useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import {
  DRAWER_FOR_CONNECTION_MANAGEMENT,
  MODAL_FOR_ADD_CONNECTION,
  MODAL_FOR_EDIT_CONNECTIONS,
} from '../../repository';
import CPDivider from '../../../CP/CPDivider';
import {
  deleteAPersonRelationCompanyAction,
  getPersonsCompaniesAction,
  getBusinessRelationsAction,
} from '../../../../store/leads/leads.actions';
import CPButton from '../../../CP/CPButton';
import WithModal from '../../../HOC/withModal';
import s from './DrawerForConnectionManagement.scss';
import ConnectionItem from '../../../ConnectionItem/ConnectionItem';

const DrawerForConnectionManagement = props => {
  const { leadId, company, levantId, business, persons } = props;
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  const showModal = () => {
    props.showModalAction({
      type: MODAL_FOR_ADD_CONNECTION,
      props: {
        relationId: levantId,
        businessMode: business,
      },
    });
  };

  const closeModalAndShowNewOne = () => {
    setVisible(false);
    showModal();
  };

  const onDelete = id => {
    if (business) {
      const index = persons.findIndex(section => section.id === id);
      props.deleteAPersonRelationCompanyAction(persons[index]?.id).then(() => {
        props.getBusinessRelationsAction(leadId);
      });
    } else {
      const index = company.findIndex(section => section.id === id);
      props.deleteAPersonRelationCompanyAction(company[index]?.id).then(() => {
        props.getPersonsCompaniesAction(leadId);
      });
    }
  };

  const onEditCompany = id => {
    setVisible(false);
    const index = company.findIndex(section => section.id === id);
    props.showModalAction({
      type: MODAL_FOR_EDIT_CONNECTIONS,
      props: {
        searchDefaultValue: company[index]?.businessName,
        roleId: company[index]?.id,
        selectDefaultValue:
          company[index]?.relationType === 'OTHER'
            ? company[index]?.relationTypeTitle
            : company[index]?.relationType,
        otherRelationTitle: company[index]?.otherRelationTypeTitle,
      },
    });
  };

  const onEditPersons = id => {
    setVisible(false);
    const index = persons.findIndex(section => section.id === id);
    props.showModalAction({
      type: MODAL_FOR_EDIT_CONNECTIONS,
      props: {
        searchDefaultValue: persons[index]?.personName,
        roleId: persons[index]?.id,
        selectDefaultValue:
          persons[index]?.relationType === 'OTHER'
            ? persons[index]?.relationTypeTitle
            : persons[index]?.relationType,
        otherRelationTitle: persons[index]?.otherRelationTypeTitle,
      },
    });
  };

  useEffect(() => {
    if (business) {
      props.getBusinessRelationsAction(leadId);
    } else {
      props.getPersonsCompaniesAction(leadId);
    }
  }, []);

  const companyItems = useMemo(
    () =>
      company?.map(item => (
        <ConnectionItem
          id={item?.id}
          businessName={item?.businessName}
          businessNationalCode={item?.businessNationalCode}
          otherRelationTypeTitle={item?.otherRelationTypeTitle}
          relationTypeTitle={item?.relationTypeTitle}
          businessMode={business}
          onDelete={onDelete}
          onEdit={onEditCompany}
        />
      )),
    [company],
  );

  const personsItems = useMemo(
    () =>
      persons?.map(item => (
        <ConnectionItem
          id={item?.id}
          businessMode={business}
          personName={item?.personName}
          nationalCode={item?.personNationalCode}
          otherRelationTypeTitle={item?.otherRelationTypeTitle}
          relationTypeTitle={item?.relationTypeTitle}
          onDelete={onDelete}
          onEdit={onEditPersons}
        />
      )),
    [persons],
  );

  return (
    <>
      <KianDrawer
        title="مدیریت ارتباطات"
        visible={visible}
        onClose={closeModal}
        onCancel={closeModal}
        drawerId={DRAWER_FOR_CONNECTION_MANAGEMENT}
      >
        {business ? personsItems : companyItems}
        <div className={s.addConnectionContainer}>
          <CPButton
            type="default"
            icon="plus"
            onClick={() => closeModalAndShowNewOne()}
            className={s.addBtn}
          >
            افزودن ارتباط جدید
          </CPButton>
        </div>
        <CPDivider solid />
        <div className={s.close}>
          <CPButton type="primary" onClick={closeModal}>
            بستن
          </CPButton>
        </div>
      </KianDrawer>
    </>
  );
};

DrawerForConnectionManagement.defaultProps = {
  deleteAPersonRelationCompanyAction: null,
};

DrawerForConnectionManagement.propTypes = {
  getPersonsCompaniesAction: PropTypes.func.isRequired,
  getBusinessRelationsAction: PropTypes.func.isRequired,
  deleteAPersonRelationCompanyAction: PropTypes.func,
  showModalAction: PropTypes.func.isRequired,
  leadId: PropTypes.number.isRequired,
  company: PropTypes.array.isRequired,
  levantId: PropTypes.string.isRequired,
  business: PropTypes.array.isRequired,
  persons: PropTypes.array.isRequired,
};

const mapStateToProps = ({ leads }) => ({
  company: leads.getLeadCompanyData,
  persons: leads.getBusinessRelationData,
});

const mapDispatch = {
  getPersonsCompaniesAction,
  deleteAPersonRelationCompanyAction,
  getBusinessRelationsAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(WithModal(DrawerForConnectionManagement)));
