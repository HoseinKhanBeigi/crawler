import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './BussinessInfoDocs.scss';
import LazyImage from '../../../../../LazyImage/LazyImage';
import PreviewImage from '../../../../../PreviewImage/PreviewImage';
import ApproveButton from '../../../../../ApproveButton/ApproveButton';
import LazyFile from '../../../../../LazyFile/LazyFile';

class BussinessInfoDocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: null,
    };
  }

  // close image preview
  closePreview = () => {
    this.setState({
      preview: null,
    });
  };

  /**
   * render documents card
   * @param cards (array): [text, name, val, doc]
   */
  renderCard = cards => {
    const {
      identification,
      identificationWithDocs: { rejectedByQC },
    } = this.props;
    return cards?.map(item => {
      const { text, name, val, doc } = item;
      const primaryValue = identification[name];

      return (
        <div className={s.card} key={item.name}>
          <div className={s.header}>{text}</div>
          <div className={s.body}>{doc}</div>
          <div className={s.footer}>
            <ApproveButton
              handleChange={this.props.handleChange}
              primaryValue={primaryValue}
              value={val}
              item={name}
              rejectedByQC={rejectedByQC}
            />
          </div>
        </div>
      );
    });
  };

  /**
   * A method to render the image documents
   * @param document
   */
  renderDocument = document => {
    if (!document?.files) {
      return <p>سندی یافت نشد</p>;
    }
    return (
      <div className={s.docsCardWrapper}>
        {document?.files?.map(item => {
          const extension = item?.path.split('.').pop();
          if (extension === 'jpg' || extension === 'png') {
            return (
              <LazyImage
                key={item?.path}
                path={item?.path}
                objectToken={{ token: item?.token }}
                className={s.download}
                onClick={objectURL => {
                  this.setState({
                    preview: objectURL,
                  });
                }}
              />
            );
          } else if (extension === 'pdf') {
            return (
              <LazyFile icon="file-pdf" path={item?.path} token={item?.token} />
            );
          }
          return null;
        })}
      </div>
    );
  };

  render() {
    const { stateData, identificationWithDocs } = this.props;
    const { preview } = this.state;
    const { logoStatus, licenseStatus, ownershipStatus } = stateData;
    const { businessDocumentDTOS = [] } = identificationWithDocs;
    const documents = {};
    businessDocumentDTOS.forEach(item => {
      documents[item.type] = item;
    });

    const { LOGO, BUSINESS_LICENSE, OWNERSHIP } = documents;

    const businessDocsData = [
      {
        text: 'لوگوی شرکت',
        name: 'logoStatus',
        val: logoStatus,
        doc: this.renderDocument(LOGO),
      },
      {
        text: 'جواز کسب',
        name: 'licenseStatus',
        val: licenseStatus,
        doc: this.renderDocument(BUSINESS_LICENSE),
      },
      {
        text: 'اجاره‌نامه / سند مالکیت',
        name: 'ownershipStatus',
        val: ownershipStatus,
        doc: this.renderDocument(OWNERSHIP),
      },
    ];

    return (
      <div className={s.root}>
        <div className={s.docsHeader}>
          <span>مدارک کسب و کار</span>
        </div>
        <div className={preview && s.hidden}>
          {this.renderCard(businessDocsData)}
        </div>
        <PreviewImage closePreview={this.closePreview} preview={preview} />
      </div>
    );
  }
}

BussinessInfoDocs.propTypes = {
  handleChange: PropTypes.func.isRequired,
  stateData: PropTypes.object.isRequired,
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
};

BussinessInfoDocs.defaultProps = {
  identificationWithDocs: {},
  identification: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
  documentToken: state.documentToken.data,
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(BussinessInfoDocs));
export const ModalForCheckIdentificationTabBusinessProfileDocsTest = BussinessInfoDocs;
