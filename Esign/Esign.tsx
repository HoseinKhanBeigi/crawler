import React, { useMemo, useState, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Button, Modal, Checkbox } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { configurableRequest } from '../../lib/configurableRequest';
import { RequestInstance } from '../../store/request';
import { RootState } from '../../store/rootReducer';
import style from './Esign.scss';
import OtpContainer, { INVALID_OTP_CODE } from '../OtpContainer/OtpContainer';
import { BuiltInStageProps } from '../../interfaces/builtInStages.interface';
import Algo from './contractReader/algo';
import ContractStage from './contractReader/contract';
import {
  algoritmi,
  callCenter,
  formDarkhastEtebarMoshtarianHaghighi,
  formJadidGharardadHoghoghiBahman,
  formJadidGhardadEtebariBahmanMah,
  formKharidForooshInterneti,
  freezehoghoghi,
  pazireshrisk,
  freezehaghighi,
  output,
  barkhat,
  estefadeAzBarkhat,
  ekhtiareMoamele,
  bayanieRiskEkhtiareMoamele,
} from './jsons';

const PdfViewer = dynamic(() => import('./pdfReader'), { ssr: false });

const DOWNLOAD = 'دانلود متن قرارداد ';
const DOWNLOADING = 'درحال آماده‌سازی ...';

const contractList = [
  {
    label: 'فرم معاملات الگوریتمی',
    data: algoritmi,
    isVisible: false,
    statue: true,
    name: 'algoritmi',
  },
  {
    label: 'فرم قرارداد کال سنتر',
    data: callCenter,
    isVisible: false,
    name: 'callCenter',
  },
  {
    label: 'فرم فریز مشتریان حقیقی',
    data: freezehaghighi,
    isVisible: false,
    name: 'freezehaghighi',
  },
  {
    label: 'فرم فریز  مشتریان حقوقی',
    data: freezehoghoghi,
    isVisible: false,
    name: 'freezehoghoghi',
  },
  {
    label: 'فرم درخواست اعتبار خام',
    data: formDarkhastEtebarMoshtarianHaghighi,
    isVisible: false,
    name: 'formDarkhastEtebarMoshtarianHaghighi',
  },
  {
    label: 'فرم خرید وفروش اینترنتی',
    data: formKharidForooshInterneti,
    isVisible: false,
    name: 'formKharidForooshInterneti',
  },
  {
    label: 'فرم جدید قرارداد اعتباری حقیقی-بهمن ماه',
    data: formJadidGhardadEtebariBahmanMah,
    isVisible: false,
    name: 'formJadidGhardadEtebariBahmanMah',
  },
  {
    label: 'فرم جدید قرارداد اعتباری حقوقی-بهمن ماه',
    data: formJadidGharardadHoghoghiBahman,
    isVisible: false,
    name: 'formJadidGharardadHoghoghiBahman',
  },
  {
    label: 'فرم بیانیه پذیرش ریسک',
    data: pazireshrisk,
    isVisible: false,
    name: 'pazireshrisk',
  },
  {
    label: 'بر خط  ',
    data: barkhat,
    isVisible: false,
    name: 'barkhat',
    statue: true,
  },
  {
    label: 'تعهدنامه استفاده از برخط',
    data: estefadeAzBarkhat,
    isVisible: false,
    name: 'estefadeAzBarkhat',
    statue: true,
  },
  {
    label: 'اختیار معامله ',
    data: ekhtiareMoamele,
    isVisible: false,
    name: 'ekhtiareMoamele',
    statue: true,
  },
  {
    label: 'بیانیه ریسک اختیار معامله ',
    data: bayanieRiskEkhtiareMoamele,
    isVisible: false,
    name: 'bayanieRiskEkhtiareMoamele',
    statue: true,
  },
  {
    label: 'فرم  ',
    data: output,
    isVisible: false,
    name: 'output',
    statue: true,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'COMPLETE':
      return state.map(contract => {
        if (contract.name === action.name) {
          return { ...contract, isVisible: !contract.isVisible };
        } else {
          return contract;
        }
      });
    default:
      return state;
  }
};

function Esign({ stage, actions: { submitForm } }: BuiltInStageProps) {
  const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);
  const [isEsignOtpModalVisible, setIsEsignOtpModalVisible] = useState(false);
  const [formsDownloadInProgress, setFormsDownloadInProgress] = useState<
    Array<number>
  >([]);
  const [count, setCount] = useState<number>(0);
  const [formIndexToPreview, setFormIndexToPreview] = useState();
  const [nameContract, setNameContract] = useState();
  const [dataContract, setDataContract] = useState();
  const [contractItem, setContractItem] = useState();
  const [isChecked, setChecked] = useState(false);
  const router = useRouter();
  const applicationDetail = useSelector(
    ({ application }: RootState) =>
      application.data?.application?.applicationInfo,
  );
  const applicationId = router.query.applicationId as string;

  const formsConfig = useMemo(() => stage?.extraConfig?.forms, [
    stage?.extraConfig?.forms,
  ]);

  function visitPdf(index) {
    setFormIndexToPreview(index);
    setIsPdfModalVisible(true);
  }

  async function verifyOtp(otp) {
    const data = {
      mappedData: {
        applicationId,
        otp,
      },
    };
    try {
      await submitForm(data);
    } catch (error) {
      const exceptionMessage = error?.response?.data?.exceptionMessage;
      if (exceptionMessage === 'INVALID_E_SIGN_OTP') {
        throw INVALID_OTP_CODE;
      }
    }
  }

  function getPdf(action) {
    return configurableRequest<Blob>(
      RequestInstance,
      action,
      router,
      { ...applicationDetail },
      { responseType: 'blob' },
    );
  }

  async function downloadPdf(form, index) {
    setFormsDownloadInProgress([...formsDownloadInProgress, index]);
    try {
      const response = await getPdf(formsConfig[index].action);
      setFormsDownloadInProgress(
        formsDownloadInProgress.filter(itemIndex => itemIndex === index),
      );
      const blob = new Blob([response]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${form.label}.pdf`;
      link.click();
    } catch {
      setFormsDownloadInProgress(
        formsDownloadInProgress.filter(itemIndex => itemIndex === index),
      );
    }
  }

  function closePdfViewerModal() {
    setFormIndexToPreview({});
    setIsPdfModalVisible(false);
    setDataContract({});
    setChecked(false);
  }

  function closeEsignOtpModal() {
    setIsEsignOtpModalVisible(false);
  }

  const forms = useMemo(
    () =>
      formsConfig?.map((item, index) => {
        const isLastItem: boolean = formsConfig.length !== index + 1;
        return (
          <div className={style.singleFormContainer} key={item.id}>
            <div className={style.formTitle}>{item.label}</div>
            <div className={style.contractBtnWrapper}>
              <Button onClick={() => visitPdf(index)}>
                مشاهده متن قرارداد
              </Button>
            </div>
            <div className={style.contractBtnWrapper}>
              <Button onClick={() => downloadPdf(item, index)}>
                {formsDownloadInProgress.includes(index)
                  ? DOWNLOADING
                  : DOWNLOAD}
              </Button>
            </div>
            {isLastItem && <div className={style.hr} data-cy="hr" />}
          </div>
        );
      }),
    [stage.extraConfig?.forms, formIndexToPreview, formsDownloadInProgress],
  );

  const listOfContarcts = lists => {};

  const [contract, dispatch] = useReducer(reducer, contractList);

  const handleComplete = item => {
    dispatch({ type: 'COMPLETE', name: item.name });
  };

  const handleObserve = (item, index) => {
    setIsPdfModalVisible(true);
    setNameContract(item.statue);
    setDataContract(item.data);
    setContractItem(item);
  };

  // eslint-disable-next-line no-shadow
  const handleChange = (e, contractItem) => {
    handleComplete(contractItem);
    setChecked(e.target.checked);
  };

  return (
    <>
      <span className={style.groupLabel} data-cy="title">
        {stage.label}
      </span>
      <div className={style.bodyContainer}>
        {/* <div>{forms}</div> */}
        <div>
          {contract?.map((item, index) => {
            return (
              <div className={style.singleFormContainer} key={item.label}>
                <div className={style.formTitle}>{item.label}</div>
                <div className={style.contractBtnWrapper}>
                  <Button onClick={() => handleObserve(item, index)}>
                    مشاهده متن قرارداد
                  </Button>
                </div>
                <div className={style.contractBtnWrapper}>
                  <Button onClick={() => downloadPdf(item, index)}>
                    {DOWNLOAD}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          type="primary"
          className={style.esignBtn}
          onClick={() => setIsEsignOtpModalVisible(true)}
        >
          امضای الکترونیکی قراردادها <LeftOutlined />
        </Button>
      </div>
      <Modal
        title="Basic Modal"
        visible={isPdfModalVisible}
        onCancel={() => closePdfViewerModal}
        centered
        className={style.modalContent}
        footer={[
          <div style={{ display: 'flex' }}>
            <Checkbox
              onChange={e => handleChange(e, contractItem)}
              checked={isChecked}
            >
              قرارداد را مشاهده و پذیرفته ام
            </Checkbox>
          </div>,
          <Button
            className={style.modalFooter}
            type="primary"
            onClick={() => closePdfViewerModal}
          >
            بستن
          </Button>,
        ]}
      >
        {/* {isPdfModalVisible && (
          <PdfViewer
            downloadFile={() => getPdf(formsConfig[formIndexToPreview].action)}
          />
        )} */}
        {isPdfModalVisible && nameContract ? (
          <Algo data1={dataContract} />
        ) : (
          <ContractStage data={dataContract} />
        )}
      </Modal>
      <Modal
        title="Basic Modal"
        visible={isEsignOtpModalVisible}
        onCancel={() => closeEsignOtpModal}
        centered
        footer={null}
        className={style.otpModalContent}
      >
        <OtpContainer
          sendOtpAction={stage.extraConfig?.actions?.sendOtp}
          verifyOtp={otp => verifyOtp(otp)}
          setCount={setCount}
          submitButtonTitle="تایید کد و امضای الکترونیکی قراردادها"
          description="کد تایید به شماره سجامی شما ارسال شده است، لطفا کد تایید دریافت شده را وارد کنید"
          otpLength={5}
          expireDate={120000}
        />
      </Modal>
    </>
  );
}

export default Esign;
