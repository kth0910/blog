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
  // DB에서 온 데이터에 문자열 형태의 \n이 포함되어 있을 경우 실제 줄바꿈으로 변환
  const processedContent = content
    .replace(/\\n/g, '\n')
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
