import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EntityProfileMiniInfo.scss';
import { getDocumentTokenByLevantIdAction } from '../../store/documentToken/documentToken.actions';
import { getProductFormsAction } from '../../store/product/product.actions';
import { getLeadAction } from '../../store/lead/lead.actions';
import CPDropdown from '../CP/CPDropdown';
import ModalForPrintForms from '../ModalForPrintForms';
import CPTooltip from '../CP/CPTooltip';
import {
  anyModalOpen,
  getIdentificationByLevantIdAction,
} from '../../store/opportunities/opportunities.actions';
import withModal from '../HOC/withModal';
import {
  MODAL_FOR_LEAD_FORM,
  MODAL_FOR_TAGGING,
} from '../ModalRoot/repository';

const actionsList = [
  {
    key: 1,
    name: 'ویرایش',
    value: 'edit',
  },
  {
    key: 2,
    name: 'برچسب زدن',
    value: 'tagging',
  },
  {
    key: 3,
    name: 'چاپ فرم',
    value: 'print',
  },
];

const EntityProfileMiniInfo = props => {
  const getFullName = () =>
    `${props.leadInfo?.partyPerson?.firstName || ''} ${props.leadInfo
      ?.partyPerson?.lastName || ''} ${props.leadInfo?.partyBusiness?.name ||
      ''}`;

  async function selectActionType(value) {
    const { levantId, leadInfo, selectedProduct, showModalAction } = props;
    if (value === 'edit') {
      if (leadInfo?.profileType === 'LEAD') {
        showModalAction({
          type: MODAL_FOR_LEAD_FORM,
          props: {
            initialValues: leadInfo.otherInfoList,
            title: `ویرایش ${getFullName()}`,
            isEditMode: true,
            levantId,
            activeForm: leadInfo?.leadType?.toLowerCase(),
          },
        });
      } else {
        await Promise.all([
          props.getIdentificationByLevantIdAction(levantId),
          props.getDocumentTokenByLevantIdAction({
            levantId,
            product: selectedProduct,
          }),
        ]);
        await props.anyModalOpen('modalForUserProfileEditButton');
      }
    }

    if (value === 'print') {
      await props.getProductFormsAction({
        product: props.selectedProduct,
        levantId,
      });
      await props.anyModalOpen('modalForPrintForms');
    }

    if (value === 'tagging') {
      showModalAction({
        type: MODAL_FOR_TAGGING,
        props: {
          taggedIds: [levantId],
          taggingClass: leadInfo?.profileType === 'LEAD' ? 'LEAD' : 'PEOPLE',
          name: getFullName(),
        },
      });
    }
  }

  const { leadInfo, hasEdit } = props;
  return (
    <div className={s.ColumnsHeaderInfo}>
      <span>
        {leadInfo?.onboardingCancelled && (
          <CPTooltip title="ریجکت شده">
            <Icon type="stop" className={s.stopAction} />
          </CPTooltip>
        )}
        <h4>{getFullName()}</h4>
        <p>{leadInfo?.partyPerson?.email}</p>
      </span>
      {hasEdit && (
        <>
          <div className={s.actionsList}>
            <CPDropdown
              menuList={actionsList}
              title="فعالیت ها"
              iconType="caret-down"
              onClick={selectActionType}
            />
          </div>
          {props.anyModalVisible === 'modalForPrintForms' && (
            <ModalForPrintForms
              userInfo={{
                levantId: leadInfo.levantId,
                ...leadInfo.partyPerson,
              }}
              hasProductList
            />
          )}
        </>
      )}
    </div>
  );
};

EntityProfileMiniInfo.propTypes = {
  levantId: PropTypes.string,
  leadInfo: PropTypes.object,
  anyModalOpen: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
  getDocumentTokenByLevantIdAction: PropTypes.func.isRequired,
  getIdentificationByLevantIdAction: PropTypes.func.isRequired,
  getProductFormsAction: PropTypes.func.isRequired,
  hasEdit: PropTypes.bool,
  selectedProduct: PropTypes.string.isRequired,
  anyModalVisible: PropTypes.string,
};

EntityProfileMiniInfo.defaultProps = {
  levantId: null,
  leadInfo: null,
  hasEdit: false,
  anyModalVisible: null,
};

const mapState = state => ({
  leadInfo: state.lead.data,
  anyModalVisible: state.opportunities.anyModalVisible,
  selectedProduct: state.getProducts.selected,
});

const mapDispatch = {
  getLeadAction,
  anyModalOpen,
  getDocumentTokenByLevantIdAction,
  getIdentificationByLevantIdAction,
  getProductFormsAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(withModal(EntityProfileMiniInfo)));
