const { queryRef, executeQuery, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'blog',
  location: 'asia-northeast2'
};
exports.connectorConfig = connectorConfig;

const listAllInsightsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllInsights');
}
listAllInsightsRef.operationName = 'ListAllInsights';
exports.listAllInsightsRef = listAllInsightsRef;

exports.listAllInsights = function listAllInsights(dc) {
  return executeQuery(listAllInsightsRef(dc));
};

const getMyProjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyProjects');
}
getMyProjectsRef.operationName = 'GetMyProjects';
exports.getMyProjectsRef = getMyProjectsRef;

exports.getMyProjects = function getMyProjects(dc) {
  return executeQuery(getMyProjectsRef(dc));
};

const getUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserProfile', inputVars);
}
getUserProfileRef.operationName = 'GetUserProfile';
exports.getUserProfileRef = getUserProfileRef;

exports.getUserProfile = function getUserProfile(dcOrVars, vars) {
  return executeQuery(getUserProfileRef(dcOrVars, vars));
};

const listTimelineRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTimeline');
}
listTimelineRef.operationName = 'ListTimeline';
exports.listTimelineRef = listTimelineRef;

exports.listTimeline = function listTimeline(dc) {
  return executeQuery(listTimelineRef(dc));
};
