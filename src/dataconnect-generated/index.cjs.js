const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'blog',
  location: 'asia-northeast2'
};
exports.connectorConfig = connectorConfig;

const createProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProject', inputVars);
}
createProjectRef.operationName = 'CreateProject';
exports.createProjectRef = createProjectRef;

exports.createProject = function createProject(dcOrVars, vars) {
  return executeMutation(createProjectRef(dcOrVars, vars));
};

const updateProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProject', inputVars);
}
updateProjectRef.operationName = 'UpdateProject';
exports.updateProjectRef = updateProjectRef;

exports.updateProject = function updateProject(dcOrVars, vars) {
  return executeMutation(updateProjectRef(dcOrVars, vars));
};

const deleteProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProject', inputVars);
}
deleteProjectRef.operationName = 'DeleteProject';
exports.deleteProjectRef = deleteProjectRef;

exports.deleteProject = function deleteProject(dcOrVars, vars) {
  return executeMutation(deleteProjectRef(dcOrVars, vars));
};

const createInsightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInsight', inputVars);
}
createInsightRef.operationName = 'CreateInsight';
exports.createInsightRef = createInsightRef;

exports.createInsight = function createInsight(dcOrVars, vars) {
  return executeMutation(createInsightRef(dcOrVars, vars));
};

const updateInsightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInsight', inputVars);
}
updateInsightRef.operationName = 'UpdateInsight';
exports.updateInsightRef = updateInsightRef;

exports.updateInsight = function updateInsight(dcOrVars, vars) {
  return executeMutation(updateInsightRef(dcOrVars, vars));
};

const deleteInsightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteInsight', inputVars);
}
deleteInsightRef.operationName = 'DeleteInsight';
exports.deleteInsightRef = deleteInsightRef;

exports.deleteInsight = function deleteInsight(dcOrVars, vars) {
  return executeMutation(deleteInsightRef(dcOrVars, vars));
};

const createTimelineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTimeline', inputVars);
}
createTimelineRef.operationName = 'CreateTimeline';
exports.createTimelineRef = createTimelineRef;

exports.createTimeline = function createTimeline(dcOrVars, vars) {
  return executeMutation(createTimelineRef(dcOrVars, vars));
};

const updateTimelineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTimeline', inputVars);
}
updateTimelineRef.operationName = 'UpdateTimeline';
exports.updateTimelineRef = updateTimelineRef;

exports.updateTimeline = function updateTimeline(dcOrVars, vars) {
  return executeMutation(updateTimelineRef(dcOrVars, vars));
};

const deleteTimelineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTimeline', inputVars);
}
deleteTimelineRef.operationName = 'DeleteTimeline';
exports.deleteTimelineRef = deleteTimelineRef;

exports.deleteTimeline = function deleteTimeline(dcOrVars, vars) {
  return executeMutation(deleteTimelineRef(dcOrVars, vars));
};

const updateInsightViewsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInsightViews', inputVars);
}
updateInsightViewsRef.operationName = 'UpdateInsightViews';
exports.updateInsightViewsRef = updateInsightViewsRef;

exports.updateInsightViews = function updateInsightViews(dcOrVars, vars) {
  return executeMutation(updateInsightViewsRef(dcOrVars, vars));
};

const updateProjectViewsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectViews', inputVars);
}
updateProjectViewsRef.operationName = 'UpdateProjectViews';
exports.updateProjectViewsRef = updateProjectViewsRef;

exports.updateProjectViews = function updateProjectViews(dcOrVars, vars) {
  return executeMutation(updateProjectViewsRef(dcOrVars, vars));
};

const updateTimelineViewsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTimelineViews', inputVars);
}
updateTimelineViewsRef.operationName = 'UpdateTimelineViews';
exports.updateTimelineViewsRef = updateTimelineViewsRef;

exports.updateTimelineViews = function updateTimelineViews(dcOrVars, vars) {
  return executeMutation(updateTimelineViewsRef(dcOrVars, vars));
};

const updateProjectArticleViewsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectArticleViews', inputVars);
}
updateProjectArticleViewsRef.operationName = 'UpdateProjectArticleViews';
exports.updateProjectArticleViewsRef = updateProjectArticleViewsRef;

exports.updateProjectArticleViews = function updateProjectArticleViews(dcOrVars, vars) {
  return executeMutation(updateProjectArticleViewsRef(dcOrVars, vars));
};

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

const getAdminUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAdminUserByEmail', inputVars);
}
getAdminUserByEmailRef.operationName = 'GetAdminUserByEmail';
exports.getAdminUserByEmailRef = getAdminUserByEmailRef;

exports.getAdminUserByEmail = function getAdminUserByEmail(dcOrVars, vars) {
  return executeQuery(getAdminUserByEmailRef(dcOrVars, vars));
};
