import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ConnectionItems.scss';
import CPDivider from '../CP/CPDivider';
import CPPopConfirm from '../CP/CPPopConfirm';
import HandleAclPermission from '../HandleAclPermission';
import { Actions } from '../../utils/aclActions';

function ConnectionItem({
  id,
  businessMode,
  personName,
  nationalCode,
  businessName,
  businessNationalCode,
  relationTypeTitle,
  otherRelationTypeTitle,
  onEdit,
  onDelete,
}) {
  const itemDetails = useMemo(() => {
    const itemDetail = { label: '' };
    if (businessMode) {
      itemDetail.label = personName !== ' ' ? personName : ' بدون نام';
      if (nationalCode) {
        itemDetail.id = ` کد ملی :${nationalCode}`;
      }
    } else {
      itemDetail.label = businessName !== ' ' ? businessName : ' بدون نام';
      if (businessNationalCode) {
        itemDetail.id = ` شناسه ملی :${businessNationalCode}`;
      }
    }
    return itemDetail;
  }, [businessMode]);

  return (
    <div className={s.infoContainer}>
      <div className={s.info}>
        <div>{itemDetails.label}</div>
        {itemDetails?.id && <div>{itemDetails?.id}</div>}
      </div>
      <CPDivider solid />
      <div className={s.info}>
        <div>
          {relationTypeTitle === 'سایر'
            ? otherRelationTypeTitle
            : relationTypeTitle}{' '}
        </div>
        <div className={s.btnContainer}>
          <span
            onClick={() => onEdit(id)}
            role="button"
            onKeyPress={() => onEdit(id)}
            tabIndex="0"
          >
            <p className={s.editBtn}>ویرایش</p>
          </span>
          <HandleAclPermission wich={Actions.leadRelationDelete}>
            <CPPopConfirm
              title="آیا مطمئنید که میخواهید این بخش را حذف کنید؟"
              cancelText="انصراف"
              okText="حذف"
              okType="danger"
              icon={null}
              onConfirm={() => onDelete(id)}
            >
              <span>
                <p className={s.deleteBtn}>حذف</p>
              </span>
            </CPPopConfirm>
          </HandleAclPermission>
        </div>
      </div>
    </div>
  );
}

ConnectionItem.defaultProps = {
  businessMode: false,
};

ConnectionItem.propTypes = {
  id: PropTypes.string.isRequired,
  businessName: PropTypes.string.isRequired,
  personName: PropTypes.string.isRequired,
  nationalCode: PropTypes.string.isRequired,
  businessNationalCode: PropTypes.string.isRequired,
  relationTypeTitle: PropTypes.string.isRequired,
  otherRelationTypeTitle: PropTypes.string.isRequired,
  businessMode: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withStyles(s)(ConnectionItem);
