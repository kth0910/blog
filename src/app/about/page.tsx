export const metadata = {
  title: 'About | Archive',
};

export default function AboutPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-3xl mx-auto">
      <header className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          About
        </h1>
      </header>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium mb-8">
          안녕하세요, 개인 프로젝트와 인사이트를 기록하는 공간입니다.
        </p>
        <p className="leading-relaxed">
          이 블로그는 단순한 글의 나열을 넘어, 프로젝트의 생명주기를 기록하고 경험에서 얻은 인사이트를 오디오(AI Generated Theme)와 함께 공감각적으로 저장하기 위해 설계되었습니다.
        </p>
        
        <h3 className="text-2xl font-bold mt-12 mb-6">Think → Build → Record → Listen</h3>
        <ul className="space-y-4">
          <li><strong>Think</strong>: 기획과 아이디어를 고민합니다.</li>
          <li><strong>Build</strong>: 치열하게 개발하고 구현합니다.</li>
          <li><strong>Record</strong>: 진행 과정과 결과를 타임라인과 인사이트 노트로 기록합니다.</li>
          <li><strong>Listen</strong>: 경험의 감정과 분위기를 테마곡으로 승화하여 재생합니다.</li>
        </ul>
      </div>
    </div>
  );
}
