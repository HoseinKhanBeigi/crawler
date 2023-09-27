import { Actions } from '../../../utils/aclActions';
import Iban from '../components/tools/Iban';
import PostalCode from '../components/tools/PostalCode';
import Sejam from '../components/tools/Sejam';
import Shahcar from '../components/tools/Shahcar';
import IdentifyInquiryWithImage from '../components/tools/IdentifyInquiryWithImage';
import IdentifyInquiryWithOutImage from '../components/tools/IdentifyInquiryWithOutImage';
import CardNumberToIban from '../components/tools/CardNumberToIban';
import ChangeNeshanStatus from '../components/tools/ChangeNeshanStatus';
import InquiryStakeholderInfoTool from '../components/tools/InquiryStakeholderInfoTool';
import InquiryBusinessInfoTool from '../components/tools/InquiryBusinessInfoTool';
import NationalCardOcrTool from '../components/tools/NationalCardOcrTool';
import BankCreditCardOcrTool from '../components/tools/BankCreditCardOcrTool';
import LegalValidationTool from '../components/tools/LegalValidationTool';
import SamatValidationTool from '../components/tools/SamatValidationTools';
import SamatIlegalValidationTools from '../components/tools/SamatIlegalValidationTools';
import RefetchSejam from '../components/tools/RefetchSejam';
import ChequeQrOcr from '../components/tools/ChequeQrOcr';

const toolsList = [
  {
    text: 'استعلام حساب',
    value: 'iban',
    authority: Actions.toolsAccountInquiryIban,
    component: Iban,
  },
  {
    text: 'استعلام شبا',
    value: 'cardNumberToIban',
    authority: Actions.toolsCardNumberToIban,
    component: CardNumberToIban,
  },
  {
    text: 'تغییر وضعیت نشان',
    value: 'changeNeshanStatus',
    authority: Actions.toolsChangeNeshanUserStatus,
    component: ChangeNeshanStatus,
  },
  {
    text: 'استعلام وضعیت سجام',
    value: 'sejam',
    authority: Actions.toolsSejamInquiryRead,
    component: Sejam,
  },
  {
    text: 'استعلام کد پستی',
    value: 'postalCode',
    authority: Actions.toolsPostAddressStringRead,
    component: PostalCode,
  },
  {
    text: 'استعلام شاهکار',
    value: 'shahcar',
    authority: Actions.toolsPostAddressStringRead,
    component: Shahcar,
  },
  {
    text: 'استعلام ثبت احوال بدون تصویر',
    value: 'identifyInquiryWithOutImage',
    authority: Actions.toolsSitadInquiryRead,
    component: IdentifyInquiryWithOutImage,
  },
  {
    text: 'استعلام ثبت احوال با تصویر',
    value: 'identifyInquiryWithImage',
    authority: Actions.toolsSitaadInfoAndImageRead,
    component: IdentifyInquiryWithImage,
  },
  {
    text: 'استعلام ذینفعان شرکت',
    value: 'inquiryStakeholderInfoTool',
    authority: Actions.rasmioCompanyInfoInquiry,
    component: InquiryStakeholderInfoTool,
  },
  {
    text: 'استعلام اطلاعات حقوقی شرکت',
    value: 'inquiryBusinessInfoTool',
    authority: Actions.rasmioCompanyInfoInquiry,
    component: InquiryBusinessInfoTool,
  },
  {
    text: 'اعتبار سنجی حقوقی',
    value: 'legalValidationTool',
    authority: Actions.toolsBankCreditCardOcr,
    component: LegalValidationTool,
  },
  {
    text: 'نویسه خوان کارت ملی',
    value: 'nationalCardOcr',
    authority: Actions.toolsNationalCardOcr,
    component: NationalCardOcrTool,
  },
  {
    text: 'نویسه خوان کارت بانکی',
    value: 'bankCreditCardOcr',
    authority: Actions.toolsBankCreditCardOcr,
    component: BankCreditCardOcrTool,
  },
  {
    text: 'نویسه خوان چک صیاد',
    value: 'chequeQrOcr',
    authority: Actions.roleChequeQrRead,
    component: ChequeQrOcr,
  },
  {
    text: 'اعتبارسنجی سمات - حقوقی',
    value: 'samatValidationTool',
    authority: Actions.toolsLegalScoreCredit,
    component: SamatValidationTool,
  },
  {
    text: 'اعتبارسنجی سمات - حقیقی',
    value: 'samatIlegalValidationTool',
    authority: Actions.toolsPersonScoreCredit,
    component: SamatIlegalValidationTools,
  },
  {
    text: 'به روزرسانی اطلاعات کاربر از طریق سجام',
    value: 'refetchSejamTool',
    authority: Actions.toolsSejamRefetchUpdate,
    component: RefetchSejam,
  },
];

export default toolsList;
