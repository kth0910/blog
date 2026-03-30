# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateProject, useUpdateProject, useDeleteProject, useCreateProjectArticle, useUpdateProjectArticle, useDeleteProjectArticle, useCreateInsight, useUpdateInsight, useDeleteInsight, useCreateTimeline } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateProject(createProjectVars);

const { data, isPending, isSuccess, isError, error } = useUpdateProject(updateProjectVars);

const { data, isPending, isSuccess, isError, error } = useDeleteProject(deleteProjectVars);

const { data, isPending, isSuccess, isError, error } = useCreateProjectArticle(createProjectArticleVars);

const { data, isPending, isSuccess, isError, error } = useUpdateProjectArticle(updateProjectArticleVars);

const { data, isPending, isSuccess, isError, error } = useDeleteProjectArticle(deleteProjectArticleVars);

const { data, isPending, isSuccess, isError, error } = useCreateInsight(createInsightVars);

const { data, isPending, isSuccess, isError, error } = useUpdateInsight(updateInsightVars);

const { data, isPending, isSuccess, isError, error } = useDeleteInsight(deleteInsightVars);

const { data, isPending, isSuccess, isError, error } = useCreateTimeline(createTimelineVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createProject, updateProject, deleteProject, createProjectArticle, updateProjectArticle, deleteProjectArticle, createInsight, updateInsight, deleteInsight, createTimeline } from '@dataconnect/generated';


// Operation CreateProject:  For variables, look at type CreateProjectVars in ../index.d.ts
const { data } = await CreateProject(dataConnect, createProjectVars);

// Operation UpdateProject:  For variables, look at type UpdateProjectVars in ../index.d.ts
const { data } = await UpdateProject(dataConnect, updateProjectVars);

// Operation DeleteProject:  For variables, look at type DeleteProjectVars in ../index.d.ts
const { data } = await DeleteProject(dataConnect, deleteProjectVars);

// Operation CreateProjectArticle:  For variables, look at type CreateProjectArticleVars in ../index.d.ts
const { data } = await CreateProjectArticle(dataConnect, createProjectArticleVars);

// Operation UpdateProjectArticle:  For variables, look at type UpdateProjectArticleVars in ../index.d.ts
const { data } = await UpdateProjectArticle(dataConnect, updateProjectArticleVars);

// Operation DeleteProjectArticle:  For variables, look at type DeleteProjectArticleVars in ../index.d.ts
const { data } = await DeleteProjectArticle(dataConnect, deleteProjectArticleVars);

// Operation CreateInsight:  For variables, look at type CreateInsightVars in ../index.d.ts
const { data } = await CreateInsight(dataConnect, createInsightVars);

// Operation UpdateInsight:  For variables, look at type UpdateInsightVars in ../index.d.ts
const { data } = await UpdateInsight(dataConnect, updateInsightVars);

// Operation DeleteInsight:  For variables, look at type DeleteInsightVars in ../index.d.ts
const { data } = await DeleteInsight(dataConnect, deleteInsightVars);

// Operation CreateTimeline:  For variables, look at type CreateTimelineVars in ../index.d.ts
const { data } = await CreateTimeline(dataConnect, createTimelineVars);


```