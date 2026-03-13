'use client';

import { useState, useEffect } from 'react';
import { 
  getMyProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  getAdminUserByEmail
} from '@dataconnect/generated';
import { dataconnect } from '@/lib/firebase';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import { getAuth } from 'firebase/auth';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [published, setPublished] = useState(false);
  const [order, setOrder] = useState<number>(0);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await getMyProjects(dataconnect);
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
      alert('목록을 불러오는 데 실패했습니다.');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setTitle('');
    setDescription('');
    setTechStack('');
    setLiveDemoUrl('');
    setRepositoryUrl('');
    setStartDate('');
    setEndDate('');
    setPublished(false);
    setOrder(0);
  };

  const handleEdit = (project: any) => {
    setIsEditing(true);
    setCurrentId(project.id);
    setTitle(project.title);
    setDescription(project.description || '');
    setTechStack((project.techStack || []).join(', '));
    setLiveDemoUrl(project.liveDemoUrl || '');
    setRepositoryUrl(project.repositoryUrl || '');
    setStartDate(project.startDate || '');
    setEndDate(project.endDate || '');
    setPublished(project.published);
    setOrder(project.order || 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteProject(dataconnect, { id });
      await fetchProjects();
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

    const techArray = techStack.split(',').map(t => t.trim()).filter(t => t);

    try {
      if (isEditing && currentId) {
        await updateProject(dataconnect, {
          id: currentId,
          title,
          description,
          techStack: techArray,
          liveDemoUrl: liveDemoUrl || null,
          repositoryUrl: repositoryUrl || null,
          startDate,
          endDate: endDate || null,
          published,
          order
        });
        alert('성공적으로 수정되었습니다.');
      } else {
        const adminRes = await getAdminUserByEmail(dataconnect, { email: user.email! });
        const actualAuthorId = adminRes.data.users[0].id;

        await createProject(dataconnect, {
          authorId: actualAuthorId, 
          title,
          description,
          techStack: techArray,
          liveDemoUrl: liveDemoUrl || null,
          repositoryUrl: repositoryUrl || null,
          startDate,
          endDate: endDate || null,
          published,
          order
        });
        alert('새 프로젝트가 작성되었습니다.');
      }
      resetForm();
      await fetchProjects();
    } catch (err: any) {
      console.error(err);
      alert(`저장 실패: ${err.message}`);
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">Projects 관리</h1>
      </header>

      {/* Editor Form */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          {isEditing ? '프로젝트 수정' : '새 프로젝트 작성'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">프로젝트명</label>
              <input required type="text" value={title} onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border" />
            </div>

             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">노출 순서 (Order)</label>
              <input type="number" value={order} onChange={e => setOrder(Number(e.target.value))}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">간단 설명 (Description)</label>
              <MarkdownEditor value={description} onChange={setDescription} minHeight="200px" placeholder="프로젝트에 대한 짧은 소개 (Markdown 형식)" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">기술 스택 (쉼표로 구분)</label>
              <input type="text" value={techStack} onChange={e => setTechStack(e.target.value)}
                placeholder="Next.js, Tailwind, Firebase" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">시작일 (YYYY-MM-DD)</label>
              <input required type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">종료일 (미입력 시 진행 중)</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">GitHub 리포지토리 URL</label>
              <input type="url" value={repositoryUrl} onChange={e => setRepositoryUrl(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">라이브 여부 (데모 URL)</label>
              <input type="url" value={liveDemoUrl} onChange={e => setLiveDemoUrl(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border" />
            </div>

             <div className="flex items-center gap-3 md:col-span-2 pt-4">
              <input type="checkbox" id="published" checked={published} onChange={e => setPublished(e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded bg-slate-100" />
              <label htmlFor="published" className="text-sm font-medium text-slate-700 dark:text-slate-300">발행하기 (체크 시 대중에게 공개됩니다)</label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            {isEditing && (
              <button type="button" onClick={resetForm} className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg">취소</button>
            )}
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
              {isEditing ? '수정 내용 저장' : '새 프로젝트 등록'}
            </button>
          </div>
        </form>
      </section>

      {/* List */}
      <section className="space-y-6 flex flex-col pt-8">
        <h2 className="text-xl font-bold">등록된 프로젝트 목록</h2>
        <div className="grid grid-cols-1 gap-4">
          {loading ? <p>불러오는 중...</p> : projects.map(p => (
            <div key={p.id} className="p-4 border rounded-xl flex justify-between bg-white dark:bg-slate-800">
              <div>
                <h3 className="font-bold flex gap-2">
                  {p.title} <span className="text-slate-400 text-sm">({p.published ? '공개' : '비공개'})</span>
                </h3>
                <p className="text-sm text-slate-500">{p.startDate} ~ {p.endDate || '현재'}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="text-blue-500">편집</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-500">삭제</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
