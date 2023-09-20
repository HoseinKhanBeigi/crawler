import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../BankInfoFields.scss';
import { getOpportunitiesAction } from '../../../../../../../store/opportunities/opportunities.actions';
import CPDivider from '../../../../../../CP/CPDivider/CPDivider';
import opportunityService from '../../../../../../../service/opportunityService';
import { getProvinceName } from '../../../../../../../utils';
import CPLabel from '../../../../../../CP/CPLabel/CPLabel';
import CPInput from '../../../../../../CP/CPInput/CPInput';
import CPSelect from '../../../../../../CP/CPSelect/CPSelect';
import { getProvinceWithCities } from '../../../../../../../utils/getProvinceWithCities';
import { getBanksList } from '../../../../../../../utils/getBanksList';
import BankAccountDetail from './BankAccountDetail';

export const types = {
  LONGTERM: 'بلند مدت',
  SHORTTERM: 'کوتاه مدت',
  CURRENT: 'قرض الحسنه جاری',
  SAVING: 'قرض الحسنه پس انداز',
};

const TYPES2 = [
  {
    value: 'SHORTTERM',
    text: 'کوتاه مدت',
  },
  {
    value: 'SAVING',
    text: 'قرض الحسنه',
  },
  {
    value: 'CURRENT',
    text: 'جاری',
  },
  {
    value: 'LONGTERM',
    text: 'بلند مدت',
  },
];



const RenderFields = props => {
  const {
    item,
    accountDetailIban: defaultAccountDetailIban,
    accountOwner,
    levantId,
    opportunityId,
  } = props;
  const [cities, setCities] = useState(null);
  const [banksList, setBanksList] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(item);
  const [provinces, setProvinces] = useState(null);
  const [citiesEditMode, setCitiesEditMode] = useState(false);
  const [accountDetailIban, setAccountDetailIban] = useState(null);
  const {
    iban,
    accountNumber,
    branchName,
    branchCode,
    branchProvince,
    branchCity,
    bankId,
    accountType,
    id: bankAccountId,
  } = currentAccount;
  const provinceName = getProvinceName(branchProvince);

  useEffect(() => {
    setCurrentAccount(item);
    setAccountDetailIban(defaultAccountDetailIban);
  }, [currentAccount]);

  useEffect(() => {
    getProvinceWithCities().then(data => {
      const convertedCities = data?.cities?.map(c => ({
        value: c.id,
        text: c.name,
        province_id: c.province_id,
      }));
      const convertedProvinces = data?.provinces?.map(p => ({
        value: p.id,
        text: p.name,
      }));
      // const candidateCitites = convertedCities.filter(
      //   c => c.province_id === Number(currentContact[0].state, 10),
      // );
      setCities(convertedCities);
      setProvinces(convertedProvinces);
    });
    getBanksList().then(response => {
      const b = response?.map(c => ({
        value: c.id,
        text: c.name,
      }));
      setBanksList(b);
    });
  }, []);

  const reload = () => {
    props.getOpportunitiesAction();
  };

  const handleOnProvinceSelected = v => {
    const list = [...cities];
    const candidate = list?.filter(c => c.province_id === v);
    setCities(candidate);
  };

  const onUpdateAccountNumber = (value, id) => {
    const candidateAccountDetail = accountDetailIban;
    candidateAccountDetail.map(account => {
      const obj = account;
      if (account.id === id) {
        obj.accountNumber = value;
      }
      return obj;
    });
    setCurrentAccount(candidateAccountDetail);
  };

  const onEditAction = async (value, name) => {
    const newName = name.toString();
    const body = {
      bankAccounts: [
        {
          iban,
          id: bankAccountId,
          [newName]: value,
        },
      ],
    };
    await opportunityService.editIdentificationInfo(
      levantId,
      opportunityId,
      body,
    );
    reload();
    setCitiesEditMode(true);
  };

  const onBankNameEdit = async (value, name) => {
    const newName = name.toString();
    const body = {
      bankAccounts: [
        {
          [newName]: value,
          id: bankAccountId,
          iban,
        },
      ],
    };
    await opportunityService.editIdentificationInfo(
      levantId,
      opportunityId,
      body,
    );
    reload();
  };

  const renderField = (
    text,
    name,
    val = '',
    col = 8,
    disabled = true,
    withEdit = false,
  ) => (
    <Col className={s.input} span={col}>
      <CPLabel label={text}>
        <CPInput
          name={name}
          value={val}
          disabled={disabled}
          withEdit={withEdit}
          onEditAction={onEditAction}
        />
      </CPLabel>
    </Col>
  );

  const renderBankNameField = () => (
    <Col span={8} className={s.address_item_mBottom}>
      <CPLabel label="نام بانک">
        <CPSelect
          dataSource={banksList}
          showSearch
          name="bankId"
          defaultValue={bankId}
          onEdit={onBankNameEdit}
          disabled
          withEdit
        />
      </CPLabel>
    </Col>
  );
  const renderCitiesAndProvinces = (state, city) => (
    <>
      <Col span={8} className={s.address_item_mBottom}>
        <CPLabel label="استان">
          <CPSelect
            dataSource={provinces}
            showSearch
            name="branchProvince"
            defaultValue={Number(state)}
            onChange={handleOnProvinceSelected}
            disabled
            onEdit={onEditAction}
            withEdit
          />
        </CPLabel>
      </Col>
      <Col span={8} className={s.address_item_mBottom}>
        <CPLabel label="شهر">
          <CPSelect
            dataSource={cities}
            showSearch
            name="branchCity"
            defaultValue={Number(city)}
            disabled
            onEdit={onEditAction}
            withEdit
            editMode={citiesEditMode}
          />
        </CPLabel>
      </Col>
    </>
  );

  return (
    <Row key={iban} type="flex" gutter={15} className={s.bankInfoRow}>
      {accountNumber &&
        renderField(
          'شماره حساب',
          'accountNumber',
          accountNumber,
          8,
          false,
          true,
        )}
      {iban && renderField('شماره شبا', 'iban', iban, 8, false, true)}
      {iban && renderBankNameField()}
      {branchName &&
        renderField('نام شعبه', 'branchName', branchName, 8, false, true)}
      {branchCode &&
        renderField('کد شعبه', 'branchCode', branchCode, 8, false, true)}
      {accountType && (
        <CPLabel label="نوع حساب">
          <CPSelect
            dataSource={TYPES2}
            showSearch
            name="accountType"
            defaultValue={accountType}
            onEdit={onEditAction}
            withEdit
          />
        </CPLabel>
      )}
      {provinceName &&
        cities &&
        provinces &&
        renderCitiesAndProvinces(branchProvince, branchCity)}
      <BankAccountDetail
        onChangeAccountNumber={onUpdateAccountNumber}
        iban={iban}
        bankAccountId={bankAccountId}
        accountNumber={accountNumber}
        accountOwner={accountOwner}
      />
      <CPDivider />
    </Row>
  );
};
RenderFields.propTypes = {
  item: PropTypes.object,
  accountDetailIban: PropTypes.array,
  accountOwner: PropTypes.string,
  levantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  opportunityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getOpportunitiesAction: PropTypes.func.isRequired,
};
RenderFields.defaultProps = {
  item: {},
  accountDetailIban: [],
  accountOwner: '',
  levantId: '',
  opportunityId: '',
};

const mapDispatch = {
  getOpportunitiesAction,
};
export default connect(null, mapDispatch)(withStyles(s)(RenderFields));
