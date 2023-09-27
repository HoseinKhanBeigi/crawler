import { SET_BREADCRUMB } from './breadCrumb.constants';

export default function setBreadCrumb(data) {
  return {
    type: SET_BREADCRUMB,
    breadCrumbs: data,
  };
}
