import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CertificateSerialNumber.scss';
import CPSelect from '../CP/CPSelect';
import CPInput from '../CP/CPInput';
import CPInputGroup from '../CP/CPInputGroup';
import {persianNumToEnglishNum} from "../../utils";

// character dropDown data
const characters = 'الف ب ل د ر 1 2 3 4 5 6 7 8 9 10 11'.split(' ');
const allowCharacters = Array.from(characters, val => ({
  text: val,
  value: val,
}));

class CertificateSerialNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateSerialNumber: '',
      number: '',
      character: 'الف',
    };
  }

  setSerialNumber = async value => {
    await this.setState({
      certificateSerialNumber: value,
    });
    return this.props.getSerialNumber(this.state.certificateSerialNumber);
  };

  setSeriesNumber = async (name, value) => {
    await this.setState({
      [name]: value,
    });
    return this.props.getSeriesNumber(
      `${this.state.character}/${this.state.number}`,
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.serialNumber !== prevProps.serialNumber && this.props.serialNumber ) {
      this.setSerialNumber(persianNumToEnglishNum(this.props.serialNumber))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.number !== prevState.number || this.props.seriesNumber !== prevProps.seriesNumber ) {
      this.setState({number: persianNumToEnglishNum(this.state.number)})
    }
  }



  render() {
    const { serialNumber, seriesNumber, disabled } = this.props;
    const { certificateSerialNumber, number, character } = this.state;
    const splitSeriesNumber = seriesNumber?.split('/');
    return (
      <div className={s.inputsGroup}>
        <CPInputGroup compact>
          <CPInput
            className={s.serialNumber}
            value={serialNumber || certificateSerialNumber}
            disabled={disabled}
            onChange={value => this.setSerialNumber(value.target.value)}
            maxLength={6}
          />
          <CPInput
            value={seriesNumber ? splitSeriesNumber[1] : number}
            disabled={disabled}
            className={s.number}
            name="number"
            onChange={value =>
              this.setSeriesNumber('number', value.target.value)
            }
            maxLength={2}
          />
          <CPSelect
            className={s.character}
            defaultValue={seriesNumber ? splitSeriesNumber[0] : character}
            dataSource={allowCharacters}
            disabled={disabled}
            name="character"
            onChange={value => this.setSeriesNumber('character', value)}
          />
        </CPInputGroup>
        {isNaN(serialNumber) || isNaN(number) ? <div>شماره سریال و سری شناسنامه باید شامل عدد باشند.</div> : null}
      </div>
    );
  }
}

CertificateSerialNumber.propTypes = {
  serialNumber: PropTypes.string,
  seriesNumber: PropTypes.string,
  disabled: PropTypes.bool,
  getSerialNumber: PropTypes.func.isRequired,
  getSeriesNumber: PropTypes.func.isRequired,
};

CertificateSerialNumber.defaultProps = {
  serialNumber: null,
  seriesNumber: null,
  disabled: false,
};

export default withStyles(s)(CertificateSerialNumber);
export const CertificateSerialNumberTest = CertificateSerialNumber;
