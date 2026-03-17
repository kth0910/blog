# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllInsights*](#listallinsights)
  - [*GetMyProjects*](#getmyprojects)
  - [*GetUserProfile*](#getuserprofile)
  - [*ListTimeline*](#listtimeline)
  - [*GetAdminUserByEmail*](#getadminuserbyemail)
- [**Mutations**](#mutations)
  - [*CreateProject*](#createproject)
  - [*UpdateProject*](#updateproject)
  - [*DeleteProject*](#deleteproject)
  - [*CreateInsight*](#createinsight)
  - [*UpdateInsight*](#updateinsight)
  - [*DeleteInsight*](#deleteinsight)
  - [*CreateTimeline*](#createtimeline)
  - [*UpdateTimeline*](#updatetimeline)
  - [*DeleteTimeline*](#deletetimeline)
  - [*UpdateInsightViews*](#updateinsightviews)
  - [*UpdateProjectViews*](#updateprojectviews)
  - [*UpdateTimelineViews*](#updatetimelineviews)
  - [*UpdateProjectArticleViews*](#updateprojectarticleviews)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllInsights
You can execute the `ListAllInsights` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllInsights(): QueryPromise<ListAllInsightsData, undefined>;

interface ListAllInsightsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllInsightsData, undefined>;
}
export const listAllInsightsRef: ListAllInsightsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllInsights(dc: DataConnect): QueryPromise<ListAllInsightsData, undefined>;

interface ListAllInsightsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllInsightsData, undefined>;
}
export const listAllInsightsRef: ListAllInsightsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllInsightsRef:
```typescript
const name = listAllInsightsRef.operationName;
console.log(name);
```

### Variables
The `ListAllInsights` query has no variables.
### Return Type
Recall that executing the `ListAllInsights` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllInsightsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllInsights`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllInsights } from '@dataconnect/generated';


// Call the `listAllInsights()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllInsights();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllInsights(dataConnect);

console.log(data.insights);

// Or, you can use the `Promise` API.
listAllInsights().then((response) => {
  const data = response.data;
  console.log(data.insights);
});
```

### Using `ListAllInsights`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllInsightsRef } from '@dataconnect/generated';


// Call the `listAllInsightsRef()` function to get a reference to the query.
const ref = listAllInsightsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllInsightsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.insights);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.insights);
});
```

## GetMyProjects
You can execute the `GetMyProjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyProjects(): QueryPromise<GetMyProjectsData, undefined>;

interface GetMyProjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyProjectsData, undefined>;
}
export const getMyProjectsRef: GetMyProjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyProjects(dc: DataConnect): QueryPromise<GetMyProjectsData, undefined>;

interface GetMyProjectsRef {
  ...
  (dc: DataConnect): QueryRef<GetMyProjectsData, undefined>;
}
export const getMyProjectsRef: GetMyProjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyProjectsRef:
```typescript
const name = getMyProjectsRef.operationName;
console.log(name);
```

### Variables
The `GetMyProjects` query has no variables.
### Return Type
Recall that executing the `GetMyProjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyProjectsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyProjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyProjects } from '@dataconnect/generated';


// Call the `getMyProjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyProjects();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyProjects(dataConnect);

console.log(data.projects);

// Or, you can use the `Promise` API.
getMyProjects().then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `GetMyProjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyProjectsRef } from '@dataconnect/generated';


// Call the `getMyProjectsRef()` function to get a reference to the query.
const ref = getMyProjectsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyProjectsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## GetUserProfile
You can execute the `GetUserProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserProfile(vars: GetUserProfileVariables): QueryPromise<GetUserProfileData, GetUserProfileVariables>;

interface GetUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserProfileVariables): QueryRef<GetUserProfileData, GetUserProfileVariables>;
}
export const getUserProfileRef: GetUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserProfile(dc: DataConnect, vars: GetUserProfileVariables): QueryPromise<GetUserProfileData, GetUserProfileVariables>;

interface GetUserProfileRef {
  ...
  (dc: DataConnect, vars: GetUserProfileVariables): QueryRef<GetUserProfileData, GetUserProfileVariables>;
}
export const getUserProfileRef: GetUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserProfileRef:
```typescript
const name = getUserProfileRef.operationName;
console.log(name);
```

### Variables
The `GetUserProfile` query requires an argument of type `GetUserProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserProfileVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserProfile, GetUserProfileVariables } from '@dataconnect/generated';

// The `GetUserProfile` query requires an argument of type `GetUserProfileVariables`:
const getUserProfileVars: GetUserProfileVariables = {
  id: ..., 
};

// Call the `getUserProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserProfile(getUserProfileVars);
// Variables can be defined inline as well.
const { data } = await getUserProfile({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserProfile(dataConnect, getUserProfileVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserProfile(getUserProfileVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserProfileRef, GetUserProfileVariables } from '@dataconnect/generated';

// The `GetUserProfile` query requires an argument of type `GetUserProfileVariables`:
const getUserProfileVars: GetUserProfileVariables = {
  id: ..., 
};

// Call the `getUserProfileRef()` function to get a reference to the query.
const ref = getUserProfileRef(getUserProfileVars);
// Variables can be defined inline as well.
const ref = getUserProfileRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserProfileRef(dataConnect, getUserProfileVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListTimeline
You can execute the `ListTimeline` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTimeline(): QueryPromise<ListTimelineData, undefined>;

interface ListTimelineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTimelineData, undefined>;
}
export const listTimelineRef: ListTimelineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTimeline(dc: DataConnect): QueryPromise<ListTimelineData, undefined>;

interface ListTimelineRef {
  ...
  (dc: DataConnect): QueryRef<ListTimelineData, undefined>;
}
export const listTimelineRef: ListTimelineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTimelineRef:
```typescript
const name = listTimelineRef.operationName;
console.log(name);
```

### Variables
The `ListTimeline` query has no variables.
### Return Type
Recall that executing the `ListTimeline` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTimelineData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListTimeline`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTimeline } from '@dataconnect/generated';


// Call the `listTimeline()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTimeline();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTimeline(dataConnect);

console.log(data.timelines);

// Or, you can use the `Promise` API.
listTimeline().then((response) => {
  const data = response.data;
  console.log(data.timelines);
});
```

### Using `ListTimeline`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTimelineRef } from '@dataconnect/generated';


// Call the `listTimelineRef()` function to get a reference to the query.
const ref = listTimelineRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTimelineRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.timelines);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.timelines);
});
```

## GetAdminUserByEmail
You can execute the `GetAdminUserByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAdminUserByEmail(vars: GetAdminUserByEmailVariables): QueryPromise<GetAdminUserByEmailData, GetAdminUserByEmailVariables>;

interface GetAdminUserByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAdminUserByEmailVariables): QueryRef<GetAdminUserByEmailData, GetAdminUserByEmailVariables>;
}
export const getAdminUserByEmailRef: GetAdminUserByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAdminUserByEmail(dc: DataConnect, vars: GetAdminUserByEmailVariables): QueryPromise<GetAdminUserByEmailData, GetAdminUserByEmailVariables>;

interface GetAdminUserByEmailRef {
  ...
  (dc: DataConnect, vars: GetAdminUserByEmailVariables): QueryRef<GetAdminUserByEmailData, GetAdminUserByEmailVariables>;
}
export const getAdminUserByEmailRef: GetAdminUserByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAdminUserByEmailRef:
```typescript
const name = getAdminUserByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetAdminUserByEmail` query requires an argument of type `GetAdminUserByEmailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAdminUserByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetAdminUserByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAdminUserByEmailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAdminUserByEmailData {
  users: ({
    id: UUIDString;
    email: string;
    isAdmin: boolean;
  } & User_Key)[];
}
```
### Using `GetAdminUserByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAdminUserByEmail, GetAdminUserByEmailVariables } from '@dataconnect/generated';

// The `GetAdminUserByEmail` query requires an argument of type `GetAdminUserByEmailVariables`:
const getAdminUserByEmailVars: GetAdminUserByEmailVariables = {
  email: ..., 
};

// Call the `getAdminUserByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAdminUserByEmail(getAdminUserByEmailVars);
// Variables can be defined inline as well.
const { data } = await getAdminUserByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAdminUserByEmail(dataConnect, getAdminUserByEmailVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getAdminUserByEmail(getAdminUserByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetAdminUserByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAdminUserByEmailRef, GetAdminUserByEmailVariables } from '@dataconnect/generated';

// The `GetAdminUserByEmail` query requires an argument of type `GetAdminUserByEmailVariables`:
const getAdminUserByEmailVars: GetAdminUserByEmailVariables = {
  email: ..., 
};

// Call the `getAdminUserByEmailRef()` function to get a reference to the query.
const ref = getAdminUserByEmailRef(getAdminUserByEmailVars);
// Variables can be defined inline as well.
const ref = getAdminUserByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAdminUserByEmailRef(dataConnect, getAdminUserByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateProject
You can execute the `CreateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectRef:
```typescript
const name = createProjectRef.operationName;
console.log(name);
```

### Variables
The `CreateProject` mutation requires an argument of type `CreateProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectData {
  project_insert: Project_Key;
}
```
### Using `CreateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProject, CreateProjectVariables } from '@dataconnect/generated';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  authorId: ..., 
  title: ..., 
  description: ..., 
  techStack: ..., // optional
  startDate: ..., 
  endDate: ..., // optional
  liveDemoUrl: ..., // optional
  repositoryUrl: ..., // optional
  imageUrl: ..., // optional
  published: ..., 
  order: ..., // optional
};

// Call the `createProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProject(createProjectVars);
// Variables can be defined inline as well.
const { data } = await createProject({ authorId: ..., title: ..., description: ..., techStack: ..., startDate: ..., endDate: ..., liveDemoUrl: ..., repositoryUrl: ..., imageUrl: ..., published: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProject(dataConnect, createProjectVars);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
createProject(createProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

### Using `CreateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectRef, CreateProjectVariables } from '@dataconnect/generated';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  authorId: ..., 
  title: ..., 
  description: ..., 
  techStack: ..., // optional
  startDate: ..., 
  endDate: ..., // optional
  liveDemoUrl: ..., // optional
  repositoryUrl: ..., // optional
  imageUrl: ..., // optional
  published: ..., 
  order: ..., // optional
};

// Call the `createProjectRef()` function to get a reference to the mutation.
const ref = createProjectRef(createProjectVars);
// Variables can be defined inline as well.
const ref = createProjectRef({ authorId: ..., title: ..., description: ..., techStack: ..., startDate: ..., endDate: ..., liveDemoUrl: ..., repositoryUrl: ..., imageUrl: ..., published: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectRef(dataConnect, createProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

## UpdateProject
You can execute the `UpdateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectRef:
```typescript
const name = updateProjectRef.operationName;
console.log(name);
```

### Variables
The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectData {
  project_update?: Project_Key | null;
}
```
### Using `UpdateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProject, UpdateProjectVariables } from '@dataconnect/generated';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  title: ..., // optional
  description: ..., // optional
  techStack: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  liveDemoUrl: ..., // optional
  repositoryUrl: ..., // optional
  imageUrl: ..., // optional
  published: ..., // optional
  order: ..., // optional
};

// Call the `updateProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProject(updateProjectVars);
// Variables can be defined inline as well.
const { data } = await updateProject({ id: ..., title: ..., description: ..., techStack: ..., startDate: ..., endDate: ..., liveDemoUrl: ..., repositoryUrl: ..., imageUrl: ..., published: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProject(dataConnect, updateProjectVars);

console.log(data.project_update);

// Or, you can use the `Promise` API.
updateProject(updateProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `UpdateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectRef, UpdateProjectVariables } from '@dataconnect/generated';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  title: ..., // optional
  description: ..., // optional
  techStack: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  liveDemoUrl: ..., // optional
  repositoryUrl: ..., // optional
  imageUrl: ..., // optional
  published: ..., // optional
  order: ..., // optional
};

// Call the `updateProjectRef()` function to get a reference to the mutation.
const ref = updateProjectRef(updateProjectVars);
// Variables can be defined inline as well.
const ref = updateProjectRef({ id: ..., title: ..., description: ..., techStack: ..., startDate: ..., endDate: ..., liveDemoUrl: ..., repositoryUrl: ..., imageUrl: ..., published: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectRef(dataConnect, updateProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

## DeleteProject
You can execute the `DeleteProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectRef:
```typescript
const name = deleteProjectRef.operationName;
console.log(name);
```

### Variables
The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}
```
### Using `DeleteProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProject, DeleteProjectVariables } from '@dataconnect/generated';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProject(deleteProjectVars);
// Variables can be defined inline as well.
const { data } = await deleteProject({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProject(dataConnect, deleteProjectVars);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
deleteProject(deleteProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

### Using `DeleteProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectRef, DeleteProjectVariables } from '@dataconnect/generated';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProjectRef()` function to get a reference to the mutation.
const ref = deleteProjectRef(deleteProjectVars);
// Variables can be defined inline as well.
const ref = deleteProjectRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectRef(dataConnect, deleteProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

## CreateInsight
You can execute the `CreateInsight` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createInsight(vars: CreateInsightVariables): MutationPromise<CreateInsightData, CreateInsightVariables>;

interface CreateInsightRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInsightVariables): MutationRef<CreateInsightData, CreateInsightVariables>;
}
export const createInsightRef: CreateInsightRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInsight(dc: DataConnect, vars: CreateInsightVariables): MutationPromise<CreateInsightData, CreateInsightVariables>;

interface CreateInsightRef {
  ...
  (dc: DataConnect, vars: CreateInsightVariables): MutationRef<CreateInsightData, CreateInsightVariables>;
}
export const createInsightRef: CreateInsightRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInsightRef:
```typescript
const name = createInsightRef.operationName;
console.log(name);
```

### Variables
The `CreateInsight` mutation requires an argument of type `CreateInsightVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateInsight` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInsightData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInsightData {
  insight_insert: Insight_Key;
}
```
### Using `CreateInsight`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInsight, CreateInsightVariables } from '@dataconnect/generated';

// The `CreateInsight` mutation requires an argument of type `CreateInsightVariables`:
const createInsightVars: CreateInsightVariables = {
  authorId: ..., 
  title: ..., 
  summary: ..., // optional
  content: ..., 
  tags: ..., // optional
  published: ..., 
  audioUrl: ..., // optional
  audioMood: ..., // optional
  audioTitle: ..., // optional
};

// Call the `createInsight()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInsight(createInsightVars);
// Variables can be defined inline as well.
const { data } = await createInsight({ authorId: ..., title: ..., summary: ..., content: ..., tags: ..., published: ..., audioUrl: ..., audioMood: ..., audioTitle: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInsight(dataConnect, createInsightVars);

console.log(data.insight_insert);

// Or, you can use the `Promise` API.
createInsight(createInsightVars).then((response) => {
  const data = response.data;
  console.log(data.insight_insert);
});
```

### Using `CreateInsight`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInsightRef, CreateInsightVariables } from '@dataconnect/generated';

// The `CreateInsight` mutation requires an argument of type `CreateInsightVariables`:
const createInsightVars: CreateInsightVariables = {
  authorId: ..., 
  title: ..., 
  summary: ..., // optional
  content: ..., 
  tags: ..., // optional
  published: ..., 
  audioUrl: ..., // optional
  audioMood: ..., // optional
  audioTitle: ..., // optional
};

// Call the `createInsightRef()` function to get a reference to the mutation.
const ref = createInsightRef(createInsightVars);
// Variables can be defined inline as well.
const ref = createInsightRef({ authorId: ..., title: ..., summary: ..., content: ..., tags: ..., published: ..., audioUrl: ..., audioMood: ..., audioTitle: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInsightRef(dataConnect, createInsightVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.insight_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.insight_insert);
});
```

## UpdateInsight
You can execute the `UpdateInsight` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateInsight(vars: UpdateInsightVariables): MutationPromise<UpdateInsightData, UpdateInsightVariables>;

interface UpdateInsightRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInsightVariables): MutationRef<UpdateInsightData, UpdateInsightVariables>;
}
export const updateInsightRef: UpdateInsightRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInsight(dc: DataConnect, vars: UpdateInsightVariables): MutationPromise<UpdateInsightData, UpdateInsightVariables>;

interface UpdateInsightRef {
  ...
  (dc: DataConnect, vars: UpdateInsightVariables): MutationRef<UpdateInsightData, UpdateInsightVariables>;
}
export const updateInsightRef: UpdateInsightRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateInsightRef:
```typescript
const name = updateInsightRef.operationName;
console.log(name);
```

### Variables
The `UpdateInsight` mutation requires an argument of type `UpdateInsightVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateInsight` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInsightData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInsightData {
  insight_update?: Insight_Key | null;
}
```
### Using `UpdateInsight`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInsight, UpdateInsightVariables } from '@dataconnect/generated';

// The `UpdateInsight` mutation requires an argument of type `UpdateInsightVariables`:
const updateInsightVars: UpdateInsightVariables = {
  id: ..., 
  title: ..., // optional
  summary: ..., // optional
  content: ..., // optional
  tags: ..., // optional
  published: ..., // optional
  audioUrl: ..., // optional
  audioMood: ..., // optional
  audioTitle: ..., // optional
};

// Call the `updateInsight()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInsight(updateInsightVars);
// Variables can be defined inline as well.
const { data } = await updateInsight({ id: ..., title: ..., summary: ..., content: ..., tags: ..., published: ..., audioUrl: ..., audioMood: ..., audioTitle: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInsight(dataConnect, updateInsightVars);

console.log(data.insight_update);

// Or, you can use the `Promise` API.
updateInsight(updateInsightVars).then((response) => {
  const data = response.data;
  console.log(data.insight_update);
});
```

### Using `UpdateInsight`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInsightRef, UpdateInsightVariables } from '@dataconnect/generated';

// The `UpdateInsight` mutation requires an argument of type `UpdateInsightVariables`:
const updateInsightVars: UpdateInsightVariables = {
  id: ..., 
  title: ..., // optional
  summary: ..., // optional
  content: ..., // optional
  tags: ..., // optional
  published: ..., // optional
  audioUrl: ..., // optional
  audioMood: ..., // optional
  audioTitle: ..., // optional
};

// Call the `updateInsightRef()` function to get a reference to the mutation.
const ref = updateInsightRef(updateInsightVars);
// Variables can be defined inline as well.
const ref = updateInsightRef({ id: ..., title: ..., summary: ..., content: ..., tags: ..., published: ..., audioUrl: ..., audioMood: ..., audioTitle: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInsightRef(dataConnect, updateInsightVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.insight_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.insight_update);
});
```

## DeleteInsight
You can execute the `DeleteInsight` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteInsight(vars: DeleteInsightVariables): MutationPromise<DeleteInsightData, DeleteInsightVariables>;

interface DeleteInsightRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteInsightVariables): MutationRef<DeleteInsightData, DeleteInsightVariables>;
}
export const deleteInsightRef: DeleteInsightRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteInsight(dc: DataConnect, vars: DeleteInsightVariables): MutationPromise<DeleteInsightData, DeleteInsightVariables>;

interface DeleteInsightRef {
  ...
  (dc: DataConnect, vars: DeleteInsightVariables): MutationRef<DeleteInsightData, DeleteInsightVariables>;
}
export const deleteInsightRef: DeleteInsightRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteInsightRef:
```typescript
const name = deleteInsightRef.operationName;
console.log(name);
```

### Variables
The `DeleteInsight` mutation requires an argument of type `DeleteInsightVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteInsightVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteInsight` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteInsightData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteInsightData {
  insight_delete?: Insight_Key | null;
}
```
### Using `DeleteInsight`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteInsight, DeleteInsightVariables } from '@dataconnect/generated';

// The `DeleteInsight` mutation requires an argument of type `DeleteInsightVariables`:
const deleteInsightVars: DeleteInsightVariables = {
  id: ..., 
};

// Call the `deleteInsight()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteInsight(deleteInsightVars);
// Variables can be defined inline as well.
const { data } = await deleteInsight({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteInsight(dataConnect, deleteInsightVars);

console.log(data.insight_delete);

// Or, you can use the `Promise` API.
deleteInsight(deleteInsightVars).then((response) => {
  const data = response.data;
  console.log(data.insight_delete);
});
```

### Using `DeleteInsight`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteInsightRef, DeleteInsightVariables } from '@dataconnect/generated';

// The `DeleteInsight` mutation requires an argument of type `DeleteInsightVariables`:
const deleteInsightVars: DeleteInsightVariables = {
  id: ..., 
};

// Call the `deleteInsightRef()` function to get a reference to the mutation.
const ref = deleteInsightRef(deleteInsightVars);
// Variables can be defined inline as well.
const ref = deleteInsightRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteInsightRef(dataConnect, deleteInsightVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.insight_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.insight_delete);
});
```

## CreateTimeline
You can execute the `CreateTimeline` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTimeline(vars: CreateTimelineVariables): MutationPromise<CreateTimelineData, CreateTimelineVariables>;

interface CreateTimelineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTimelineVariables): MutationRef<CreateTimelineData, CreateTimelineVariables>;
}
export const createTimelineRef: CreateTimelineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTimeline(dc: DataConnect, vars: CreateTimelineVariables): MutationPromise<CreateTimelineData, CreateTimelineVariables>;

interface CreateTimelineRef {
  ...
  (dc: DataConnect, vars: CreateTimelineVariables): MutationRef<CreateTimelineData, CreateTimelineVariables>;
}
export const createTimelineRef: CreateTimelineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTimelineRef:
```typescript
const name = createTimelineRef.operationName;
console.log(name);
```

### Variables
The `CreateTimeline` mutation requires an argument of type `CreateTimelineVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateTimeline` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTimelineData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTimelineData {
  timeline_insert: Timeline_Key;
}
```
### Using `CreateTimeline`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTimeline, CreateTimelineVariables } from '@dataconnect/generated';

// The `CreateTimeline` mutation requires an argument of type `CreateTimelineVariables`:
const createTimelineVars: CreateTimelineVariables = {
  authorId: ..., 
  title: ..., 
  description: ..., // optional
  startDate: ..., 
  endDate: ..., // optional
  imageUrl: ..., // optional
  published: ..., 
  order: ..., // optional
};

// Call the `createTimeline()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTimeline(createTimelineVars);
// Variables can be defined inline as well.
const { data } = await createTimeline({ authorId: ..., title: ..., description: ..., startDate: ..., endDate: ..., imageUrl: ..., published: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTimeline(dataConnect, createTimelineVars);

console.log(data.timeline_insert);

// Or, you can use the `Promise` API.
createTimeline(createTimelineVars).then((response) => {
  const data = response.data;
  console.log(data.timeline_insert);
});
```

### Using `CreateTimeline`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTimelineRef, CreateTimelineVariables } from '@dataconnect/generated';

// The `CreateTimeline` mutation requires an argument of type `CreateTimelineVariables`:
const createTimelineVars: CreateTimelineVariables = {
  authorId: ..., 
  title: ..., 
  description: ..., // optional
  startDate: ..., 
  endDate: ..., // optional
  imageUrl: ..., // optional
  published: ..., 
  order: ..., // optional
};

// Call the `createTimelineRef()` function to get a reference to the mutation.
const ref = createTimelineRef(createTimelineVars);
// Variables can be defined inline as well.
const ref = createTimelineRef({ authorId: ..., title: ..., description: ..., startDate: ..., endDate: ..., imageUrl: ..., published: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTimelineRef(dataConnect, createTimelineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.timeline_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.timeline_insert);
});
```

## UpdateTimeline
You can execute the `UpdateTimeline` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTimeline(vars: UpdateTimelineVariables): MutationPromise<UpdateTimelineData, UpdateTimelineVariables>;

interface UpdateTimelineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTimelineVariables): MutationRef<UpdateTimelineData, UpdateTimelineVariables>;
}
export const updateTimelineRef: UpdateTimelineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTimeline(dc: DataConnect, vars: UpdateTimelineVariables): MutationPromise<UpdateTimelineData, UpdateTimelineVariables>;

interface UpdateTimelineRef {
  ...
  (dc: DataConnect, vars: UpdateTimelineVariables): MutationRef<UpdateTimelineData, UpdateTimelineVariables>;
}
export const updateTimelineRef: UpdateTimelineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTimelineRef:
```typescript
const name = updateTimelineRef.operationName;
console.log(name);
```

### Variables
The `UpdateTimeline` mutation requires an argument of type `UpdateTimelineVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateTimeline` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTimelineData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTimelineData {
  timeline_update?: Timeline_Key | null;
}
```
### Using `UpdateTimeline`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTimeline, UpdateTimelineVariables } from '@dataconnect/generated';

// The `UpdateTimeline` mutation requires an argument of type `UpdateTimelineVariables`:
const updateTimelineVars: UpdateTimelineVariables = {
  id: ..., 
  title: ..., // optional
  description: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  imageUrl: ..., // optional
  published: ..., // optional
  order: ..., // optional
};

// Call the `updateTimeline()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTimeline(updateTimelineVars);
// Variables can be defined inline as well.
const { data } = await updateTimeline({ id: ..., title: ..., description: ..., startDate: ..., endDate: ..., imageUrl: ..., published: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTimeline(dataConnect, updateTimelineVars);

console.log(data.timeline_update);

// Or, you can use the `Promise` API.
updateTimeline(updateTimelineVars).then((response) => {
  const data = response.data;
  console.log(data.timeline_update);
});
```

### Using `UpdateTimeline`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTimelineRef, UpdateTimelineVariables } from '@dataconnect/generated';

// The `UpdateTimeline` mutation requires an argument of type `UpdateTimelineVariables`:
const updateTimelineVars: UpdateTimelineVariables = {
  id: ..., 
  title: ..., // optional
  description: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  imageUrl: ..., // optional
  published: ..., // optional
  order: ..., // optional
};

// Call the `updateTimelineRef()` function to get a reference to the mutation.
const ref = updateTimelineRef(updateTimelineVars);
// Variables can be defined inline as well.
const ref = updateTimelineRef({ id: ..., title: ..., description: ..., startDate: ..., endDate: ..., imageUrl: ..., published: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTimelineRef(dataConnect, updateTimelineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.timeline_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.timeline_update);
});
```

## DeleteTimeline
You can execute the `DeleteTimeline` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTimeline(vars: DeleteTimelineVariables): MutationPromise<DeleteTimelineData, DeleteTimelineVariables>;

interface DeleteTimelineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTimelineVariables): MutationRef<DeleteTimelineData, DeleteTimelineVariables>;
}
export const deleteTimelineRef: DeleteTimelineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTimeline(dc: DataConnect, vars: DeleteTimelineVariables): MutationPromise<DeleteTimelineData, DeleteTimelineVariables>;

interface DeleteTimelineRef {
  ...
  (dc: DataConnect, vars: DeleteTimelineVariables): MutationRef<DeleteTimelineData, DeleteTimelineVariables>;
}
export const deleteTimelineRef: DeleteTimelineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTimelineRef:
```typescript
const name = deleteTimelineRef.operationName;
console.log(name);
```

### Variables
The `DeleteTimeline` mutation requires an argument of type `DeleteTimelineVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTimelineVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTimeline` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTimelineData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTimelineData {
  timeline_delete?: Timeline_Key | null;
}
```
### Using `DeleteTimeline`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTimeline, DeleteTimelineVariables } from '@dataconnect/generated';

// The `DeleteTimeline` mutation requires an argument of type `DeleteTimelineVariables`:
const deleteTimelineVars: DeleteTimelineVariables = {
  id: ..., 
};

// Call the `deleteTimeline()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTimeline(deleteTimelineVars);
// Variables can be defined inline as well.
const { data } = await deleteTimeline({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTimeline(dataConnect, deleteTimelineVars);

console.log(data.timeline_delete);

// Or, you can use the `Promise` API.
deleteTimeline(deleteTimelineVars).then((response) => {
  const data = response.data;
  console.log(data.timeline_delete);
});
```

### Using `DeleteTimeline`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTimelineRef, DeleteTimelineVariables } from '@dataconnect/generated';

// The `DeleteTimeline` mutation requires an argument of type `DeleteTimelineVariables`:
const deleteTimelineVars: DeleteTimelineVariables = {
  id: ..., 
};

// Call the `deleteTimelineRef()` function to get a reference to the mutation.
const ref = deleteTimelineRef(deleteTimelineVars);
// Variables can be defined inline as well.
const ref = deleteTimelineRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTimelineRef(dataConnect, deleteTimelineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.timeline_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.timeline_delete);
});
```

## UpdateInsightViews
You can execute the `UpdateInsightViews` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateInsightViews(vars: UpdateInsightViewsVariables): MutationPromise<UpdateInsightViewsData, UpdateInsightViewsVariables>;

interface UpdateInsightViewsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInsightViewsVariables): MutationRef<UpdateInsightViewsData, UpdateInsightViewsVariables>;
}
export const updateInsightViewsRef: UpdateInsightViewsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInsightViews(dc: DataConnect, vars: UpdateInsightViewsVariables): MutationPromise<UpdateInsightViewsData, UpdateInsightViewsVariables>;

interface UpdateInsightViewsRef {
  ...
  (dc: DataConnect, vars: UpdateInsightViewsVariables): MutationRef<UpdateInsightViewsData, UpdateInsightViewsVariables>;
}
export const updateInsightViewsRef: UpdateInsightViewsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateInsightViewsRef:
```typescript
const name = updateInsightViewsRef.operationName;
console.log(name);
```

### Variables
The `UpdateInsightViews` mutation requires an argument of type `UpdateInsightViewsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateInsightViewsVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `UpdateInsightViews` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInsightViewsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInsightViewsData {
  insight_update?: Insight_Key | null;
}
```
### Using `UpdateInsightViews`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInsightViews, UpdateInsightViewsVariables } from '@dataconnect/generated';

// The `UpdateInsightViews` mutation requires an argument of type `UpdateInsightViewsVariables`:
const updateInsightViewsVars: UpdateInsightViewsVariables = {
  id: ..., 
};

// Call the `updateInsightViews()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInsightViews(updateInsightViewsVars);
// Variables can be defined inline as well.
const { data } = await updateInsightViews({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInsightViews(dataConnect, updateInsightViewsVars);

console.log(data.insight_update);

// Or, you can use the `Promise` API.
updateInsightViews(updateInsightViewsVars).then((response) => {
  const data = response.data;
  console.log(data.insight_update);
});
```

### Using `UpdateInsightViews`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInsightViewsRef, UpdateInsightViewsVariables } from '@dataconnect/generated';

// The `UpdateInsightViews` mutation requires an argument of type `UpdateInsightViewsVariables`:
const updateInsightViewsVars: UpdateInsightViewsVariables = {
  id: ..., 
};

// Call the `updateInsightViewsRef()` function to get a reference to the mutation.
const ref = updateInsightViewsRef(updateInsightViewsVars);
// Variables can be defined inline as well.
const ref = updateInsightViewsRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInsightViewsRef(dataConnect, updateInsightViewsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.insight_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.insight_update);
});
```

## UpdateProjectViews
You can execute the `UpdateProjectViews` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProjectViews(vars: UpdateProjectViewsVariables): MutationPromise<UpdateProjectViewsData, UpdateProjectViewsVariables>;

interface UpdateProjectViewsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectViewsVariables): MutationRef<UpdateProjectViewsData, UpdateProjectViewsVariables>;
}
export const updateProjectViewsRef: UpdateProjectViewsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProjectViews(dc: DataConnect, vars: UpdateProjectViewsVariables): MutationPromise<UpdateProjectViewsData, UpdateProjectViewsVariables>;

interface UpdateProjectViewsRef {
  ...
  (dc: DataConnect, vars: UpdateProjectViewsVariables): MutationRef<UpdateProjectViewsData, UpdateProjectViewsVariables>;
}
export const updateProjectViewsRef: UpdateProjectViewsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectViewsRef:
```typescript
const name = updateProjectViewsRef.operationName;
console.log(name);
```

### Variables
The `UpdateProjectViews` mutation requires an argument of type `UpdateProjectViewsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectViewsVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `UpdateProjectViews` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectViewsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectViewsData {
  project_update?: Project_Key | null;
}
```
### Using `UpdateProjectViews`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProjectViews, UpdateProjectViewsVariables } from '@dataconnect/generated';

// The `UpdateProjectViews` mutation requires an argument of type `UpdateProjectViewsVariables`:
const updateProjectViewsVars: UpdateProjectViewsVariables = {
  id: ..., 
};

// Call the `updateProjectViews()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProjectViews(updateProjectViewsVars);
// Variables can be defined inline as well.
const { data } = await updateProjectViews({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProjectViews(dataConnect, updateProjectViewsVars);

console.log(data.project_update);

// Or, you can use the `Promise` API.
updateProjectViews(updateProjectViewsVars).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `UpdateProjectViews`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectViewsRef, UpdateProjectViewsVariables } from '@dataconnect/generated';

// The `UpdateProjectViews` mutation requires an argument of type `UpdateProjectViewsVariables`:
const updateProjectViewsVars: UpdateProjectViewsVariables = {
  id: ..., 
};

// Call the `updateProjectViewsRef()` function to get a reference to the mutation.
const ref = updateProjectViewsRef(updateProjectViewsVars);
// Variables can be defined inline as well.
const ref = updateProjectViewsRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectViewsRef(dataConnect, updateProjectViewsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

## UpdateTimelineViews
You can execute the `UpdateTimelineViews` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTimelineViews(vars: UpdateTimelineViewsVariables): MutationPromise<UpdateTimelineViewsData, UpdateTimelineViewsVariables>;

interface UpdateTimelineViewsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTimelineViewsVariables): MutationRef<UpdateTimelineViewsData, UpdateTimelineViewsVariables>;
}
export const updateTimelineViewsRef: UpdateTimelineViewsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTimelineViews(dc: DataConnect, vars: UpdateTimelineViewsVariables): MutationPromise<UpdateTimelineViewsData, UpdateTimelineViewsVariables>;

interface UpdateTimelineViewsRef {
  ...
  (dc: DataConnect, vars: UpdateTimelineViewsVariables): MutationRef<UpdateTimelineViewsData, UpdateTimelineViewsVariables>;
}
export const updateTimelineViewsRef: UpdateTimelineViewsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTimelineViewsRef:
```typescript
const name = updateTimelineViewsRef.operationName;
console.log(name);
```

### Variables
The `UpdateTimelineViews` mutation requires an argument of type `UpdateTimelineViewsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTimelineViewsVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `UpdateTimelineViews` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTimelineViewsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTimelineViewsData {
  timeline_update?: Timeline_Key | null;
}
```
### Using `UpdateTimelineViews`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTimelineViews, UpdateTimelineViewsVariables } from '@dataconnect/generated';

// The `UpdateTimelineViews` mutation requires an argument of type `UpdateTimelineViewsVariables`:
const updateTimelineViewsVars: UpdateTimelineViewsVariables = {
  id: ..., 
};

// Call the `updateTimelineViews()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTimelineViews(updateTimelineViewsVars);
// Variables can be defined inline as well.
const { data } = await updateTimelineViews({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTimelineViews(dataConnect, updateTimelineViewsVars);

console.log(data.timeline_update);

// Or, you can use the `Promise` API.
updateTimelineViews(updateTimelineViewsVars).then((response) => {
  const data = response.data;
  console.log(data.timeline_update);
});
```

### Using `UpdateTimelineViews`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTimelineViewsRef, UpdateTimelineViewsVariables } from '@dataconnect/generated';

// The `UpdateTimelineViews` mutation requires an argument of type `UpdateTimelineViewsVariables`:
const updateTimelineViewsVars: UpdateTimelineViewsVariables = {
  id: ..., 
};

// Call the `updateTimelineViewsRef()` function to get a reference to the mutation.
const ref = updateTimelineViewsRef(updateTimelineViewsVars);
// Variables can be defined inline as well.
const ref = updateTimelineViewsRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTimelineViewsRef(dataConnect, updateTimelineViewsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.timeline_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.timeline_update);
});
```

## UpdateProjectArticleViews
You can execute the `UpdateProjectArticleViews` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProjectArticleViews(vars: UpdateProjectArticleViewsVariables): MutationPromise<UpdateProjectArticleViewsData, UpdateProjectArticleViewsVariables>;

interface UpdateProjectArticleViewsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectArticleViewsVariables): MutationRef<UpdateProjectArticleViewsData, UpdateProjectArticleViewsVariables>;
}
export const updateProjectArticleViewsRef: UpdateProjectArticleViewsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProjectArticleViews(dc: DataConnect, vars: UpdateProjectArticleViewsVariables): MutationPromise<UpdateProjectArticleViewsData, UpdateProjectArticleViewsVariables>;

interface UpdateProjectArticleViewsRef {
  ...
  (dc: DataConnect, vars: UpdateProjectArticleViewsVariables): MutationRef<UpdateProjectArticleViewsData, UpdateProjectArticleViewsVariables>;
}
export const updateProjectArticleViewsRef: UpdateProjectArticleViewsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectArticleViewsRef:
```typescript
const name = updateProjectArticleViewsRef.operationName;
console.log(name);
```

### Variables
The `UpdateProjectArticleViews` mutation requires an argument of type `UpdateProjectArticleViewsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectArticleViewsVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `UpdateProjectArticleViews` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectArticleViewsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectArticleViewsData {
  projectArticle_update?: ProjectArticle_Key | null;
}
```
### Using `UpdateProjectArticleViews`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProjectArticleViews, UpdateProjectArticleViewsVariables } from '@dataconnect/generated';

// The `UpdateProjectArticleViews` mutation requires an argument of type `UpdateProjectArticleViewsVariables`:
const updateProjectArticleViewsVars: UpdateProjectArticleViewsVariables = {
  id: ..., 
};

// Call the `updateProjectArticleViews()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProjectArticleViews(updateProjectArticleViewsVars);
// Variables can be defined inline as well.
const { data } = await updateProjectArticleViews({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProjectArticleViews(dataConnect, updateProjectArticleViewsVars);

console.log(data.projectArticle_update);

// Or, you can use the `Promise` API.
updateProjectArticleViews(updateProjectArticleViewsVars).then((response) => {
  const data = response.data;
  console.log(data.projectArticle_update);
});
```

### Using `UpdateProjectArticleViews`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectArticleViewsRef, UpdateProjectArticleViewsVariables } from '@dataconnect/generated';

// The `UpdateProjectArticleViews` mutation requires an argument of type `UpdateProjectArticleViewsVariables`:
const updateProjectArticleViewsVars: UpdateProjectArticleViewsVariables = {
  id: ..., 
};

// Call the `updateProjectArticleViewsRef()` function to get a reference to the mutation.
const ref = updateProjectArticleViewsRef(updateProjectArticleViewsVars);
// Variables can be defined inline as well.
const ref = updateProjectArticleViewsRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectArticleViewsRef(dataConnect, updateProjectArticleViewsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectArticle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectArticle_update);
});
```

