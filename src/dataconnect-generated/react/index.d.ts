import { ListAllInsightsData, GetMyProjectsData, GetUserProfileData, GetUserProfileVariables, ListTimelineData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult} from '@tanstack/react-query';
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
