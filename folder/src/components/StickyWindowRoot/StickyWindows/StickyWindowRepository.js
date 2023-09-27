import StickyWindowForRegisterCallDetail from './StickyWindowForRegisterCallDetail';
import StickWindowForUpdateCallDetail from './StickyWindowForUpdateCallDetail';
import StickyWindowForAddLeadCall from './StickyWindowForAddLeadCall';

// STICK WINDOW TYPE
export const STICKY_WINDOW_FOR_REGISTER_CALL_DETAIL =
  'STICKY_WINDOW_FOR_REGISTER_CALL_DETAIL';
export const STICKY_WINDOW_FOR_UPDATE_CALL_DETAIL =
  'STICKY_WINDOW_FOR_UPDATE_CALL_DETAIL';
export const STICKY_WINDOW_FOR_ADD_LEAD_CALL =
  'STICKY_WINDOW_FOR_ADD_LEAD_CALL';

/* Register modals here */
const stickyWindowRepository = {
  [STICKY_WINDOW_FOR_REGISTER_CALL_DETAIL]: StickyWindowForRegisterCallDetail,
  [STICKY_WINDOW_FOR_UPDATE_CALL_DETAIL]: StickWindowForUpdateCallDetail,
  [STICKY_WINDOW_FOR_ADD_LEAD_CALL]: StickyWindowForAddLeadCall,
};

export default stickyWindowRepository;
