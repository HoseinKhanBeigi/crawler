import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import KianTable from '../../components/KianTable';
import ModalForEntityActivityTabMoreDetail from '../../components/ModalForEntityActivityTabMoreDetail/ModalForEntityActivityTabMoreDetail';
import { kianTableApi } from '../KianTable/helpers/globalApi';
import { Actions } from '../../utils/aclActions';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';

const CrmActivityTable = props => {
  const {
    downloadExcelAction,
    columns,
    searchData,
    persistInLocalStorage,
    levantId,
    tableId,
    panel,
    actionTypes,
  } = props;
  const [detailModalVisibility, setDetailModalVisibility] = useState(false);
  const [modalData, setModalData] = useState({});

  const endPoint = `activity?${new URLSearchParams({
    ...(levantId !== null && levantId !== '' && { levantId }),
    ...(panel && { panel }),
  })}&applicationName=${resolveVariable(BASE_VARIABLE_KEYS.CONTEXT)}`;

  useEffect(() => {
    kianTableApi(tableId).refreshTable();
  }, [levantId]);

  const showDetailModal = data => {
    setModalData(data);
    setDetailModalVisibility(true);
  };

  const contextMenu = [
    {
      label: `مشاهده`,
      authority: Actions.viewActivity,
      action: row => showDetailModal(row),
    },
  ];

  const dismissModal = () => {
    setDetailModalVisibility(false);
  };

  return (
    <>
      <KianTable
        downloadExcelAction={downloadExcelAction()}
        searchData={searchData}
        endpoint={endPoint}
        withSort={false}
        contextMenu={contextMenu}
        tableId={tableId}
        columns={columns}
        persistInLocalStorage={persistInLocalStorage}
      />
      {detailModalVisibility && modalData && (
        <ModalForEntityActivityTabMoreDetail
          onCancel={dismissModal}
          visible={detailModalVisibility}
          data={modalData}
          actionTypes={actionTypes}
        />
      )}
    </>
  );
};
CrmActivityTable.defaultProps = {
  downloadExcelAction: () => {},
  persistInLocalStorage: false,
  levantId: '',
  tableId: '',
  panel: null,
  actionTypes: {},
};

CrmActivityTable.propTypes = {
  downloadExcelAction: PropTypes.object,
  columns: PropTypes.array.isRequired,
  searchData: PropTypes.array.isRequired,
  persistInLocalStorage: PropTypes.bool,
  levantId: PropTypes.string,
  tableId: PropTypes.string,
  panel: PropTypes.string,
  actionTypes: PropTypes.object,
};

export default CrmActivityTable;
