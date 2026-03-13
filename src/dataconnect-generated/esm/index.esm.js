import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'blog',
  location: 'asia-northeast2'
};

export const createProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProject', inputVars);
}
createProjectRef.operationName = 'CreateProject';

export function createProject(dcOrVars, vars) {
  return executeMutation(createProjectRef(dcOrVars, vars));
}

export const updateProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProject', inputVars);
}
updateProjectRef.operationName = 'UpdateProject';

export function updateProject(dcOrVars, vars) {
  return executeMutation(updateProjectRef(dcOrVars, vars));
}

export const deleteProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProject', inputVars);
}
deleteProjectRef.operationName = 'DeleteProject';

export function deleteProject(dcOrVars, vars) {
  return executeMutation(deleteProjectRef(dcOrVars, vars));
}

export const createInsightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInsight', inputVars);
}
createInsightRef.operationName = 'CreateInsight';

export function createInsight(dcOrVars, vars) {
  return executeMutation(createInsightRef(dcOrVars, vars));
}

export const updateInsightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInsight', inputVars);
}
updateInsightRef.operationName = 'UpdateInsight';

export function updateInsight(dcOrVars, vars) {
  return executeMutation(updateInsightRef(dcOrVars, vars));
}

export const deleteInsightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteInsight', inputVars);
}
deleteInsightRef.operationName = 'DeleteInsight';

export function deleteInsight(dcOrVars, vars) {
  return executeMutation(deleteInsightRef(dcOrVars, vars));
}

export const createTimelineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTimeline', inputVars);
}
createTimelineRef.operationName = 'CreateTimeline';

export function createTimeline(dcOrVars, vars) {
  return executeMutation(createTimelineRef(dcOrVars, vars));
}

export const updateTimelineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTimeline', inputVars);
}
updateTimelineRef.operationName = 'UpdateTimeline';

export function updateTimeline(dcOrVars, vars) {
  return executeMutation(updateTimelineRef(dcOrVars, vars));
}

export const deleteTimelineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTimeline', inputVars);
}
deleteTimelineRef.operationName = 'DeleteTimeline';

export function deleteTimeline(dcOrVars, vars) {
  return executeMutation(deleteTimelineRef(dcOrVars, vars));
}

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

export const getAdminUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAdminUserByEmail', inputVars);
}
getAdminUserByEmailRef.operationName = 'GetAdminUserByEmail';

export function getAdminUserByEmail(dcOrVars, vars) {
  return executeQuery(getAdminUserByEmailRef(dcOrVars, vars));
}

