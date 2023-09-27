import { useEffect, useState } from 'react';
import operationManagementService from '../../../../../../../service/operationManagementService';

export default function useAddNonOperationBranch(tableData) {
  const [operationBranch, setOperationBranch] = useState([]);
  const [target, setTarget] = useState('');
  const handleOnSelect = code => {
    const findBranch = operationBranch.find(item => item.code === code);
    setTarget(findBranch);
  };

  useEffect(() => {
    operationManagementService.getNonOperationalBranches().then(res => {
      const tableBranchCodes = new Set(
        tableData.map(({ targetBranchCode }) => targetBranchCode),
      );
      const uniqueResult = res.result.filter(
        ({ code }) => !tableBranchCodes.has(code),
      );
      setOperationBranch(uniqueResult);
    });
  }, []);

  return [operationBranch, target, handleOnSelect];
}
