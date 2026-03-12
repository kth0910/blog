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
- [**Mutations**](#mutations)

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
    tags?: string[] | null;
    createdAt: TimestampString;
    published: boolean;
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

# Mutations

No mutations were generated for the `example` connector.

If you want to learn more about how to use mutations in Data Connect, you can follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

