import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KianTable from '../../components/KianTable/KianTable';
import { columns } from './columns';
import { VIDEO_AUTHENTICATION_LIST_TABLE } from '../../store/settings/settings.constants';
import { MODAL_FOR_REVIEW_VIDEO_KYC_REQUEST } from '../../components/ModalRoot/repository';
import withModal from '../../components/HOC/withModal';
import history from '../../history';
import searchSchema from './searchSchema';

const actionViewStatus = [
  'PERSONAL_INFO',
  'IMAGE',
  'VIDEO',
  'SIGNATURE',
  'REJECTED',
  'APPROVED',
];

const VideoAuthenticationList = ({ kycType, code, ...props }) => {
  const isSejam = kycType === 'sejam';
  const baseEndpoint = isSejam ? 'admin/kycVideo' : 'admin/kycVideo/kianKyc';
  const endpoints = {
    all: `${baseEndpoint}/all`,
    ai: `${baseEndpoint}/all?isConfirmedAI=true`,
    nc: `${baseEndpoint}/aggregate`,
  };

  useEffect(() => {
    if (!['kian', 'sejam'].includes(kycType)) {
      history.replace('/videoKyc');
    }
  }, []);

  const [endpoint, setEndPoint] = useState(endpoints.ai);

  const [tableKey, setTableKey] = useState(0);

  const handleFilter = async value => {
    await setEndPoint(endpoints[value]);
    setTableKey(prev => prev + 1);
  };

  const toggleButton = {
    onChange: handleFilter,
    defaultValue: Object.entries(endpoints).find(
      ([, endP]) => endpoint === endP,
    )[0],
    buttons: [
      {
        label: 'تایید شده AI',
        value: 'ai',
      },
      {
        label: 'براساس کدملی',
        value: 'nc',
      },
      {
        label: 'همه درخواست‌ها',
        value: 'all',
      },
    ],
  };

  const showModal = type => modalProps => () => {
    props.showModalAction({
      type,
      props: modalProps,
    });
  };

  const contextMenu = [
    {
      label: row =>
        isSejam
          ? actionViewStatus.includes(row.status)
            ? 'مشاهده'
            : 'بررسی درخواست'
          : 'مشاهده',
      action: row =>
        showModal(MODAL_FOR_REVIEW_VIDEO_KYC_REQUEST)({
          data: row,
          withApproveRejectButtons: isSejam,
          withSignature: isSejam,
        })(),
    },
    ...(!code && endpoint === endpoints.nc
      ? [
          {
            label: `تاریخچه`,
            // eslint-disable-next-line no-unused-vars
            action: row => {
              // eslint-disable-next-line no-console
              window?.open(`/videoKyc/${kycType}/${row.userId}`, '_blank');
            },
          },
        ]
      : []),
  ];
  return (
    <>
      <KianTable
        endpoint={code ? `admin/kycVideo/user/${code}` : endpoint}
        key={tableKey}
        withSort={false}
        toggleButton={!code && toggleButton}
        withSearch={!code}
        tableId={VIDEO_AUTHENTICATION_LIST_TABLE}
        columns={columns({ aggregate: endpoint === endpoints.nc, kycType })}
        contextMenu={contextMenu}
        searchData={searchSchema({ products: props.products, kycType })}
        headerTitle={
          code
            ? 'تاریخچه احراز هویت کاربر'
            : `احراز هویت ${isSejam ? 'سجام' : 'کیان'}`
        }
        persistInLocalStorage={false}
      />
    </>
  );
};

VideoAuthenticationList.propTypes = {
  kycType: PropTypes.oneOf(['kian', 'sejam']).isRequired,
  code: PropTypes.string,
  showModalAction: PropTypes.func.isRequired,
  products: PropTypes.array,
};

VideoAuthenticationList.defaultProps = {
  code: undefined,
  products: null,
};

const mapStateToProps = state => ({
  products: state.getProducts.data,
});

export default connect(mapStateToProps)(withModal(VideoAuthenticationList));
