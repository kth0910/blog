import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CommentProfile_Key {
  id: UUIDString;
  __typename?: 'CommentProfile_Key';
}

export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CreateCommentData {
  comment_insert: Comment_Key;
}

export interface CreateCommentProfileData {
  commentProfile_insert: CommentProfile_Key;
}

export interface CreateCommentProfileVariables {
  clientId: string;
  nickname: string;
}

export interface CreateCommentVariables {
  authorProfileId: UUIDString;
  postType: string;
  postId: UUIDString;
  nicknameSnapshot: string;
  content: string;
}

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
  audioUrl?: string | null;
  audioMood?: string | null;
  audioTitle?: string | null;
}

export interface CreateProjectArticleData {
  projectArticle_insert: ProjectArticle_Key;
}

export interface CreateProjectArticleVariables {
  authorId: UUIDString;
  projectId: UUIDString;
  title: string;
  content: string;
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

export interface DeleteCommentData {
  comment_delete?: Comment_Key | null;
}

export interface DeleteCommentVariables {
  id: UUIDString;
}

export interface DeleteInsightData {
  insight_delete?: Insight_Key | null;
}

export interface DeleteInsightVariables {
  id: UUIDString;
}

export interface DeleteProjectArticleData {
  projectArticle_delete?: ProjectArticle_Key | null;
}

export interface DeleteProjectArticleVariables {
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

export interface GetCommentProfileByClientIdData {
  commentProfiles: ({
    id: UUIDString;
    clientId: string;
    nickname: string;
    lockedAt: TimestampString;
  } & CommentProfile_Key)[];
}

export interface GetCommentProfileByClientIdVariables {
  clientId: string;
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
    views: number;
  } & Project_Key)[];
}

export interface GetProjectArticleData {
  projectArticle?: {
    id: UUIDString;
    title: string;
    content: string;
    createdAt: TimestampString;
    views: number;
    project: {
      id: UUIDString;
      title: string;
    } & Project_Key;
  } & ProjectArticle_Key;
}

export interface GetProjectArticleVariables {
  id: UUIDString;
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

export interface ListAllCommentsForAdminData {
  comments: ({
    id: UUIDString;
    postType: string;
    postId: UUIDString;
    nicknameSnapshot: string;
    content: string;
    createdAt: TimestampString;
  } & Comment_Key)[];
}

export interface ListAllInsightsData {
  insights: ({
    id: UUIDString;
    title: string;
    summary?: string | null;
    content: string;
    audioUrl?: string | null;
    audioMood?: string | null;
    audioTitle?: string | null;
    tags?: string[] | null;
    createdAt: TimestampString;
    published: boolean;
    views: number;
    author: {
      displayName: string;
      profilePictureUrl?: string | null;
    };
  } & Insight_Key)[];
}

export interface ListCommentsByPostData {
  comments: ({
    id: UUIDString;
    nicknameSnapshot: string;
    content: string;
    createdAt: TimestampString;
  } & Comment_Key)[];
}

export interface ListCommentsByPostVariables {
  postType: string;
  postId: UUIDString;
}

export interface ListProjectArticlesData {
  projectArticles: ({
    id: UUIDString;
    title: string;
    createdAt: TimestampString;
    views: number;
  } & ProjectArticle_Key)[];
}

export interface ListProjectArticlesVariables {
  projectId: UUIDString;
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
    views: number;
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
  audioUrl?: string | null;
  audioMood?: string | null;
  audioTitle?: string | null;
}

export interface UpdateInsightViewsData {
  insight_update?: Insight_Key | null;
}

export interface UpdateInsightViewsVariables {
  id: UUIDString;
}

export interface UpdateProjectArticleData {
  projectArticle_update?: ProjectArticle_Key | null;
}

export interface UpdateProjectArticleVariables {
  id: UUIDString;
  title?: string | null;
  content?: string | null;
  published?: boolean | null;
}

export interface UpdateProjectArticleViewsData {
  projectArticle_update?: ProjectArticle_Key | null;
}

export interface UpdateProjectArticleViewsVariables {
  id: UUIDString;
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

export interface UpdateProjectViewsData {
  project_update?: Project_Key | null;
}

export interface UpdateProjectViewsVariables {
  id: UUIDString;
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

export interface UpdateTimelineViewsData {
  timeline_update?: Timeline_Key | null;
}

export interface UpdateTimelineViewsVariables {
  id: UUIDString;
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

interface CreateProjectArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectArticleVariables): MutationRef<CreateProjectArticleData, CreateProjectArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectArticleVariables): MutationRef<CreateProjectArticleData, CreateProjectArticleVariables>;
  operationName: string;
}
export const createProjectArticleRef: CreateProjectArticleRef;

export function createProjectArticle(vars: CreateProjectArticleVariables): MutationPromise<CreateProjectArticleData, CreateProjectArticleVariables>;
export function createProjectArticle(dc: DataConnect, vars: CreateProjectArticleVariables): MutationPromise<CreateProjectArticleData, CreateProjectArticleVariables>;

interface UpdateProjectArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectArticleVariables): MutationRef<UpdateProjectArticleData, UpdateProjectArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectArticleVariables): MutationRef<UpdateProjectArticleData, UpdateProjectArticleVariables>;
  operationName: string;
}
export const updateProjectArticleRef: UpdateProjectArticleRef;

export function updateProjectArticle(vars: UpdateProjectArticleVariables): MutationPromise<UpdateProjectArticleData, UpdateProjectArticleVariables>;
export function updateProjectArticle(dc: DataConnect, vars: UpdateProjectArticleVariables): MutationPromise<UpdateProjectArticleData, UpdateProjectArticleVariables>;

interface DeleteProjectArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectArticleVariables): MutationRef<DeleteProjectArticleData, DeleteProjectArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectArticleVariables): MutationRef<DeleteProjectArticleData, DeleteProjectArticleVariables>;
  operationName: string;
}
export const deleteProjectArticleRef: DeleteProjectArticleRef;

export function deleteProjectArticle(vars: DeleteProjectArticleVariables): MutationPromise<DeleteProjectArticleData, DeleteProjectArticleVariables>;
export function deleteProjectArticle(dc: DataConnect, vars: DeleteProjectArticleVariables): MutationPromise<DeleteProjectArticleData, DeleteProjectArticleVariables>;

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

interface DeleteCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCommentVariables): MutationRef<DeleteCommentData, DeleteCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCommentVariables): MutationRef<DeleteCommentData, DeleteCommentVariables>;
  operationName: string;
}
export const deleteCommentRef: DeleteCommentRef;

export function deleteComment(vars: DeleteCommentVariables): MutationPromise<DeleteCommentData, DeleteCommentVariables>;
export function deleteComment(dc: DataConnect, vars: DeleteCommentVariables): MutationPromise<DeleteCommentData, DeleteCommentVariables>;

interface UpdateInsightViewsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInsightViewsVariables): MutationRef<UpdateInsightViewsData, UpdateInsightViewsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateInsightViewsVariables): MutationRef<UpdateInsightViewsData, UpdateInsightViewsVariables>;
  operationName: string;
}
export const updateInsightViewsRef: UpdateInsightViewsRef;

export function updateInsightViews(vars: UpdateInsightViewsVariables): MutationPromise<UpdateInsightViewsData, UpdateInsightViewsVariables>;
export function updateInsightViews(dc: DataConnect, vars: UpdateInsightViewsVariables): MutationPromise<UpdateInsightViewsData, UpdateInsightViewsVariables>;

interface UpdateProjectViewsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectViewsVariables): MutationRef<UpdateProjectViewsData, UpdateProjectViewsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectViewsVariables): MutationRef<UpdateProjectViewsData, UpdateProjectViewsVariables>;
  operationName: string;
}
export const updateProjectViewsRef: UpdateProjectViewsRef;

export function updateProjectViews(vars: UpdateProjectViewsVariables): MutationPromise<UpdateProjectViewsData, UpdateProjectViewsVariables>;
export function updateProjectViews(dc: DataConnect, vars: UpdateProjectViewsVariables): MutationPromise<UpdateProjectViewsData, UpdateProjectViewsVariables>;

interface UpdateTimelineViewsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTimelineViewsVariables): MutationRef<UpdateTimelineViewsData, UpdateTimelineViewsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTimelineViewsVariables): MutationRef<UpdateTimelineViewsData, UpdateTimelineViewsVariables>;
  operationName: string;
}
export const updateTimelineViewsRef: UpdateTimelineViewsRef;

export function updateTimelineViews(vars: UpdateTimelineViewsVariables): MutationPromise<UpdateTimelineViewsData, UpdateTimelineViewsVariables>;
export function updateTimelineViews(dc: DataConnect, vars: UpdateTimelineViewsVariables): MutationPromise<UpdateTimelineViewsData, UpdateTimelineViewsVariables>;

interface UpdateProjectArticleViewsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectArticleViewsVariables): MutationRef<UpdateProjectArticleViewsData, UpdateProjectArticleViewsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectArticleViewsVariables): MutationRef<UpdateProjectArticleViewsData, UpdateProjectArticleViewsVariables>;
  operationName: string;
}
export const updateProjectArticleViewsRef: UpdateProjectArticleViewsRef;

export function updateProjectArticleViews(vars: UpdateProjectArticleViewsVariables): MutationPromise<UpdateProjectArticleViewsData, UpdateProjectArticleViewsVariables>;
export function updateProjectArticleViews(dc: DataConnect, vars: UpdateProjectArticleViewsVariables): MutationPromise<UpdateProjectArticleViewsData, UpdateProjectArticleViewsVariables>;

interface CreateCommentProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommentProfileVariables): MutationRef<CreateCommentProfileData, CreateCommentProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCommentProfileVariables): MutationRef<CreateCommentProfileData, CreateCommentProfileVariables>;
  operationName: string;
}
export const createCommentProfileRef: CreateCommentProfileRef;

export function createCommentProfile(vars: CreateCommentProfileVariables): MutationPromise<CreateCommentProfileData, CreateCommentProfileVariables>;
export function createCommentProfile(dc: DataConnect, vars: CreateCommentProfileVariables): MutationPromise<CreateCommentProfileData, CreateCommentProfileVariables>;

interface CreateCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  operationName: string;
}
export const createCommentRef: CreateCommentRef;

export function createComment(vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;
export function createComment(dc: DataConnect, vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;

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

interface ListProjectArticlesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectArticlesVariables): QueryRef<ListProjectArticlesData, ListProjectArticlesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProjectArticlesVariables): QueryRef<ListProjectArticlesData, ListProjectArticlesVariables>;
  operationName: string;
}
export const listProjectArticlesRef: ListProjectArticlesRef;

export function listProjectArticles(vars: ListProjectArticlesVariables): QueryPromise<ListProjectArticlesData, ListProjectArticlesVariables>;
export function listProjectArticles(dc: DataConnect, vars: ListProjectArticlesVariables): QueryPromise<ListProjectArticlesData, ListProjectArticlesVariables>;

interface GetProjectArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectArticleVariables): QueryRef<GetProjectArticleData, GetProjectArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectArticleVariables): QueryRef<GetProjectArticleData, GetProjectArticleVariables>;
  operationName: string;
}
export const getProjectArticleRef: GetProjectArticleRef;

export function getProjectArticle(vars: GetProjectArticleVariables): QueryPromise<GetProjectArticleData, GetProjectArticleVariables>;
export function getProjectArticle(dc: DataConnect, vars: GetProjectArticleVariables): QueryPromise<GetProjectArticleData, GetProjectArticleVariables>;

interface GetCommentProfileByClientIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCommentProfileByClientIdVariables): QueryRef<GetCommentProfileByClientIdData, GetCommentProfileByClientIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCommentProfileByClientIdVariables): QueryRef<GetCommentProfileByClientIdData, GetCommentProfileByClientIdVariables>;
  operationName: string;
}
export const getCommentProfileByClientIdRef: GetCommentProfileByClientIdRef;

export function getCommentProfileByClientId(vars: GetCommentProfileByClientIdVariables): QueryPromise<GetCommentProfileByClientIdData, GetCommentProfileByClientIdVariables>;
export function getCommentProfileByClientId(dc: DataConnect, vars: GetCommentProfileByClientIdVariables): QueryPromise<GetCommentProfileByClientIdData, GetCommentProfileByClientIdVariables>;

interface ListCommentsByPostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCommentsByPostVariables): QueryRef<ListCommentsByPostData, ListCommentsByPostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCommentsByPostVariables): QueryRef<ListCommentsByPostData, ListCommentsByPostVariables>;
  operationName: string;
}
export const listCommentsByPostRef: ListCommentsByPostRef;

export function listCommentsByPost(vars: ListCommentsByPostVariables): QueryPromise<ListCommentsByPostData, ListCommentsByPostVariables>;
export function listCommentsByPost(dc: DataConnect, vars: ListCommentsByPostVariables): QueryPromise<ListCommentsByPostData, ListCommentsByPostVariables>;

interface ListAllCommentsForAdminRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllCommentsForAdminData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllCommentsForAdminData, undefined>;
  operationName: string;
}
export const listAllCommentsForAdminRef: ListAllCommentsForAdminRef;

export function listAllCommentsForAdmin(): QueryPromise<ListAllCommentsForAdminData, undefined>;
export function listAllCommentsForAdmin(dc: DataConnect): QueryPromise<ListAllCommentsForAdminData, undefined>;

