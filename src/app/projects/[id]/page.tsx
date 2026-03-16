import { getPost } from '@/lib/api';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getPost(id);
  return { title: data ? `${data.title} | Project` : 'Project Not Found' };
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <ProjectDetailClient id={id} />;
}
