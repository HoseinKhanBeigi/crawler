import { SET_BREADCRUMB } from './breadCrumb.constants';

const initialValue = {
  breadCrumbs: [],
};
export default function breadCrumb(state = initialValue, action = {}) {
  switch (action.type) {
    case SET_BREADCRUMB: {
      return {
        ...initialValue,
        breadCrumbs: action.breadCrumbs,
      };
    }

    default: {
      return state;
    }
  }
}
