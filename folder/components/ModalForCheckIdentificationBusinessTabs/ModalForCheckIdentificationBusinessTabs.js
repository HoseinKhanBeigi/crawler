import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './ModalForCheckIdentificationBusinessTabs.scss';
import CPTab from '../CP/CPTab';
import BussinessInfoTab from '../ModalForCheckIdentificationTabs/Components/BussinessInfoTab';
import ContactInfoTab from '../ModalForCheckIdentificationTabs/Components/ContactInfoTab';
import ModalForCheckIdentificationRejection from '../ModalForCheckIdentificationRejection';
import ModalForCheckIdentificationSubmit from '../ModalForCheckIdentificationSubmit';

class ModalForCheckIdentificationBusinessTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getPropsToState(props);
  }

  getPropsToState = props => {
    const {
      rejectDesc,
      businessContactStatus,
      businessInfoStatus,
      logoStatus,
      licenseStatus,
      ownershipStatus,
    } = props.identification || {};

    const rejectTypes = props?.identification?.rejectTypes || [];

    return {
      stateData: {
        rejectDesc,
        rejectTypes,
        // business data
        businessContactStatus,
        businessInfoStatus,
        logoStatus,
        licenseStatus,
        ownershipStatus,
      },
    };
  };

  handleChange = (key, value) => {
    const { stateData } = this.state;
    this.setState({ stateData: { ...stateData, [key]: value } });
  };

  renderTabs = () => {
    const { stateData } = this.state;
    const tabs = [
      {
        key: '1',
        tab: 'اطلاعات کسب و کار',
        children: (
          <BussinessInfoTab
            stateData={stateData}
            handleChange={this.handleChange}
          />
        ),
      },
      {
        key: '2',
        tab: 'مشخصات تماس',
        children: (
          <ContactInfoTab
            stateData={stateData}
            handleChange={this.handleChange}
            justBusiness
          />
        ),
      },
    ];

    return tabs;
  };

  render() {
    const { className } = this.props;
    const { stateData } = this.state;
    return (
      <div className={cs('modalForCheckIdentificationBusinessTabs', className)}>
        <CPTab defaultKey="1" position="right" tabPane={this.renderTabs()} />
        <ModalForCheckIdentificationRejection
          stateData={stateData}
          handleChange={this.handleChange}
        />
        <ModalForCheckIdentificationSubmit
          stateData={stateData}
          handleChange={this.handleChange}
          justBusiness
        />
      </div>
    );
  }
}

ModalForCheckIdentificationBusinessTabs.propTypes = {
  className: PropTypes.string,
};

ModalForCheckIdentificationBusinessTabs.defaultProps = {
  className: null,
};

const mapState = state => ({
  identification: state.opportunities.identificationData,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForCheckIdentificationBusinessTabs));
export const ModalForCheckIdentificationBusinessTabsTest = ModalForCheckIdentificationBusinessTabs;
