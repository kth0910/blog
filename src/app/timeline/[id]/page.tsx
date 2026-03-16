import { getPost } from '@/lib/api';
import TimelineDetailClient from './TimelineDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getPost(id);
  return { title: data ? `${data.title} | Timeline` : 'Timeline Not Found' };
}

export default async function TimelineDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <TimelineDetailClient id={id} />;
}
