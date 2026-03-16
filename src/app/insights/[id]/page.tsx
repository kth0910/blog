import { getPost } from '@/lib/api';
import InsightDetailClient from './InsightDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getPost(id);
  return { title: data ? `${data.title} | Insight` : 'Insight Not Found' };
}

export default async function InsightDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <InsightDetailClient id={id} />;
}
