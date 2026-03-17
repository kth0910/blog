import { 
  listAllInsights, 
  getMyProjects, 
  listTimeline,
  updateInsightViews,
  updateProjectViews,
  updateTimelineViews,
  updateProjectArticleViews,
} from '@dataconnect/generated';
import { dataconnect } from './firebase';

export type PostType = 'project' | 'insight' | 'timeline';

export interface Post {
  id: string;
  title: string;
  content?: string;
  type: PostType;
  summary?: string;      // Insight 용
  description?: string;  // Project, Timeline 용
  tags?: string[];       // Insight 용
  techStack?: string[];  // Project 용
  status?: string;
  audioUrl?: string;
  audioMood?: string;
  audioTitle?: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  liveDemoUrl?: string;
  repositoryUrl?: string;
  views?: number;
  createdAt: string;
  updatedAt?: string;
  authorName?: string;
  authorProfileUrl?: string;
}

export async function getPosts(type?: PostType, limit = 10, offset = 0): Promise<{data: Post[], pagination: any}> {
  try {
    let posts: Post[] = [];

    if (!type || type === 'insight') {
      const { data } = await listAllInsights(dataconnect);
      posts = [
        ...posts,
        ...data.insights.map(i => ({
          id: i.id,
          title: i.title,
          content: i.content,
          summary: i.summary || undefined,
          tags: i.tags || [],
          audioUrl: i.audioUrl || undefined,
          audioMood: i.audioMood || undefined,
          audioTitle: i.audioTitle || undefined,
          createdAt: i.createdAt,
          type: 'insight' as const,
          authorName: i.author.displayName,
          authorProfileUrl: i.author.profilePictureUrl || undefined,
          views: i.views
        }))
      ];
    }

    if (!type || type === 'project') {
      const { data } = await getMyProjects(dataconnect);
      posts = [
        ...posts,
        ...data.projects.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          techStack: p.techStack || [],
          liveDemoUrl: p.liveDemoUrl || undefined,
          repositoryUrl: p.repositoryUrl || undefined,
          startDate: p.startDate,
          endDate: p.endDate || undefined,
          status: p.endDate ? 'completed' : 'in-progress',
          createdAt: p.startDate, // Fallback
          type: 'project' as const,
          views: p.views
        }))
      ];
    }

    if (!type || type === 'timeline') {
      const { data } = await listTimeline(dataconnect);
      posts = [
        ...posts,
        ...data.timelines.map(t => ({
          id: t.id,
          title: t.title,
          description: t.description || undefined,
          startDate: t.startDate,
          endDate: t.endDate || undefined,
          imageUrl: t.imageUrl || undefined,
          createdAt: t.startDate, // Fallback
          type: 'timeline' as const,
          views: t.views
        }))
      ];
    }

    // Sort by date (descending)
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const filtered = posts.slice(offset, offset + limit);

    return {
      data: filtered,
      pagination: { total: posts.length, offset, limit }
    };
  } catch (err: any) {
    if (err?.code === 'NOT_FOUND' || err?.message?.includes('not found')) {
      console.warn('⚠️ Data Connect service or connector not found. If this is a build environment, ensure your Data Connect is deployed or use a mock.');
    } else {
      console.error('❌ Data Connect Error:', err);
    }
    return { data: [], pagination: { total: 0, offset, limit } };
  }
}

export async function getPost(id: string): Promise<{data: Post | null}> {
  try {
    // getPost는 단일 조회가 필요하지만 현재 SDK에는 ID 기반 단일 조회 쿼리가 제한적일 수 있음.
    // 여기서는 전체 목록에서 필터링하거나, 필요한 경우 단일 조회 쿼리를 스키마에 추가해야 함.
    // 임시로 모든 포스트 중 ID가 일치하는 것을 반환.
    const { data: allPosts } = await getPosts();
    const post = allPosts.find(p => p.id === id) || null;
    return { data: post };
  } catch (err) {
    console.error('Data Connect Error:', err);
    return { data: null };
  }
}

export async function incrementInsightView(id: string) {
  try {
    await updateInsightViews(dataconnect, { id });
  } catch (err) {
    console.error('Failed to increment insight views:', err);
  }
}

export async function incrementProjectView(id: string) {
  try {
    await updateProjectViews(dataconnect, { id });
  } catch (err) {
    console.error('Failed to increment project views:', err);
  }
}

export async function incrementTimelineView(id: string) {
  try {
    await updateTimelineViews(dataconnect, { id });
  } catch (err) {
    console.error('Failed to increment timeline views:', err);
  }
}

export async function incrementProjectArticleView(id: string) {
  try {
    await updateProjectArticleViews(dataconnect, { id });
  } catch (err) {
    console.error('Failed to increment project article views:', err);
  }
}
