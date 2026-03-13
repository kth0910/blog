'use client';

import { useState, useEffect } from 'react';
import { 
  listAllInsights, 
  createInsight, 
  updateInsight, 
  deleteInsight,
  getAdminUserByEmail
} from '@dataconnect/generated';
import { dataconnect } from '@/lib/firebase';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import { getAuth } from 'firebase/auth';

export default function AdminInsightsPage() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const { data } = await listAllInsights(dataconnect);
      setInsights(data.insights || []);
    } catch (err) {
      console.error(err);
      alert('인사이트 목록을 불러오는 데 실패했습니다.');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setTitle('');
    setSummary('');
    setContent('');
    setTags('');
    setPublished(false);
  };

  const handleEdit = (insight: any) => {
    setIsEditing(true);
    setCurrentId(insight.id);
    setTitle(insight.title);
    setSummary(insight.summary || '');
    setContent(insight.content);
    setTags((insight.tags || []).join(', '));
    setPublished(insight.published);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteInsight(dataconnect, { id });
      await fetchInsights();
    } catch (err) {
      console.error(err);
      alert('삭제 실패. 권한을 확인하세요.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getAuth().currentUser;
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);

    try {
      if (isEditing && currentId) {
        await updateInsight(dataconnect, {
          id: currentId,
          title,
          summary: summary || null,
          content,
          tags: tagsArray,
          published
        });
        alert('성공적으로 수정되었습니다.');
      } else {
        const adminRes = await getAdminUserByEmail(dataconnect, { email: user.email! });
        const actualAuthorId = adminRes.data.users[0].id;

        await createInsight(dataconnect, {
          authorId: actualAuthorId,
          title,
          summary: summary || null,
          content,
          tags: tagsArray,
          published
        });
        alert('새 인사이트가 작성되었습니다.');
      }
      resetForm();
      await fetchInsights();
    } catch (err: any) {
      console.error(err);
      alert(`저장 실패: ${err.message}`);
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">Insights 관리</h1>
        <p className="text-slate-500 mt-2">인사이트 글을 새로 작성하거나 기존 글을 편집합니다.</p>
      </header>

      {/* Editor Form */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          {isEditing ? '인사이트 수정' : '새 인사이트 작성'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">제목</label>
              <input 
                required
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">요약 (Summary)</label>
              <input 
                type="text" 
                value={summary}
                onChange={e => setSummary(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">태그 (쉼표로 구분)</label>
              <input 
                type="text" 
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="ex) AI, React, Next.js"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">본문 (Content)</label>
              <MarkdownEditor value={content} onChange={setContent} minHeight="400px" />
            </div>
            
            <div className="flex items-center gap-3 md:col-span-2 py-2">
              <input 
                type="checkbox" 
                id="published"
                checked={published}
                onChange={e => setPublished(e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded bg-slate-100 border-slate-300 focus:ring-indigo-500"
              />
              <label htmlFor="published" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                발행하기 (체크 시 대중에게 공개됩니다)
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            {isEditing && (
              <button 
                type="button" 
                onClick={resetForm}
                className="px-6 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 rounded-lg font-medium transition-colors"
              >
                취소
              </button>
            )}
            <button 
              type="submit" 
              className="px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-medium transition-colors shadow-sm"
            >
              {isEditing ? '수정 내용 저장' : '새 글 저장'}
            </button>
          </div>
        </form>
      </section>

      {/* List */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">발행된 목록</h2>
        
        {loading ? (
          <p className="text-slate-400">불러오는 중...</p>
        ) : insights.length === 0 ? (
          <p className="text-slate-400">데이터가 없습니다.</p>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
            {insights.map(item => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    {item.title}
                    <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-sm ${item.published ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`}>
                      {item.published ? '발행됨' : '비공개'}
                    </span>
                  </h3>
                  <div className="text-sm text-slate-500 mt-1 space-x-2">
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    {item.tags?.length > 0 && <span>• {item.tags.join(', ')}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                  >
                    편집
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
