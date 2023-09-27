import { Modal } from 'antd';
import CPMessage from '../components/CP/CPMessage';
import { getDocumentTokenByLevantIdAction } from '../store/documentToken/documentToken.actions';
import { getProductFormsAction } from '../store/product/product.actions';
import {
  anyModalOpen,
  getBankInfoAction,
  getCheckAppointmentsAction,
  getIdentificationAction,
  getIdentificationWithDocsAction,
  getOpportunitiesAction,
  getSejamByOpportunityIdAction,
  isBankInVerificationModeAction,
  opportunityCardLoadingStart,
  opportunityCardLoadingStop,
  postConfirmBrokerageAction,
  postPrintPasswordAction,
  putDoActionByLevantAndCommandAction,
  putDoActionForDonyaFundAction,
  putNeedSejamAction,
  setCurrentUser,
  setVerifyModalType,
} from '../store/opportunities/opportunities.actions';
import opportunityService from '../service/opportunityService';
import { showModalAction } from '../store/modals/modals.actions';
import {
  MODAL_FOR_COMPLATE_BUSINESS_INFO,
  MODAL_FOR_COMPLETE_SAYA_DATA,
  MODAL_FOR_GENERATE_SAYA_CONTRACT,
  MODAL_FOR_SEP_ADDITIONAL_INFO,
  MODAL_FOR_VERIFY_SEJAM_TRACE_CODE,
  MODAL_FOR_COMPLETE_TRADING_INFO,
  MODAL_FOR_SHOW_OPPORTUNITY_ERRORS,
  MODAL_FOR_KYB_BUSINESS_COMPLETE_INFORMATION,
  MODAL_FOR_KYB_BUSINESS_FINAL_APPROVE,
  MODAL_FOR_CONFIRM_RQ_OPPORTUNITY_ACTION,
} from '../components/ModalRoot/repository';
import actionService from '../service/actionService';
import { fullName } from '../utils';

const { confirm } = Modal;

export function actionHandler(store) {
  /**
   * action handler todo must fill
   * @param action
   * @param levantId
   * @param opportunityId
   * @param opportunity
   * @returns {Promise<*>}
   */
  return async (opportunity, { code: action }) => {
    const { levantId, id: opportunityId, cardLoading, partyType } = opportunity;
    const product = store.getState().getProducts.selected;
    // prevent multiple click
    if (cardLoading || !action) {
      return false;
    }

    // start card loading bar
    await store.dispatch(opportunityCardLoadingStart(opportunityId));
    // set current user data. may need in modals.
    await store.dispatch(setCurrentUser(opportunity));

    // CHECK_IDENTIFICATION: open modalForCheckIdentification (check user and business docs and identity status)
    // ADDITIONAL_INFO: open modalForVerifyData (edit user additional info)
    // ADDITIONAL_INFO: open modalForVerifyData (edit business additional info)
    // CHECK_APPOINTMENT: open modalForCheckAppointment (meeting list. approve action)
    // VISITING_USER: open modalForVisitingUser (approve, done meeting, cancel user)
    // PRINT_FORM: print form action call
    // REPRINT_FORM: print form action call
    // GENERATE_PRINT_PASSWORD: print password action call
    // CONFIRM_BROKERAGE: confirm ETF onboarding
    let response;
    // const formName = `${opportunity?.firstName}-${opportunity?.lastName}-${opportunity.phoneNO}`;

    // const printFormActionDone = action === 'PRINT_FORM';
    try {
      switch (action) {
        case 'CHECK_IDENTIFICATION':
        case 'CHECK_COLLATERALS':
          await Promise.all([
            store.dispatch(
              getDocumentTokenByLevantIdAction({ levantId, product }),
            ),
            store.dispatch(getIdentificationAction(opportunityId)),
            store.dispatch(getIdentificationWithDocsAction(opportunityId)),
          ]);
          await store.dispatch(anyModalOpen('modalForCheckIdentification'));
          break;

        case 'ADDITIONAL_INFO':
          store.dispatch(setVerifyModalType(false, false));
          await Promise.all([
            store.dispatch(
              getDocumentTokenByLevantIdAction({ levantId, product }),
            ),
            store.dispatch(getIdentificationAction(opportunityId)),
            store.dispatch(getIdentificationWithDocsAction(opportunityId)),
          ]);
          if (partyType === 'BUSINESS') {
            await store.dispatch(
              showModalAction({
                type: MODAL_FOR_KYB_BUSINESS_COMPLETE_INFORMATION,
                props: {
                  opportunity,
                  levantId,
                },
              }),
            );
          } else {
            await store.dispatch(anyModalOpen('modalForVerifyData'));
          }
          break;

        case 'COMPLATE_BUSINESS_INFO':
          await Promise.all([
            store.dispatch(getIdentificationWithDocsAction(opportunityId)),
            store.dispatch(
              getDocumentTokenByLevantIdAction({ levantId, product }),
            ),
            store.dispatch(getIdentificationAction(opportunityId)),
          ]);
          await store.dispatch(
            showModalAction({
              type: MODAL_FOR_COMPLATE_BUSINESS_INFO,
              props: {
                opportunity,
                levantId,
              },
            }),
          );
          break;

        case 'CONFIRM_BY_QC':
          await Promise.all([
            store.dispatch(
              getDocumentTokenByLevantIdAction({ levantId, product }),
            ),
            store.dispatch(getIdentificationAction(opportunityId)),
            store.dispatch(getIdentificationWithDocsAction(opportunityId)),
          ]);
          if (partyType === 'PERSON')
            await store.dispatch(anyModalOpen('modalForConfirmByQc'));
          if (partyType === 'BUSINESS')
            store.dispatch(
              showModalAction({
                type: MODAL_FOR_KYB_BUSINESS_FINAL_APPROVE,
                props: {
                  opportunity,
                },
              }),
            );
          break;

        case 'BUSINESS_CONFIRM_BY_QC':
          store.dispatch(setVerifyModalType(true, true));
          await Promise.all([
            store.dispatch(
              getDocumentTokenByLevantIdAction({ levantId, product }),
            ),
            store.dispatch(getIdentificationAction(opportunityId)),
            store.dispatch(getIdentificationWithDocsAction(opportunityId)),
          ]);
          await store.dispatch(anyModalOpen('modalForConfirmByQc'));
          break;

        case 'DOWNLOAD_SEP_DATA':
          await opportunityService.downloadSepDataAsExcel(levantId);
          await opportunityService.afterDownloadSepData(levantId);
          await store.dispatch(getOpportunitiesAction({ product }));
          break;

        case 'ADDITIONAL_INFO_SEP':
          await store.dispatch(
            showModalAction({
              type: MODAL_FOR_SEP_ADDITIONAL_INFO,
              props: {
                levantId,
                opportunityId,
                opportunity,
              },
            }),
          );
          break;

        case 'CHECK_APPOINTMENT':
          await store.dispatch(getCheckAppointmentsAction(opportunityId));
          await store.dispatch(anyModalOpen('modalForCheckAppointments'));
          break;

        case 'VISITING_USER':
          await store.dispatch(anyModalOpen('modalForVisitingUser'));
          break;

        case 'NEED_SEJAM_CODE':
          await store.dispatch(
            putNeedSejamAction({
              opportunityId,
              mandatory: true,
            }),
          );
          await store.dispatch(getOpportunitiesAction({ product }));
          break;

        case 'VERIFY_SEJAM_CODE':
          await store.dispatch(anyModalOpen('modalForVerifySejam'));
          await store.dispatch(getSejamByOpportunityIdAction(opportunityId));
          break;

        case 'PRINT_FORM':
          await store.dispatch(
            getProductFormsAction({
              product,
              levantId,
            }),
          );
          await store.dispatch(anyModalOpen('modalForPrintForms'));
          break;

        case 'CONFIRM_BROKERAGE':
          response = await store.dispatch(
            postConfirmBrokerageAction(opportunityId, {}),
          );
          if (response) {
            CPMessage('تایید شد', 'success');
          } else {
            CPMessage('خطایی رخ داده است', 'error');
          }
          await store.dispatch(getOpportunitiesAction({ product }));
          break;

        case 'GENERATE_PRINT_PASSWORD':
          response = await store.dispatch(
            postPrintPasswordAction('', opportunityId),
          );
          if (response) {
            CPMessage('ارسال به پرینتر');
          } else {
            CPMessage('خطا در پرینت فرم', 'error');
          }
          await store.dispatch(getOpportunitiesAction({ product }));
          break;

        case 'UPLOAD_DOCUMENTS':
          await store.dispatch(anyModalOpen('modalForUploadDocuments'));
          break;

        case 'CHECK_BANK_ACCOUNT':
          store.dispatch(isBankInVerificationModeAction(true));
          await store.dispatch(anyModalOpen('modalForBankVerification'));
          break;

        case 'ADDITIONAL_BANK_INFO':
          response = await store.dispatch(getBankInfoAction());
          await store.dispatch(isBankInVerificationModeAction(false));
          if (response) {
            store.dispatch(anyModalOpen('modalForBankVerification'));
          } else {
            CPMessage('خطا در دریافت اطلاعات بانکی');
          }
          break;

        case 'CREATE_DONYA_FUND_USER':
          await store.dispatch(
            putDoActionForDonyaFundAction({
              levantId,
              product,
            }),
          );
          await store.dispatch(getOpportunitiesAction({ product }));
          break;

        case 'CHECK_BUSINESS_IDENTIFICATION':
          await store.dispatch(getIdentificationAction(opportunityId));
          await store.dispatch(getIdentificationWithDocsAction(opportunityId));
          await store.dispatch(
            anyModalOpen('modalForKianBusinessIdentification'),
          );
          break;

        case 'ADDITIONAL_INFO_BUSINESS':
          store.dispatch(setVerifyModalType(false, true));
          await Promise.all([
            store.dispatch(
              getDocumentTokenByLevantIdAction({ levantId, product }),
            ),
            store.dispatch(getIdentificationAction(opportunityId)),
            store.dispatch(getIdentificationWithDocsAction(opportunityId)),
          ]);
          await store.dispatch(anyModalOpen('modalForVerifyData'));
          break;

        case 'GENERATE_QR_CODE':
          await opportunityService.generateQRCode(opportunityId);
          await store.dispatch(getOpportunitiesAction({ product }));
          break;

        case 'PRINT_QR_CODE':
          await opportunityService.printQRCode(opportunityId);
          await store.dispatch(getOpportunitiesAction({ product }));
          break;

        case 'VERIFY_SEJAM_TRACE_CODE':
          await store.dispatch(
            showModalAction({
              type: MODAL_FOR_VERIFY_SEJAM_TRACE_CODE,
              props: {
                opportunityData: opportunity,
                productCode: product,
              },
            }),
          );
          break;
        case 'COMPLETE_TRADING_INFO':
          await store.dispatch(
            showModalAction({
              type: MODAL_FOR_COMPLETE_TRADING_INFO,
              props: {
                opportunityData: opportunity,
                productCode: product,
              },
            }),
          );
          break;
        case 'GENERATE_TRADING_CODE':
        case 'CREATE_DOHI_USER':
          await store.dispatch(
            putDoActionByLevantAndCommandAction({
              code: action,
              opportunityId,
            }),
          );
          await store.dispatch(getOpportunitiesAction({ product }));
          break;

        case 'CREATE_FUND_USER':
        case 'UPDATE_FUND_USER':
        case 'PENDING_BUSINESS_FUNDS_USER':
        case 'CREATE_BUSINESS_FUND_USER':
        case 'CREATE_USER_IN_MANA':
        case 'CALCULATE_CREDIT_SCORE':
          await actionService.doAction(action, levantId, product, 'ایجاد');
          await store.dispatch(getOpportunitiesAction({ product }));
          break;

        case 'OPEN_ONLINE_ACCOUNT_RAYAN':
        case 'LEASING_FINISH':
        case 'FINISH_PIPELINE':
          await store.dispatch(
            putDoActionByLevantAndCommandAction({
              code: action,
              opportunityId,
            }),
          );
          await store.dispatch(getOpportunitiesAction({ product }));
          break;

        case 'RQ':
          await store.dispatch(
            showModalAction({
              type: MODAL_FOR_CONFIRM_RQ_OPPORTUNITY_ACTION,
              props: {
                action,
                levantId,
                product,
              },
            }),
          );
          break;
        case 'UPDATE_RAYAN_USER': {
          response = await store.dispatch(
            putDoActionByLevantAndCommandAction({
              code: action,
              opportunityId,
            }),
          );
          if (response?.resp?.commandErrors !== null) {
            store.dispatch(
              showModalAction({
                type: MODAL_FOR_SHOW_OPPORTUNITY_ERRORS,
                props: {
                  data: response.resp,
                  title: 'لیست خطاها',
                },
              }),
            );
            break;
          }
          await store.dispatch(getOpportunitiesAction({ product }));
          break;
        }
        case 'GENERAL_CREATE_RAYAN_USER':
        case 'CREATE_RAYAN_USER':
        case 'CREATE_MABNA_USER': {
          response = await store.dispatch(
            putDoActionByLevantAndCommandAction({
              code: action,
              opportunityId,
            }),
          );
          if (response?.resp?.commandErrors !== null) {
            store.dispatch(
              showModalAction({
                type: MODAL_FOR_SHOW_OPPORTUNITY_ERRORS,
                props: {
                  data: response.resp,
                  title: 'لیست خطاها',
                },
              }),
            );
            break;
          }
          const type = {
            GENERAL_CREATE_RAYAN_USER: 'رایان',
            CREATE_RAYAN_USER: 'رایان',
            CREATE_MABNA_USER: 'مبنا',
          };

          CPMessage(`حساب ${type[action]} با موفقیت ایجاد شد.`);
          await store.dispatch(getOpportunitiesAction({ product }));
          break;
        }

        case 'COMPLATE_SAYA_DATA': {
          await Promise.all([
            store.dispatch(getIdentificationWithDocsAction(opportunityId)),
          ]);
          store.dispatch(
            showModalAction({
              type: MODAL_FOR_COMPLETE_SAYA_DATA,
              props: {
                id: opportunityId,
              },
            }),
          );
          break;
        }

        case 'APPROVE_SAYA_CONTRACT': {
          confirm({
            title: 'فعال‌سازی',
            content: `آیا از فعال‌سازی ${fullName(opportunity)} اطمینان دارید؟`,
            okText: 'بله',
            cancelText: 'خیر',
            icon: 'check-circle',
            type: 'success',
            onOk: async () => {
              await opportunityService.activeSayaCredit(opportunityId);
              store.dispatch(getOpportunitiesAction());
            },
          });
          break;
        }

        case 'GENERATE_SAYA_CONTRACT': {
          store.dispatch(
            showModalAction({
              type: MODAL_FOR_GENERATE_SAYA_CONTRACT,
              props: {
                id: opportunityId,
              },
            }),
          );
          break;
        }

        default:
          break;
      }
    } finally {
      store.dispatch(opportunityCardLoadingStop());
    }
    return null;
  };
}

export function actionCancelHandler(store) {
  /**
   * action cancel handler todo must fill
   * @param action
   * @param levantId
   * @param opportunityId
   * @param opportunity
   * @returns {Promise<*>}
   */
  return async (
    action,
    levantId,
    opportunityId,
    opportunity,
    product,
    cardLoading,
  ) => {
    // prevent multiple click
    if (cardLoading || !action) {
      return false;
    }

    // start card loading bar
    await store.dispatch(opportunityCardLoadingStart(opportunityId));
    // set current user data. may need in modals.
    await store.dispatch(setCurrentUser(opportunity));
    switch (action) {
      case 'NEED_SEJAM_CODE':
        await store.dispatch(
          putNeedSejamAction({
            opportunityId,
            mandatory: false,
          }),
        );
        await store.dispatch(getOpportunitiesAction({ product }));
        break;

      default:
        break;
    }
    return store.dispatch(opportunityCardLoadingStop());
  };
}
