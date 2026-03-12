import { ConnectorConfig, DataConnect, QueryRef, QueryPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




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

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

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

