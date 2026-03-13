import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateInsightData {
  insight_insert: Insight_Key;
}

export interface CreateInsightVariables {
  authorId: UUIDString;
  title: string;
  summary?: string | null;
  content: string;
  tags?: string[] | null;
  published: boolean;
}

export interface CreateProjectData {
  project_insert: Project_Key;
}

export interface CreateProjectVariables {
  authorId: UUIDString;
  title: string;
  description: string;
  techStack?: string[] | null;
  startDate: DateString;
  endDate?: DateString | null;
  liveDemoUrl?: string | null;
  repositoryUrl?: string | null;
  imageUrl?: string | null;
  published: boolean;
  order?: number | null;
}

export interface CreateTimelineData {
  timeline_insert: Timeline_Key;
}

export interface CreateTimelineVariables {
  authorId: UUIDString;
  title: string;
  description?: string | null;
  startDate: DateString;
  endDate?: DateString | null;
  imageUrl?: string | null;
  published: boolean;
  order?: number | null;
}

export interface DeleteInsightData {
  insight_delete?: Insight_Key | null;
}

export interface DeleteInsightVariables {
  id: UUIDString;
}

export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}

export interface DeleteProjectVariables {
  id: UUIDString;
}

export interface DeleteTimelineData {
  timeline_delete?: Timeline_Key | null;
}

export interface DeleteTimelineVariables {
  id: UUIDString;
}

export interface GetAdminUserByEmailData {
  users: ({
    id: UUIDString;
    email: string;
    isAdmin: boolean;
  } & User_Key)[];
}

export interface GetAdminUserByEmailVariables {
  email: string;
}

export interface GetMyProjectsData {
  projects: ({
    id: UUIDString;
    title: string;
    description: string;
    techStack?: string[] | null;
    liveDemoUrl?: string | null;
    repositoryUrl?: string | null;
    startDate: DateString;
    endDate?: DateString | null;
    published: boolean;
    order?: number | null;
  } & Project_Key)[];
}

export interface GetUserProfileData {
  user?: {
    id: UUIDString;
    displayName: string;
    bio?: string | null;
    profilePictureUrl?: string | null;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
  } & User_Key;
}

export interface GetUserProfileVariables {
  id: UUIDString;
}

export interface Insight_Key {
  id: UUIDString;
  __typename?: 'Insight_Key';
}

export interface ListAllInsightsData {
  insights: ({
    id: UUIDString;
    title: string;
    summary?: string | null;
    content: string;
    audioUrl?: string | null;
    audioMood?: string | null;
    tags?: string[] | null;
    createdAt: TimestampString;
    published: boolean;
    author: {
      displayName: string;
      profilePictureUrl?: string | null;
    };
  } & Insight_Key)[];
}

export interface ListTimelineData {
  timelines: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    startDate: DateString;
    endDate?: DateString | null;
    imageUrl?: string | null;
    published: boolean;
  } & Timeline_Key)[];
}

export interface ProjectArticle_Key {
  id: UUIDString;
  __typename?: 'ProjectArticle_Key';
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Timeline_Key {
  id: UUIDString;
  __typename?: 'Timeline_Key';
}

export interface UpdateInsightData {
  insight_update?: Insight_Key | null;
}

export interface UpdateInsightVariables {
  id: UUIDString;
  title?: string | null;
  summary?: string | null;
  content?: string | null;
  tags?: string[] | null;
  published?: boolean | null;
}

export interface UpdateProjectData {
  project_update?: Project_Key | null;
}

export interface UpdateProjectVariables {
  id: UUIDString;
  title?: string | null;
  description?: string | null;
  techStack?: string[] | null;
  startDate?: DateString | null;
  endDate?: DateString | null;
  liveDemoUrl?: string | null;
  repositoryUrl?: string | null;
  imageUrl?: string | null;
  published?: boolean | null;
  order?: number | null;
}

export interface UpdateTimelineData {
  timeline_update?: Timeline_Key | null;
}

export interface UpdateTimelineVariables {
  id: UUIDString;
  title?: string | null;
  description?: string | null;
  startDate?: DateString | null;
  endDate?: DateString | null;
  imageUrl?: string | null;
  published?: boolean | null;
  order?: number | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  operationName: string;
}
export const createProjectRef: CreateProjectRef;

export function createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;
export function createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface UpdateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  operationName: string;
}
export const updateProjectRef: UpdateProjectRef;

export function updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;
export function updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface DeleteProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  operationName: string;
}
export const deleteProjectRef: DeleteProjectRef;

export function deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface CreateInsightRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInsightVariables): MutationRef<CreateInsightData, CreateInsightVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateInsightVariables): MutationRef<CreateInsightData, CreateInsightVariables>;
  operationName: string;
}
export const createInsightRef: CreateInsightRef;

export function createInsight(vars: CreateInsightVariables): MutationPromise<CreateInsightData, CreateInsightVariables>;
export function createInsight(dc: DataConnect, vars: CreateInsightVariables): MutationPromise<CreateInsightData, CreateInsightVariables>;

interface UpdateInsightRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInsightVariables): MutationRef<UpdateInsightData, UpdateInsightVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateInsightVariables): MutationRef<UpdateInsightData, UpdateInsightVariables>;
  operationName: string;
}
export const updateInsightRef: UpdateInsightRef;

export function updateInsight(vars: UpdateInsightVariables): MutationPromise<UpdateInsightData, UpdateInsightVariables>;
export function updateInsight(dc: DataConnect, vars: UpdateInsightVariables): MutationPromise<UpdateInsightData, UpdateInsightVariables>;

interface DeleteInsightRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteInsightVariables): MutationRef<DeleteInsightData, DeleteInsightVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteInsightVariables): MutationRef<DeleteInsightData, DeleteInsightVariables>;
  operationName: string;
}
export const deleteInsightRef: DeleteInsightRef;

export function deleteInsight(vars: DeleteInsightVariables): MutationPromise<DeleteInsightData, DeleteInsightVariables>;
export function deleteInsight(dc: DataConnect, vars: DeleteInsightVariables): MutationPromise<DeleteInsightData, DeleteInsightVariables>;

interface CreateTimelineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTimelineVariables): MutationRef<CreateTimelineData, CreateTimelineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTimelineVariables): MutationRef<CreateTimelineData, CreateTimelineVariables>;
  operationName: string;
}
export const createTimelineRef: CreateTimelineRef;

export function createTimeline(vars: CreateTimelineVariables): MutationPromise<CreateTimelineData, CreateTimelineVariables>;
export function createTimeline(dc: DataConnect, vars: CreateTimelineVariables): MutationPromise<CreateTimelineData, CreateTimelineVariables>;

interface UpdateTimelineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTimelineVariables): MutationRef<UpdateTimelineData, UpdateTimelineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTimelineVariables): MutationRef<UpdateTimelineData, UpdateTimelineVariables>;
  operationName: string;
}
export const updateTimelineRef: UpdateTimelineRef;

export function updateTimeline(vars: UpdateTimelineVariables): MutationPromise<UpdateTimelineData, UpdateTimelineVariables>;
export function updateTimeline(dc: DataConnect, vars: UpdateTimelineVariables): MutationPromise<UpdateTimelineData, UpdateTimelineVariables>;

interface DeleteTimelineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTimelineVariables): MutationRef<DeleteTimelineData, DeleteTimelineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTimelineVariables): MutationRef<DeleteTimelineData, DeleteTimelineVariables>;
  operationName: string;
}
export const deleteTimelineRef: DeleteTimelineRef;

export function deleteTimeline(vars: DeleteTimelineVariables): MutationPromise<DeleteTimelineData, DeleteTimelineVariables>;
export function deleteTimeline(dc: DataConnect, vars: DeleteTimelineVariables): MutationPromise<DeleteTimelineData, DeleteTimelineVariables>;

interface ListAllInsightsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllInsightsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllInsightsData, undefined>;
  operationName: string;
}
export const listAllInsightsRef: ListAllInsightsRef;

export function listAllInsights(): QueryPromise<ListAllInsightsData, undefined>;
export function listAllInsights(dc: DataConnect): QueryPromise<ListAllInsightsData, undefined>;

interface GetMyProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyProjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyProjectsData, undefined>;
  operationName: string;
}
export const getMyProjectsRef: GetMyProjectsRef;

export function getMyProjects(): QueryPromise<GetMyProjectsData, undefined>;
export function getMyProjects(dc: DataConnect): QueryPromise<GetMyProjectsData, undefined>;

interface GetUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserProfileVariables): QueryRef<GetUserProfileData, GetUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserProfileVariables): QueryRef<GetUserProfileData, GetUserProfileVariables>;
  operationName: string;
}
export const getUserProfileRef: GetUserProfileRef;

export function getUserProfile(vars: GetUserProfileVariables): QueryPromise<GetUserProfileData, GetUserProfileVariables>;
export function getUserProfile(dc: DataConnect, vars: GetUserProfileVariables): QueryPromise<GetUserProfileData, GetUserProfileVariables>;

interface ListTimelineRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTimelineData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTimelineData, undefined>;
  operationName: string;
}
export const listTimelineRef: ListTimelineRef;

export function listTimeline(): QueryPromise<ListTimelineData, undefined>;
export function listTimeline(dc: DataConnect): QueryPromise<ListTimelineData, undefined>;

interface GetAdminUserByEmailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAdminUserByEmailVariables): QueryRef<GetAdminUserByEmailData, GetAdminUserByEmailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAdminUserByEmailVariables): QueryRef<GetAdminUserByEmailData, GetAdminUserByEmailVariables>;
  operationName: string;
}
export const getAdminUserByEmailRef: GetAdminUserByEmailRef;

export function getAdminUserByEmail(vars: GetAdminUserByEmailVariables): QueryPromise<GetAdminUserByEmailData, GetAdminUserByEmailVariables>;
export function getAdminUserByEmail(dc: DataConnect, vars: GetAdminUserByEmailVariables): QueryPromise<GetAdminUserByEmailData, GetAdminUserByEmailVariables>;

