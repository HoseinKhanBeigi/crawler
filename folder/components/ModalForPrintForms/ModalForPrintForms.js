import React from 'react';
import { Icon } from 'antd';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForPrintForms.scss';
import CPModal from '../CP/CPModal';
import { getProductFormsAction } from '../../store/product/product.actions';
import CPButton from '../CP/CPButton';
import CPDivider from '../CP/CPDivider';
import { selectProductAction } from '../../store/getProducts/getProducts.actions';
import CPMessage from '../CP/CPMessage';
import CPSelect from '../CP/CPSelect';
import CPEmpty from '../CP/CPEmpty';
import {
  anyModalClose,
  getOpportunitiesAction,
  putDoActionAction,
} from '../../store/opportunities/opportunities.actions';
import formsService from '../../service/formsService';
import documentService from '../../service/documentService';

class ModalForPrintForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: props.selectedProduct,
      submitLoading: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.hasProductList) {
      return {
        selectedProduct: nextProps.selectedProduct,
      };
    }

    return null;
  }

  changeProduct = async e => {
    const { hasProductList, userInfo, currentUser } = this.props;
    const levantId = hasProductList ? userInfo.levantId : currentUser.levantId;
    await this.setState({
      selectedProduct: e,
    });

    await this.props.getProductFormsAction({
      product: e,
      levantId,
    });
  };

  closeModal = () => {
    this.props.anyModalClose();
  };

  availableProducts = () =>
    this.props.products.map(item => ({
      text: item.title,
      value: item.code,
    }));

  printForm = async (e, formId, formName) => {
    if (e) {
      e.stopPropagation();
    }
    const { hasProductList, userInfo, currentUser } = this.props;
    const userData = hasProductList ? userInfo : currentUser;

    const fileName = `${formName}-${userData.firstName}-${userData.lastName}-${userData.levantId}.pdf`;

    await formsService.downloadForm(formId, userData.levantId, fileName);
    this.props.getProductFormsAction({
      product: this.state.selectedProduct,
      levantId: userData.levantId,
    });
    await documentService.insertPrintActivity(
      formName,
      'pdf',
      userData.levantId,
    );
  };

  doAction = async e => {
    if (e) {
      e.stopPropagation();
    }
    const { hasProductList, userInfo, currentUser } = this.props;
    const levantId = hasProductList ? userInfo.levantId : currentUser.levantId;
    this.setState({ submitLoading: true });
    const response = await this.props.putDoActionAction({
      levantId,
      command: 'PRINT_FORM',
      productCode: this.state.selectedProduct,
    });
    if (response) {
      this.setState({ submitLoading: false });
      CPMessage('با موفقیت ثبت شد.', 'success');
      this.props.anyModalClose();
      await this.props.getOpportunitiesAction();
    } else {
      CPMessage('دوباره تلاش کنید.', 'error');
    }
  };

  renderModalContent = data => {
    if (data?.length > 0) {
      return data?.map((item, index) => (
        <div className="row margin-b-5" key={item.id}>
          <div className="col-md-6">
            <b>{index + 1} . </b>
            {item.title}
            {item.required ? <b className="required">*</b> : undefined}
          </div>
          <div className="col-md-6 text-left">
            <div className={s.sign}>
              {item.signed ? 'امضاء شده' : 'امضاء نشده'}
            </div>
            <CPButton
              className="printBtn"
              type="primary"
              onClick={e => {
                this.printForm(e, item.id, item.title);
              }}
            >
              <Icon type={item.printed ? 'check' : 'download'} />
              {item.printed ? 'چاپ مجدد' : 'چاپ فرم'}
            </CPButton>
          </div>
        </div>
      ));
    }
    return <CPEmpty description="سندی موجود نیست!" />;
  };

  renderSubmit = data => {
    const notPrinted = data?.filter(item => item.printed === false);
    return (
      <div className="row">
        <div className="col-md-12 text-left">
          <CPButton
            disabled={notPrinted?.length > 0 && this.state.submitLoading}
            onClick={e => {
              this.doAction(e);
            }}
            type="primary"
          >
            ثبت
          </CPButton>
        </div>
      </div>
    );
  };

  render() {
    const { className, visible, data, hasProductList } = this.props;
    return (
      <div className={cs('ModalForPrintForms', className)}>
        <CPModal
          title="چاپ فرم"
          footer={false}
          visible={visible}
          onCancel={this.closeModal}
        >
          {hasProductList && (
            <div className="margin-b-10 row">
              <div className="col-md-12">
                <p className={s.toolbarTitle}>انتخاب محصول :</p>
                <CPSelect
                  className={s.select}
                  value={this.state.selectedProduct}
                  dataSource={this.availableProducts()}
                  onChange={e => {
                    this.changeProduct(e);
                  }}
                />
              </div>
            </div>
          )}
          {data?.length > 0 ? (
            this.renderModalContent(data)
          ) : (
            <CPEmpty description="سندی موجود نیست!" />
          )}
          <CPDivider />
          {!hasProductList && this.renderSubmit(data)}
        </CPModal>
      </div>
    );
  }
}

ModalForPrintForms.propTypes = {
  anyModalClose: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  getProductFormsAction: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  userInfo: PropTypes.object,
  putDoActionAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  hasProductList: PropTypes.bool,
  products: PropTypes.array,
  selectedProduct: PropTypes.string.isRequired,
};

ModalForPrintForms.defaultProps = {
  data: null,
  className: null,
  hasProductList: false,
  products: null,
  userInfo: null,
  currentUser: null,
};

const mapStateToProps = state => ({
  data: state.product.data,
  products: state.getProducts.data,
  selectedProduct: state.getProducts.selected,
  visible: state.opportunities.anyModalVisible === 'modalForPrintForms',
  currentUser: state.opportunities.currentUser,
});

const mapDispatch = {
  putDoActionAction,
  getProductFormsAction,
  getOpportunitiesAction,
  anyModalClose,
  selectProductAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForPrintForms));
export const ModalForPrintFormsTest = ModalForPrintForms;
