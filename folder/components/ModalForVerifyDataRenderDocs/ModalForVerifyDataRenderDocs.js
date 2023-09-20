/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import cs from 'classnames';
import { Collapse } from 'antd';
import s from './ModalForVerifyDataRenderDocs.scss';
import LazyImage from '../LazyImage';
import { getProvinceName, getCityName } from '../../utils';
import CPLabel from '../CP/CPLabel';

const { Panel } = Collapse; // todo

class ModalForVerifyDataRenderDocs extends React.Component {
  /**
   * A method to render the image documents
   * @param document
   */
  renderDocument = document => {
    if (!document?.files) {
      return <p>سندی یافت نشد</p>;
    }
    // if you want filter for display some pic extension add this code for after line #29 item?.path.includes('jpg') || item?.path.includes('png') ?
    return (
      <div className={s.docsCardWrapper}>
        {document?.files?.map(item => (
          <LazyImage
            key={item?.path}
            path={item?.path}
            objectToken={item}
            className={s.download}
            onClick={objectURL => {
              this.props.handleChange('preview', objectURL, item);
            }}
          />
        ))}
      </div>
    );
  };

  /**
   * A method to render the address documents
   * @param array
   */
  renderContacts = array =>
    array?.map((item, index) => {
      const { postalCode, street, tel, type, city, state } = item;
      const State =
        state !== 0 && state !== null ? getProvinceName(state) : '---';
      const City = city !== 0 && city !== null ? getCityName(city) : '---';
      const model = {
        LIVING: 'آدرس منزل:',
        OTHER: 'آدرس دیگر:',
        BUSINESS: 'آدرس کسب و کار:',
        WORK: 'آدرس محل کار:',
      };

      return (
        <CPLabel
          key={index}
          className={s.address}
          label={model[type]}
          position="right"
        >
          <div>
            <p className={s.street}>{`${State} - ${City} - ${street}`}</p>
            <p>
              {postalCode && postalCode !== 'null' && (
                <span className={s.part}>{`کد پستی: ${postalCode}`}</span>
              )}
              {tel && tel !== 'null' && (
                <span className={s.part}>{` شماره تماس: ${tel}`}</span>
              )}
            </p>
          </div>
        </CPLabel>
      );
    });

  /**
   * Render collapse panel for each document
   * @param text: the Persian label shown in input field
   * @param name: the name of field used to change it
   * @param val: the value of input used to show
   * @param doc: how to render doc
   * @param key: the key
   */
  renderPanel = ({ text, doc }, key) => (
    <Panel
      key={key}
      header={
        <div className={s.panelHeader}>
          <span>{text}</span>
        </div>
      }
    >
      {doc}
    </Panel>
  );

  render() {
    const {
      documents,
      preview,
      className,
      identificationWithDocs,
      isBusiness,
    } = this.props;
    const {
      BIRTH_CERTIFICATE,
      NATIONAL_CARD_FRONT,
      NATIONAL_CARD_BACK,
      EDUCATION,
      BIRTH_CERTIFICATE_DESCRIPTION,
      LOGO,
      BUSINESS_LICENSE,
      OWNERSHIP,
      CV,
    } = documents;

    const businessDocsData = [
      {
        text: 'لوگوی شرکت',
        doc: this.renderDocument(LOGO),
      },
      {
        text: 'جواز کسب',
        doc: this.renderDocument(BUSINESS_LICENSE),
      },
      {
        text: 'رزومه',
        doc: this.renderDocument(CV),
      },
      {
        text: 'سند مالکیت',
        doc: this.renderDocument(OWNERSHIP),
      },
      {
        text: 'آدرس شرکت',
        doc: this.renderContacts(identificationWithDocs?.businessContacts),
      },
    ];

    const personalDocsData = [
      {
        text: 'آدرس',
        doc: this.renderContacts(identificationWithDocs?.personContacts),
      },
      {
        text: 'تصویر روی کارت ملی',
        doc: this.renderDocument(NATIONAL_CARD_FRONT),
      },
      {
        text: 'تصویر پشت کارت ملی',
        doc: this.renderDocument(NATIONAL_CARD_BACK),
      },
      {
        text: 'تصویر شناسنامه',
        doc: this.renderDocument(BIRTH_CERTIFICATE),
      },
    ];
    if (CV) {
      personalDocsData.push({
        text: 'رزومه',
        doc: this.renderDocument(CV),
      });
    }

    if (BIRTH_CERTIFICATE_DESCRIPTION) {
      personalDocsData.push({
        text: 'توضیحات شناسنامه',
        doc: this.renderDocument(BIRTH_CERTIFICATE_DESCRIPTION),
      });
    }

    if (EDUCATION) {
      personalDocsData.push({
        text: 'توضیحات شناسنامه',
        doc: this.renderDocument(EDUCATION),
      });
    }

    // const title = isBusiness ? 'مدارک شرکتی' : 'مدارک شخصی';
    const docsData = isBusiness ? businessDocsData : personalDocsData;

    return (
      <div>
        {/* <div className={s.address}>{title}</div> */}
        <Collapse
          className={cs(s.root, className, preview && s.hidden)}
          defaultActiveKey={['0', '1', '2', '3', '4']}
        >
          {docsData.map((item, key) => this.renderPanel(item, key))}
        </Collapse>
      </div>
    );
  }
}

ModalForVerifyDataRenderDocs.propTypes = {
  className: PropTypes.string,
  documents: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  preview: PropTypes.string,
  identificationWithDocs: PropTypes.object,
  isBusiness: PropTypes.bool,
};

ModalForVerifyDataRenderDocs.defaultProps = {
  className: '',
  documents: null,
  preview: null,
  identificationWithDocs: null,
  isBusiness: false,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  documentToken: state.documentToken.documentTokenByLevantIdData,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForVerifyDataRenderDocs));
export const ModalForVerifyDataRenderDocsTest = ModalForVerifyDataRenderDocs;
