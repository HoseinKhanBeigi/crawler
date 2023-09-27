import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import acl from '../acl/acl.reducer';
import tag from '../tag/tag.reducer';
import reports from '../reports/reports.reducer';
import formSetting from '../formSetting/formSetting.reducer';
import upload from '../upload/upload.reducer';
import product from '../product/product.reducer';
import search from '../search/search.reducer';
import newActivities from '../newActivities/newActivities.reducer';
import lead from '../lead/lead.reducer';
import kycCapacityManagement from '../kycCapacityManagement/kycCapacityManagement.reducer';
import opportunity from '../opportunity/opportunity.reducer';
import fullSearch from '../fullSearch/fullSearch.reducer';
import documentToken from '../documentToken/documentToken.reducer';
import users from '../users/users.reducer';
import sendEmail from '../sendEmail/sendEmail.reducer';
import sendSms from '../sendSMS/sendSMS.reducer';
import getProducts from '../getProducts/getProducts.reducer';
import person from '../person/person.reducer';
import user from '../user/user.reducer';
import runtime from '../runtime/runtime.reducer';
import intl from '../intl/intl.reducer';
import phoneCalls from '../phoneCalls/phoneCalls.reducer';
import leads from '../leads/leads.reducer';
import activities from '../activities/activities.reducer';
import applications from '../applications/applications.reducer';
import assign from '../assign/assign.reducer';
import breadCrumb from '../breadCrumb/breadCrumb.reducer';
import opportunities from '../opportunities/opportunities.reducer';
import docDownload from '../docDownload/docDownload.reducer';
import messageTemplate from '../messageTemplate/messageTemplate.reducer';
import modals from '../modals/modals.reducer';
import settings from '../settings/settings.reducer';
import onComingCall from '../onComingCall/onComingCall.reducer';
import stickyWindow from '../stickyWindow/stickywindow.reducer';
import employeeManagement from '../employeeManagement/employeeManagement.reducer';
import neshanAuth from '../neshanAuth/neshan.reducer';
import portfolio from '../portfolio/portfolio.reducer';
import pipelineManagement from '../pipelineManagement/pipelineManagement.reducer';
import pipelineForm from '../pipelineForm/pipelineForm.reducer';
import pipelineFormData from '../pipelineFormData/pipelineFormData.reducer';
import pipelineCard from '../pipelineCard/pipelineCard.reducer';
import pipelinePhase from '../pipelinePhase/pipelinePhase.reducer';
import pipelineFieldType from '../pipelineFieldType/pipelineFieldType.reducer';
import pipelineParameters from '../pipelineParameters/pipelineParameters.reducer';
import pipelineCardData from '../PipelineCardData/pipelineCardData.reducer';
import cardHistory from '../pipelineCardHistory/pipelineCardHistory.reducer';
import pipelineCardFieldData from '../PipelineCardFieldData/pipelineCardFieldData.reducer';
import phaseFieldsData from '../pipelinePhaseForm/pipelinePhaseForm.reducer';
import newEmployee from '../Employee/employee.reducer';
import task from '../../components/PipelineManagement/icons/Task';
import cardTasks from '../pipelineCardTasks/pipelineCardTasks.reducer';

export default combineReducers({
  acl,
  user,
  runtime,
  intl,
  breadCrumb,
  leads,
  activities,
  person,
  opportunities,
  getProducts,
  sendSms,
  sendEmail,
  users,
  documentToken,
  docDownload,
  fullSearch,
  opportunity,
  kycCapacityManagement,
  lead,
  task,
  applications,
  phoneCalls,
  newActivities,
  search,
  product,
  upload,
  formSetting,
  reports,
  tag,
  assign,
  messageTemplate,
  modals,
  settings,
  loadingBar,
  onComingCall,
  stickyWindow,
  employeeManagement,
  neshanAuth,
  portfolio,
  pipelineManagement,
  pipelineForm,
  pipelineFormData,
  pipelineCard,
  pipelineCardData,
  pipelinePhase,
  pipelineFieldType,
  pipelineParameters,
  cardHistory,
  pipelineCardFieldData,
  phaseFieldsData,
  newEmployee,
  cardTasks,
});
