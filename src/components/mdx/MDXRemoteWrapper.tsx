'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { AudioPlayer } from '../audio/AudioPlayer';

const components: any = {
  // custom components style
  code: (props: any) => <code className="font-mono text-sm bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded" {...props} />,
};

interface MDXRemoteWrapperProps {
  content: string;
}

export function MDXRemoteWrapper({ content }: MDXRemoteWrapperProps) {
  // DB에서 온 데이터 전처리
  const processedContent = content
    .replace(/\\n/g, '\n') // 리터럴 \n 변환
    // 1. 구두점 + 볼드종료 + 문자 (예: **"시장성"**와) -> 구두점과 볼드 사이에 제로너비 공백 삽입
    .replace(/(["')\]>.?!])(\*\*|__)([가-힣a-zA-Z0-9])/g, '$1\u200B$2$3')
    // 2. 문자 + 볼드시작 + 구두점 (예: 은**"시장성"**) -> 볼드와 구두점 사이에 제로너비 공백 삽입
    .replace(/([가-힣a-zA-Z0-9])(\*\*|__)(["'(\[<])/g, '$1$2\u200B$3')
    // 3. 기존 규칙: 한글과 볼드 기호 사이 안정화
    .replace(/(\*\*|__)([가-힣])/g, '$1\u200B$2')
    .replace(/([가-힣])(\*\*|__)/g, '$1\u200B$2')
    .trim();

  return (
    <div className="mdx-content prose prose-slate dark:prose-invert max-w-none 
      prose-headings:tracking-tight prose-headings:font-bold
      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
      prose-blockquote:border-l-indigo-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/30
      prose-img:rounded-2xl
      prose-pre:bg-slate-900 prose-pre:text-white prose-pre:rounded-xl">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm, remarkBreaks]} 
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
