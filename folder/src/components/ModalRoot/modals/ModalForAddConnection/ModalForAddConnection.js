import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_ADD_CONNECTION } from '../../repository';
import CPSearchFilter from '../../../CP/CPSearchFilter';
import CPSelect from '../../../CP/CPSelect';
import CPInput from '../../../CP/CPInput';
import CPButton from '../../../CP/CPButton';
import {
  postNewRelationForAPersonAction,
  postBusinessRelationAction,
} from '../../../../store/leads/leads.actions';
import s from './ModalForAddConnection.scss';

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

const ModalForAddConnection = props => {
  const { relationId, businessMode } = props;
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState('');
  const [realationType, setRelationType] = useState(new Map([]));
  const [searchResult, setSearchResult] = useState({});
  const [role, setRole] = useState('');

  const closeModal = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    if (businessMode) {
      const body = {
        businessLevantId: relationId,
        personLevantId: searchResult.levantId,
        relationType: selected,
        otherRelationTypeTitle: selected === 'OTHER' ? role : null,
      };
      props.postBusinessRelationAction(body);
    } else {
      const body = {
        businessLevantId: searchResult.levantId,
        personLevantId: relationId,
        relationType: selected,
        otherRelationTypeTitle: selected === 'OTHER' ? role : null,
      };
      props.postNewRelationForAPersonAction(body);
    }
    closeModal();
  };

  useEffect(() => {
    setRelationType(new Map(relationTypeList.map(t => [t.value, t])));
  }, []);

  const selectedRole = realationType.get(selected);
  return (
    <CPModal
      title="افزودن ارتباط جدید"
      visible={visible}
      footer={false}
      width={550}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_CONNECTION}
      hideModalAction={closeModal}
    >
      <div className={s.container}>
        <div className={s.search}>
          <CPSearchFilter
            withSearchButton={false}
            onClickItem={setSearchResult}
            className={s.searchInput}
            newRelationSearchInput
            partyType={businessMode ? 'PERSON' : 'BUSINESS'}
          />
        </div>
        <div className={s.searchContainer}>
          <CPSelect
            defaultValue={selected}
            dataSource={[...realationType.values()]}
            onChange={setSelected}
            placeholder="عنوان نقش را انتخاب کنید."
            className={s.selector}
          />
          {selectedRole?.value === 'OTHER' && (
            <div>
              <CPInput
                className={s.relationInput}
                placeholder="عنوان نقش"
                value={role}
                onChange={e => setRole(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <div className={s.submit}>
        <CPButton type="primary" onClick={handleSubmit}>
          تایید
        </CPButton>
      </div>
    </CPModal>
  );
};

ModalForAddConnection.propTypes = {
  postNewRelationForAPersonAction: PropTypes.func.isRequired,
  postBusinessRelationAction: PropTypes.func.isRequired,
  relationId: PropTypes.number.isRequired,
  businessMode: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ leads }) => ({
  leadData: leads.postNewRelationForAPersonData,
});

const mapDispatch = {
  postNewRelationForAPersonAction,
  postBusinessRelationAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForAddConnection));
