import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './CollateralInfoDocs.scss';
import LazyImage from '../../../../../LazyImage/LazyImage';
import PreviewImage from '../../../../../PreviewImage/PreviewImage';
import ApproveButton from '../../../../../ApproveButton/ApproveButton';

class CollateralInfoDocs extends React.Component {
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

  renderCard = cards => {
    const {
      identification,
      identificationWithDocs: { rejectedByQC },
    } = this.props;
    return cards?.map(item => {
      const { text, name, val, doc } = item;
      if (!val) {
        return false; // do not render any doc that they dont have any status.
      }
      const primaryValue = identification[name];

      return (
        <div className={s.card}>
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
        {document?.files?.map(item => (
          <LazyImage
            key={item?.path}
            path={item?.path}
            objectToken={item}
            className={s.download}
            onClick={objectURL => {
              this.setState({
                preview: objectURL,
              });
            }}
          />
        ))}
      </div>
    );
  };

  render() {
    const { stateData, identificationWithDocs } = this.props;
    const documentToken = identificationWithDocs?.collateralDocumentDTOS || [];
    const { preview } = this.state;
    const { accountTurnoverStatus, chequeStatus, payrollStatus } = stateData;

    const documents = {};
    documentToken.forEach(item => {
      documents[item.type] = item;
    });

    const { ACCOUNT_TURNOVER, CHEQUE, PAYROLL } = documents;

    const collateralDocsData = [
      {
        text: 'گردش حساب',
        name: 'accountTurnoverStatus',
        val: accountTurnoverStatus,
        doc: this.renderDocument(ACCOUNT_TURNOVER),
      },
      {
        text: 'چک',
        name: 'chequeStatus',
        val: chequeStatus,
        doc: this.renderDocument(CHEQUE),
      },
      {
        text: 'فیش حقوقی',
        name: 'payrollStatus',
        val: payrollStatus,
        doc: this.renderDocument(PAYROLL),
      },
    ];

    return (
      <div className={s.root}>
        <div className={s.docsHeader}>
          <span>مدارک اعتبار</span>
        </div>
        <div className={preview && s.hidden}>
          {this.renderCard(collateralDocsData)}
        </div>
        <PreviewImage closePreview={this.closePreview} preview={preview} />
      </div>
    );
  }
}

CollateralInfoDocs.propTypes = {
  handleChange: PropTypes.func.isRequired,
  stateData: PropTypes.object.isRequired,
  identification: PropTypes.object,
  identificationWithDocs: PropTypes.object,
};

CollateralInfoDocs.defaultProps = {
  identification: null,
  identificationWithDocs: {},
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(CollateralInfoDocs));
