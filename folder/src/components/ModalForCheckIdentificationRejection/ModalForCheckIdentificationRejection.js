import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForCheckIdentificationRejection.scss';
import CPCheckbox from '../CP/CPCheckbox';
import { rejectionDescription } from '../ModalForCheckIdentification/schema';
import CPTextArea from '../CP/CPTextArea';
import CPAlert from '../CP/CPAlert';

class ModalForCheckIdentificationRejection extends React.Component {
  isVisible = () => {
    const { stateData } = this.props;
    const arrayOfValues = Object.values(stateData);
    return arrayOfValues.includes('REJECTED');
  };

  handleRender = visible => {
    const { stateData } = this.props;
    const { rejectDesc, rejectTypes } = stateData;
    if (!visible) {
      return (
        <CPAlert
          type="info"
          message="بدون رد درخواست"
          description="تاکنون هیچ موردی از سوی شما رد نشده است"
        />
      );
    }
    return (
      <React.Fragment>
        <CPCheckbox
          options={rejectionDescription}
          value={rejectTypes}
          onChange={value => {
            this.props.handleChange('rejectTypes', value);
          }}
        />
        <div className={s.spacer} />
        <CPTextArea
          onChange={e => this.props.handleChange('rejectDesc', e.target.value)}
          autosize={{ minRows: 3, maxRows: 30 }}
          placeholder="توضیحات تکمیلی رد درخواست"
          value={rejectDesc}
        />
      </React.Fragment>
    );
  };

  render() {
    const visible = this.isVisible();

    return (
      <div className={s.root}>
        <div className={s.docsHeader}>
          <span>توضیحات رد درخواست</span>
        </div>
        <div className={s.wrapper}>{this.handleRender(visible)}</div>
      </div>
    );
  }
}

ModalForCheckIdentificationRejection.propTypes = {
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(s)(ModalForCheckIdentificationRejection);
export const ModalForCheckIdentificationRejectionTest = ModalForCheckIdentificationRejection;
