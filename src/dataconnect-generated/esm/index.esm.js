import { queryRef, executeQuery, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'blog',
  location: 'asia-northeast2'
};

export const listAllInsightsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllInsights');
}
listAllInsightsRef.operationName = 'ListAllInsights';

export function listAllInsights(dc) {
  return executeQuery(listAllInsightsRef(dc));
}

export const getMyProjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyProjects');
}
getMyProjectsRef.operationName = 'GetMyProjects';

export function getMyProjects(dc) {
  return executeQuery(getMyProjectsRef(dc));
}

export const getUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserProfile', inputVars);
}
getUserProfileRef.operationName = 'GetUserProfile';

export function getUserProfile(dcOrVars, vars) {
  return executeQuery(getUserProfileRef(dcOrVars, vars));
}

export const listTimelineRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTimeline');
}
listTimelineRef.operationName = 'ListTimeline';

export function listTimeline(dc) {
  return executeQuery(listTimelineRef(dc));
}

