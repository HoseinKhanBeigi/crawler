import {
  aclActionGrantTypes,
  grantTypesListSortedByPriority,
} from '../../constants/aclActionGrantTypes';
import {
  aclActionTypes,
  crudActionsSortedByPriority,
} from '../../constants/aclActionTypes';

/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */

const grantTypeSymbol = Symbol('grantType');

const initialDefaultGrantType = aclActionGrantTypes.DISABLE;

function handleDefaultCrudActionsValue(aclGrantType) {
  if (aclGrantType === aclActionGrantTypes.ENABLE) {
    Object.keys(this.crudOperators).forEach(key => {
      if (this.crudOperators[key]) {
        this.crudOperators[key].grantType = aclActionGrantTypes.ENABLE;
      }
    });
  } else {
    Object.keys(this.crudOperators).forEach(key => {
      if (this.crudOperators[key]) {
        this.crudOperators[key].grantType = aclActionGrantTypes.DISABLE;
      }
    });
  }
}

const isOneOf = (...actions) => action => actions.includes(action);

const onCrudDropdownChangeHandler = (target, prop, value, crudOperators) => {
  const { actionType } = target;
  if (
    prop === 'grantType' &&
    actionType in crudOperators &&
    isOneOf(aclActionTypes.READ, aclActionTypes.UPDATE)(actionType)
  ) {
    const changeDropdownBasedOnPriority = (aType, gType) => {
      if (aType === aclActionTypes.DELETE) {
        return true;
      }
      const actionTypePriority = crudActionsSortedByPriority.indexOf(aType);
      const grantTypePriority = grantTypesListSortedByPriority.indexOf(gType);
      const nextActionType =
        crudActionsSortedByPriority[actionTypePriority + 1];
      const targetCrudAction = crudOperators[nextActionType];
      if (targetCrudAction) {
        Reflect.set(
          targetCrudAction,
          'dataSource',
          grantTypesListSortedByPriority.slice(grantTypePriority),
        );
        if (
          grantTypesListSortedByPriority.indexOf(targetCrudAction.grantType) <=
          grantTypePriority
        ) {
          Reflect.set(targetCrudAction, 'grantType', gType);
        }
        return changeDropdownBasedOnPriority(
          nextActionType,
          targetCrudAction?.grantType,
        );
      }
      return changeDropdownBasedOnPriority(nextActionType, gType);
    };
    changeDropdownBasedOnPriority(actionType, value);
  }
};

function crudActionsProxyHandler() {
  const { crudOperators } = this;
  return {
    set(target, prop, value) {
      const result = Reflect.set(target, prop, value);
      onCrudDropdownChangeHandler(target, prop, value, crudOperators);
      return result;
    },
  };
}

function intiCrudOperators(crudOperators) {
  crudOperators.forEach(item => {
    this.crudOperators[item.actionType] = new Proxy(
      new CrudOperatorAction(item),
      crudActionsProxyHandler.call(this),
    );
  });
}

function initSubFeatures(subFeatures) {
  subFeatures.forEach(action => {
    this.subFeatureIds.push(action.id);
    this.subFeatures[action.id] = new AclAction(action);
  });
}

class AclAction {
  crudOperators = {
    [aclActionTypes.CREATE]: null,
    [aclActionTypes.READ]: null,
    [aclActionTypes.UPDATE]: null,
    [aclActionTypes.DELETE]: null,
  };
  subFeatures = {};
  subFeatureIds = [];

  constructor({
    id,
    parentId,
    actionType,
    grantType = initialDefaultGrantType,
    crudOperators,
    subFeatures,
    actionId = null,
  }) {
    this.id = id;
    this.actionType = actionType;
    this[grantTypeSymbol] = grantType;
    this.parentId = parentId;
    this.actionId = actionId;
    if (crudOperators && Array.isArray(crudOperators)) {
      intiCrudOperators.call(this, crudOperators);
    } else {
      throw new Error('crudOperators type should be array');
    }
    if (subFeatures && Array.isArray(subFeatures)) {
      initSubFeatures.call(this, subFeatures);
    } else {
      throw new Error('subFeatures type should be array');
    }
  }

  set grantType(aclGrantType) {
    if (
      this.actionType === aclActionTypes.MENU ||
      this.actionType === aclActionTypes.SUB_FEATURE
    ) {
      handleDefaultCrudActionsValue.call(this, aclGrantType);
    }
    this[grantTypeSymbol] = aclGrantType;
  }

  get grantType() {
    return this[grantTypeSymbol];
  }

  prepareForService() {
    return {
      grantType: this.grantType,
      childs: [
        ...this.subFeatureIds.map(id =>
          this.subFeatures[id].prepareForService(),
        ),
        ...Object.values(this.crudOperators)
          .filter(Boolean)
          .map(action => action.prepareForService()),
      ],
      ...(this.actionId
        ? {
            action: {
              id: this.actionId,
            },
            id: this.id,
            parentId: this.parentId,
          }
        : {
            action: {
              id: this.id,
            },
          }),
    };
  }
}

class CrudOperatorAction extends AclAction {
  constructor(action) {
    super(action);
    this.dataSource =
      action.actionType !== aclActionTypes.CREATE
        ? grantTypesListSortedByPriority
        : grantTypesListSortedByPriority.filter(
            d => d !== aclActionGrantTypes.MINE,
          );
  }
}

export default AclAction;
