import { ListAllInsightsData, GetMyProjectsData, GetUserProfileData, GetUserProfileVariables, ListTimelineData, GetAdminUserByEmailData, GetAdminUserByEmailVariables, ListProjectArticlesData, ListProjectArticlesVariables, GetProjectArticleData, GetProjectArticleVariables, CreateProjectData, CreateProjectVariables, UpdateProjectData, UpdateProjectVariables, DeleteProjectData, DeleteProjectVariables, CreateProjectArticleData, CreateProjectArticleVariables, UpdateProjectArticleData, UpdateProjectArticleVariables, DeleteProjectArticleData, DeleteProjectArticleVariables, CreateInsightData, CreateInsightVariables, UpdateInsightData, UpdateInsightVariables, DeleteInsightData, DeleteInsightVariables, CreateTimelineData, CreateTimelineVariables, UpdateTimelineData, UpdateTimelineVariables, DeleteTimelineData, DeleteTimelineVariables, UpdateInsightViewsData, UpdateInsightViewsVariables, UpdateProjectViewsData, UpdateProjectViewsVariables, UpdateTimelineViewsData, UpdateTimelineViewsVariables, UpdateProjectArticleViewsData, UpdateProjectArticleViewsVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListAllInsights(options?: useDataConnectQueryOptions<ListAllInsightsData>): UseDataConnectQueryResult<ListAllInsightsData, undefined>;
export function useListAllInsights(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllInsightsData>): UseDataConnectQueryResult<ListAllInsightsData, undefined>;

export function useGetMyProjects(options?: useDataConnectQueryOptions<GetMyProjectsData>): UseDataConnectQueryResult<GetMyProjectsData, undefined>;
export function useGetMyProjects(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyProjectsData>): UseDataConnectQueryResult<GetMyProjectsData, undefined>;

export function useGetUserProfile(vars: GetUserProfileVariables, options?: useDataConnectQueryOptions<GetUserProfileData>): UseDataConnectQueryResult<GetUserProfileData, GetUserProfileVariables>;
export function useGetUserProfile(dc: DataConnect, vars: GetUserProfileVariables, options?: useDataConnectQueryOptions<GetUserProfileData>): UseDataConnectQueryResult<GetUserProfileData, GetUserProfileVariables>;

export function useListTimeline(options?: useDataConnectQueryOptions<ListTimelineData>): UseDataConnectQueryResult<ListTimelineData, undefined>;
export function useListTimeline(dc: DataConnect, options?: useDataConnectQueryOptions<ListTimelineData>): UseDataConnectQueryResult<ListTimelineData, undefined>;

export function useGetAdminUserByEmail(vars: GetAdminUserByEmailVariables, options?: useDataConnectQueryOptions<GetAdminUserByEmailData>): UseDataConnectQueryResult<GetAdminUserByEmailData, GetAdminUserByEmailVariables>;
export function useGetAdminUserByEmail(dc: DataConnect, vars: GetAdminUserByEmailVariables, options?: useDataConnectQueryOptions<GetAdminUserByEmailData>): UseDataConnectQueryResult<GetAdminUserByEmailData, GetAdminUserByEmailVariables>;

export function useListProjectArticles(vars: ListProjectArticlesVariables, options?: useDataConnectQueryOptions<ListProjectArticlesData>): UseDataConnectQueryResult<ListProjectArticlesData, ListProjectArticlesVariables>;
export function useListProjectArticles(dc: DataConnect, vars: ListProjectArticlesVariables, options?: useDataConnectQueryOptions<ListProjectArticlesData>): UseDataConnectQueryResult<ListProjectArticlesData, ListProjectArticlesVariables>;

export function useGetProjectArticle(vars: GetProjectArticleVariables, options?: useDataConnectQueryOptions<GetProjectArticleData>): UseDataConnectQueryResult<GetProjectArticleData, GetProjectArticleVariables>;
export function useGetProjectArticle(dc: DataConnect, vars: GetProjectArticleVariables, options?: useDataConnectQueryOptions<GetProjectArticleData>): UseDataConnectQueryResult<GetProjectArticleData, GetProjectArticleVariables>;

export function useCreateProject(options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;
export function useCreateProject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;

export function useUpdateProject(options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;
export function useUpdateProject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;

export function useDeleteProject(options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
export function useDeleteProject(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;

export function useCreateProjectArticle(options?: useDataConnectMutationOptions<CreateProjectArticleData, FirebaseError, CreateProjectArticleVariables>): UseDataConnectMutationResult<CreateProjectArticleData, CreateProjectArticleVariables>;
export function useCreateProjectArticle(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectArticleData, FirebaseError, CreateProjectArticleVariables>): UseDataConnectMutationResult<CreateProjectArticleData, CreateProjectArticleVariables>;

export function useUpdateProjectArticle(options?: useDataConnectMutationOptions<UpdateProjectArticleData, FirebaseError, UpdateProjectArticleVariables>): UseDataConnectMutationResult<UpdateProjectArticleData, UpdateProjectArticleVariables>;
export function useUpdateProjectArticle(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectArticleData, FirebaseError, UpdateProjectArticleVariables>): UseDataConnectMutationResult<UpdateProjectArticleData, UpdateProjectArticleVariables>;

export function useDeleteProjectArticle(options?: useDataConnectMutationOptions<DeleteProjectArticleData, FirebaseError, DeleteProjectArticleVariables>): UseDataConnectMutationResult<DeleteProjectArticleData, DeleteProjectArticleVariables>;
export function useDeleteProjectArticle(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectArticleData, FirebaseError, DeleteProjectArticleVariables>): UseDataConnectMutationResult<DeleteProjectArticleData, DeleteProjectArticleVariables>;

export function useCreateInsight(options?: useDataConnectMutationOptions<CreateInsightData, FirebaseError, CreateInsightVariables>): UseDataConnectMutationResult<CreateInsightData, CreateInsightVariables>;
export function useCreateInsight(dc: DataConnect, options?: useDataConnectMutationOptions<CreateInsightData, FirebaseError, CreateInsightVariables>): UseDataConnectMutationResult<CreateInsightData, CreateInsightVariables>;

export function useUpdateInsight(options?: useDataConnectMutationOptions<UpdateInsightData, FirebaseError, UpdateInsightVariables>): UseDataConnectMutationResult<UpdateInsightData, UpdateInsightVariables>;
export function useUpdateInsight(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateInsightData, FirebaseError, UpdateInsightVariables>): UseDataConnectMutationResult<UpdateInsightData, UpdateInsightVariables>;

export function useDeleteInsight(options?: useDataConnectMutationOptions<DeleteInsightData, FirebaseError, DeleteInsightVariables>): UseDataConnectMutationResult<DeleteInsightData, DeleteInsightVariables>;
export function useDeleteInsight(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteInsightData, FirebaseError, DeleteInsightVariables>): UseDataConnectMutationResult<DeleteInsightData, DeleteInsightVariables>;

export function useCreateTimeline(options?: useDataConnectMutationOptions<CreateTimelineData, FirebaseError, CreateTimelineVariables>): UseDataConnectMutationResult<CreateTimelineData, CreateTimelineVariables>;
export function useCreateTimeline(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTimelineData, FirebaseError, CreateTimelineVariables>): UseDataConnectMutationResult<CreateTimelineData, CreateTimelineVariables>;

export function useUpdateTimeline(options?: useDataConnectMutationOptions<UpdateTimelineData, FirebaseError, UpdateTimelineVariables>): UseDataConnectMutationResult<UpdateTimelineData, UpdateTimelineVariables>;
export function useUpdateTimeline(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTimelineData, FirebaseError, UpdateTimelineVariables>): UseDataConnectMutationResult<UpdateTimelineData, UpdateTimelineVariables>;

export function useDeleteTimeline(options?: useDataConnectMutationOptions<DeleteTimelineData, FirebaseError, DeleteTimelineVariables>): UseDataConnectMutationResult<DeleteTimelineData, DeleteTimelineVariables>;
export function useDeleteTimeline(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTimelineData, FirebaseError, DeleteTimelineVariables>): UseDataConnectMutationResult<DeleteTimelineData, DeleteTimelineVariables>;

export function useUpdateInsightViews(options?: useDataConnectMutationOptions<UpdateInsightViewsData, FirebaseError, UpdateInsightViewsVariables>): UseDataConnectMutationResult<UpdateInsightViewsData, UpdateInsightViewsVariables>;
export function useUpdateInsightViews(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateInsightViewsData, FirebaseError, UpdateInsightViewsVariables>): UseDataConnectMutationResult<UpdateInsightViewsData, UpdateInsightViewsVariables>;

export function useUpdateProjectViews(options?: useDataConnectMutationOptions<UpdateProjectViewsData, FirebaseError, UpdateProjectViewsVariables>): UseDataConnectMutationResult<UpdateProjectViewsData, UpdateProjectViewsVariables>;
export function useUpdateProjectViews(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectViewsData, FirebaseError, UpdateProjectViewsVariables>): UseDataConnectMutationResult<UpdateProjectViewsData, UpdateProjectViewsVariables>;

export function useUpdateTimelineViews(options?: useDataConnectMutationOptions<UpdateTimelineViewsData, FirebaseError, UpdateTimelineViewsVariables>): UseDataConnectMutationResult<UpdateTimelineViewsData, UpdateTimelineViewsVariables>;
export function useUpdateTimelineViews(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTimelineViewsData, FirebaseError, UpdateTimelineViewsVariables>): UseDataConnectMutationResult<UpdateTimelineViewsData, UpdateTimelineViewsVariables>;

export function useUpdateProjectArticleViews(options?: useDataConnectMutationOptions<UpdateProjectArticleViewsData, FirebaseError, UpdateProjectArticleViewsVariables>): UseDataConnectMutationResult<UpdateProjectArticleViewsData, UpdateProjectArticleViewsVariables>;
export function useUpdateProjectArticleViews(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectArticleViewsData, FirebaseError, UpdateProjectArticleViewsVariables>): UseDataConnectMutationResult<UpdateProjectArticleViewsData, UpdateProjectArticleViewsVariables>;
