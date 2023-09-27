import { useEffect, useState } from 'react';
import { aclActionGrantTypes } from '../../constants/aclActionGrantTypes';
import aclFormService from '../../../../service/aclFormService';
import useAclFormStore from './useAclFormStore';
import { prepareGetAclGroupByIdServiceResult } from '../helpers';
import history from '../../../../history';

// eslint-disable-next-line no-unused-vars
const useAclForm = (aclGroupId, editMode, refLink) => {
  const [allActions, setAllActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState([]);
  const [formInfoData, setFormInfoData] = useState({
    title: '',
    code: '',
    unitTypes: [],
  });
  const [viewMode, setViewMode] = useState(false);
  const [, setTemp] = useState(0);
  const [isPostingData, setIsPostingData] = useState(false);

  const forceUpdate = () => setTemp(prevState => prevState + 1);

  const {
    initStore,
    changeMenuAccessSwitch,
    getCRUDDropdownValue,
    getHasCRUDDropdown,
    getMenuAccessSwitchState,
    getMenuAccessSwitchDisabledState,
    getCRUDDropdownDataSource,
    changeCRUDDropdown,
    groupActions,
  } = useAclFormStore();

  const isRowExpanded = id => expandedRows.includes(id);

  const toggleExpandRowHandler = id => {
    if (isRowExpanded(id)) {
      setExpandedRows(prevExpandedRow =>
        prevExpandedRow.filter(_id => _id !== id),
      );
    } else {
      setExpandedRows(prevState => [...prevState, id]);
    }
  };

  const redirectHandler = () => {
    history.push(refLink);
  };

  const fetchAllActions = async () => {
    try {
      let actions;
      if (aclGroupId) {
        const {
          menus,
          title,
          code,
          unitTypes,
        } = await aclFormService.getAclGroupById(aclGroupId);
        actions = prepareGetAclGroupByIdServiceResult(menus);
        setFormInfoData({ title, code, unitTypes });
        if (!editMode) {
          setViewMode(true);
        }
      } else {
        const { result = [] } = await aclFormService.getAllActions();
        actions = result;
      }
      setAllActions(actions);
      initStore(actions);
    } catch (e) {
      // ...
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchAllActions();
    })();
  }, []);

  const changeMenuAccessSwitchHandler = row => isChecked => {
    if (row.subFeatures.length && isChecked && !isRowExpanded(row.id)) {
      toggleExpandRowHandler(row.id);
    }
    changeMenuAccessSwitch({
      parentId: row.parentId,
      id: row.id,
      grantType: isChecked
        ? aclActionGrantTypes.ENABLE
        : aclActionGrantTypes.DISABLE,
    });
  };

  const submitFormHandler = async ({ title, code, unitTypes }) => {
    const actions = groupActions.map(action => action.prepareForService());
    setIsPostingData(true);
    try {
      if (editMode && aclGroupId) {
        await aclFormService.updateAclGroup({
          id: aclGroupId,
          title,
          code,
          unitTypes,
          groupActions: actions,
        });
      } else {
        await aclFormService.postNewAclGroup({
          title,
          code,
          unitTypes,
          groupActions: actions,
        });
      }
    } catch (e) {
      // ...
    }
    redirectHandler();
    setIsPostingData(false);
  };

  const changeCRUDDropdownHandler = (
    { id, parentId },
    actionType,
  ) => grantType =>
    changeCRUDDropdown({
      parentId,
      id,
      grantType,
      actionType,
    });

  return {
    getCRUDDropdownValue,
    getHasCRUDDropdown,
    getMenuAccessSwitchState,
    getMenuAccessSwitchDisabledState,
    getCRUDDropdownDataSource,
    changeMenuAccessSwitchHandler,
    changeCRUDDropdownHandler,
    allActions,
    loading,
    expandedRows,
    toggleExpandRowHandler,
    submitFormHandler,
    viewMode,
    forceUpdate,
    isPostingData,
    redirectHandler,
    formInfoData,
  };
};

export default useAclForm;
