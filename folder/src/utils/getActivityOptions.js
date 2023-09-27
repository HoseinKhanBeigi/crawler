import {
  appSource,
  activitySources,
  actorTypes,
  creators,
  followUpSources,
} from './activitySourceData';

export const getActionOption = actionTypes =>
  Object.keys(actionTypes)?.map(item => ({
    text: actionTypes[item],
    value: item,
  }));

export const getActivitySourceOption = () =>
  Object.keys(activitySources).map(item => ({
    text: activitySources[item],
    value: item,
  }));

export const getAppSourceOption = () =>
  Object.keys(appSource).map(item => ({
    text: appSource[item],
    value: item,
  }));

export const getFollowUpSourcesOption = () =>
  Object.keys(followUpSources).map(item => ({
    text: followUpSources[item],
    value: item,
  }));

export const getActorTypeOption = () =>
  Object.keys(actorTypes).map(item => ({
    text: actorTypes[item],
    value: item,
  }));

export const getCreatorOption = () =>
  Object.keys(creators).map(item => ({
    text: creators[item],
    value: item,
  }));
