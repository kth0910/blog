import ProjectArticleDetailClient from './ProjectArticleDetailClient';

export default async function ProjectArticlePage({ params }: { params: Promise<{ id: string, articleId: string }> }) {
  const { id, articleId } = await params;
  return <ProjectArticleDetailClient projectId={id} articleId={articleId} />;
}
