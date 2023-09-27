import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './LeadForms.scss';
import CPRadio from '../../../components/CP/CPRadio';
import LeadSortSettingForm from '../../../components/LeadSortSettingForm/LeadSortSettingForm';
import { getLeadFormFieldsAction } from '../../../store/lead/lead.actions';
import CPLoading from '../../../components/CP/CPLoading';

const typeList = [
  {
    value: 'PERSON',
    name: 'حقیقی',
  },
  {
    value: 'BUSINESS',
    name: 'حقوقی',
  },
];

const LeadForms = props => {
  const { className, person, business, loading } = props;
  const [activeForm, setActiveForm] = useState('PERSON');

  useEffect(() => {
    props.getLeadFormFieldsAction('PERSON', true);
    props.getLeadFormFieldsAction('BUSINESS', true);
  }, []);

  const dataOrder = data =>
    data?.map((item, appearanceOrder) => ({
      ...item,
      appearanceOrder,
    }));

  const activeData = data =>
    dataOrder(data)?.filter(item => item.status === 'ACTIVE');

  const deActiveData = data =>
    dataOrder(data)?.filter(item => item.status === 'DEACTIVE');

  return (
    <div className={cs(s.leadForms, className)}>
      <Row type="flex" gutter={32}>
        <Col span={24}>
          <CPRadio
            className="margin-t-10 margin-b-10"
            model={typeList}
            size="small"
            value={activeForm}
            onChange={e => setActiveForm(e.target.value)}
          />
        </Col>
      </Row>
      <Row type="flex" gutter={15}>
        <Col span={24}>
          <CPLoading spinning={loading} delay={200}>
            {activeForm === 'PERSON' ? (
              <LeadSortSettingForm
                key={activeForm}
                actives={activeData(person)}
                deActives={deActiveData(person)}
                type={activeForm}
              />
            ) : (
              <LeadSortSettingForm
                key={activeForm}
                actives={activeData(business)}
                deActives={deActiveData(business)}
                type={activeForm}
              />
            )}
          </CPLoading>
        </Col>
      </Row>
    </div>
  );
};

LeadForms.propTypes = {
  className: PropTypes.string,
  person: PropTypes.array,
  business: PropTypes.array,
  loading: PropTypes.bool,
  getLeadFormFieldsAction: PropTypes.func.isRequired,
};

LeadForms.defaultProps = {
  className: null,
  person: null,
  business: null,
  loading: false,
};

const mapState = state => ({
  person: state.lead.person,
  business: state.lead.business,
  loading: state.lead.loading,
});

const mapDispatch = {
  getLeadFormFieldsAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(LeadForms));
export const LeadFormsTest = LeadForms;
