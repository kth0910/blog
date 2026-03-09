export type PostType = 'project' | 'insight' | 'timeline';

export interface Post {
  id: string;
  title: string;
  content?: string;
  type: PostType;
  summary?: string;
  tags?: string[];
  status?: string;
  audioUrl?: string;
  audioMood?: string;
  createdAt: string;
  updatedAt?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getPosts(type?: PostType, limit = 10, offset = 0): Promise<{data: Post[], pagination: any}> {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  try {
    const res = await fetch(`${API_BASE}/api/posts?${params.toString()}`, {
      next: { revalidate: 60 } // Next.js App Router caching
    });
    
    if (!res.ok) {
      console.warn('Failed to fetch posts from API, returning mock data.');
      return getMockPosts(type, limit, offset);
    }
    
    return res.json();
  } catch (err) {
    console.error('API Error:', err);
    return getMockPosts(type, limit, offset);
  }
}

export async function getPost(id: string): Promise<{data: Post}> {
  try {
    const res = await fetch(`${API_BASE}/api/posts/${id}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      console.warn(`Failed to fetch post from API: ${id}, returning mock data.`);
      return getMockPost(id);
    }
    
    return res.json();
  } catch (err) {
    console.error('API Error:', err);
    return getMockPost(id);
  }
}

// Fallback Mock Data for UI Testing
function getMockPosts(type?: PostType, limit = 10, offset = 0): {data: Post[], pagination: any} {
  const mockData: Post[] = [
    {
      id: '1',
      title: 'React 19에서 변경된 점 분석',
      type: 'insight',
      summary: 'React 19 컴파일러와 훅들의 변경점 등을 정리합니다.',
      tags: ['react', 'frontend'],
      audioUrl: '/audio/chill_beat.mp3',
      audioMood: 'Chill',
      createdAt: '2026-03-09T10:00:00+09:00'
    },
    {
      id: '2',
      title: '개인 블로그 아카이브 구조 설계',
      type: 'project',
      summary: 'Think, Build, Record, Listen 컨셉의 프로젝트 아카이빙 플랫폼 기획/개발 일지.',
      tags: ['nextjs', 'design-system'],
      status: 'in-progress',
      createdAt: '2026-03-08T15:30:00+09:00'
    },
    {
      id: '3',
      title: 'Next.js 팀 미팅 및 아키텍처 토론',
      type: 'timeline',
      summary: '사내 세미나 이후 블로그 리팩토링 관련 간단한 결심',
      tags: ['meeting', 'architecture'],
      createdAt: '2026-03-07T09:12:00+09:00'
    }
  ];
  
  const filtered = type ? mockData.filter(p => p.type === type) : mockData;
  return {
    data: filtered.slice(offset, offset + limit),
    pagination: { total: filtered.length, offset, limit }
  };
}

function getMockPost(id: string): {data: Post} {
  return {
    data: {
      id,
      title: '리뷰어 피드백을 수용한 아키텍처 개편기',
      type: 'insight',
      summary: '테스트용 목업 데이터입니다. 마크다운이 제대로 렌더링되는지 확인합니다.',
      tags: ['architecture', 'review'],
      audioUrl: '/audio/chill_beat.mp3',
      audioMood: 'Energetic',
      createdAt: '2026-03-09T10:41:11+09:00',
      content: `
# 서론

이 글은 동기식 렌더링에서 발생하는 블로킹 이슈를 해결하기 위해 작성된 **테스트 인사이트 문서**입니다.

## 적용 기술
- Next.js 15 (App Router)
- React 19 (Server Components)
- Tailwind CSS v4

### 커스텀 컴포넌트 테스트
아래는 \`<AudioPlayer />\` 커스텀 컴포넌트 렌더링 테스트입니다.
<AudioPlayer src="/audio/sample.mp3" title="Sample Track" mood="Chill" />

> [!NOTE]
> 블로그 내부에서 MDX가 정상적으로 치환되는지를 확인합니다.

결론적으로, 이 컴포넌트는 모든 마크다운을 정상 파싱합니다.
`
    }
  };
}
