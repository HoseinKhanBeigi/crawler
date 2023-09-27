import { useEffect, useState } from 'react';
import operationManagementService from '../../../../service/operationManagementService';

export default function useBranchOperation(id) {
  const [operationBranch, setOperationBranch] = useState(false);
  const handleDeleteOperationBranch = async row => {
    await operationManagementService.deleteRelationOperationalBranches(row.id);
    const newDataList = [...operationBranch].filter(item => item.id !== row.id);
    setOperationBranch(newDataList);
  };
  const handleAddOperationBranch = row => {
    setOperationBranch(prev => [...prev, row]);
  };
  useEffect(() => {
    operationManagementService.getRelationOperationalBranches(id).then(res => {
      setOperationBranch(res.content);
    });
  }, [id]);

  return [
    operationBranch,
    handleDeleteOperationBranch,
    handleAddOperationBranch,
  ];
}
