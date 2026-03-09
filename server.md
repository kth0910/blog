# 블로그 백엔드 API 명세서 및 DB 스키마

본 블로그는 로컬 저장소를 정적 에셋(로고 등)을 제외하고는 사용하지 않으며, **매번 외부 데이터베이스 및 백엔드 서버 등과 API로 통신하여 데이터를 가져오는 구조**를 가집니다. 특히, 노션 스타일의 MDX 파일을 데이터베이스에 올리고, 클라이언트에서 이를 불러와 마크다운으로 동적 렌더링하는 형태로 운영됩니다.

## 1. DB 스키마 설계 (Posts Table 기준)

각각의 글은 RDBMS 또는 NoSQL 등에 다음과 같은 스키마 형태로 저장된다고 가정합니다.

| Column Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Primary Key | 포스트 고유 식별자 |
| `title` | Varchar | Not Null | 글 제목 |
| `content` | Text | Not Null | MDX 원본(또는 마크다운) 텍스트 데이터 |
| `type` | Enum | Not Null | 'project' \| 'insight' \| 'timeline' |
| `summary` | Text | | 서론 및 핵심 요약 |
| `tags` | JSON / Array | | 분류용 태그 목록 |
| `status` | Enum | | 문서 상태 (예: 'draft', 'published') |
| `audioUrl` | Varchar | | (Insight 타입용) AI 테마곡 스트리밍 또는 저장 경로 URL |
| `audioMood` | Varchar | | 해당 테마곡 분위기 속성 |
| `createdAt` | Timestamp | Default Now | 작성 일자 |
| `updatedAt` | Timestamp | | 수정 일자 |

## 2. 모의 API 명세서 (RESTful API 기준)

클라이언트(Next.js)에서 백엔드와 비동기 통신을 위해 사용할 대상 API 엔드포인트들의 정의입니다. 실 운영 단계에서는 Fetch API 혹은 Axios를 통해 이 엔드포인트들을 호출합니다.

### 2.1 글 목록 조회 (포스트 리스트 가져오기)
- **Endpoint**: `GET /api/posts`
- **Query Params**:
  - `type` (선택): 특정 타입의 글만 필터링 (예: `?type=insight`)
  - `limit`, `offset` (선택): 페이징 처리용
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3...",
      "title": "React 19에서 변경된 점",
      "type": "insight",
      "summary": "핵심 변경점 요약...",
      "tags": ["react", "frontend"],
      "createdAt": "2026-03-09T10:41:11+09:00"
    }
  ],
  "pagination": { "total": 24, "offset": 0, "limit": 10 }
}
```

### 2.2 단일 상세 글 내용 조회 (MDX 렌더링용)
- **Endpoint**: `GET /api/posts/:id`
- **Description**: 포스트 상세 보기 접근 시, 메타데이터와 본문인 `content` (MDX 데이터)를 전부 받아옵니다.
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3...",
    "title": "React 19에서 변경된 점",
    "content": "# 서론\n\n이 구조는 노션 스타일로 작성된 데이터입니다. <AudioPlayer src='...' /> 커스텀 요소도 들어갈 수 있습니다.",
    "type": "insight",
    "audioUrl": "https://external-storage.com/audio/track1.mp3",
    "audioMood": "Chill",
    "createdAt": "2026-03-09T10:41:11+09:00"
  }
}
```

### 2.3 MDX 문서 업로드 및 작성 (POST)
- **Endpoint**: `POST /api/posts`
- **Description**: 노션 스타일로 로컬에서 작성한 MDX, 혹은 웹 에디터에서 작성한 본문을 DB 서버에 저장합니다.
- **Body**:
```json
{
  "title": "새 프로젝트 기획",
  "content": "프로젝트 시작 로그 및 마크다운 본문...",
  "type": "project",
  "summary": "신규 개인 프로젝트 기획서입니다.",
  "status": "published"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "생성된_식별자_ID"
  }
}
```

### 2.4 타임라인 일정 조회 연동 (`type: timeline`)
- **Endpoint**: `GET /api/events` (별도의 캘린더용 DB 참조 시 사용할 엔드포인트)
- **Description**: 구글 캘린더 등과 연동되어 수집된, 날짜 기반 일정 데이터를 배열로 반환합니다.

## 3. 프론트엔드 데이터 처리 (MDX Rendering)
Next.js 프론트엔드는 위 `/api/posts/:id` 에서 가져온 `content` 텍스트 필드를 단순히 뿌려주기만 하지 않고, `next-mdx-remote` 플러그인 등 MDX 파서를 사용해 다음 과정으로 렌더링합니다.

1. 서버에서 Fetch API로 `content` 다운로드.
2. 클라이언트 또는 서버 컴포넌트(RSC) 단에서 `MDXRemote` 컴포넌트를 이용해 문자열을 직렬화(Serialize).
3. `<AudioPlayer>`, `<InsightBlock>` 등의 작성된 커스텀 컴포넌트가 마크다운 내부에 있을 시, HTML 요소로 치환하여 사용자에게 제공.
