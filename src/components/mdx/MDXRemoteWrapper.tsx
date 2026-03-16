'use client';

import ReactMarkdown from 'react-markdown';
import { AudioPlayer } from '../audio/AudioPlayer';

const components: any = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-10 mb-6 text-slate-900 dark:text-slate-50" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mt-8 mb-4 tracking-tight text-slate-800 dark:text-slate-100" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-medium mt-6 mb-3 text-slate-800 dark:text-slate-200" {...props} />,
  p: (props: any) => <p className="mb-5 leading-loose text-slate-600 dark:text-slate-400" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-5 space-y-2 text-slate-600 dark:text-slate-400" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-5 space-y-2 text-slate-600 dark:text-slate-400" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-indigo-200 dark:border-indigo-500/30 pl-4 py-1 italic text-slate-500 dark:text-slate-400 my-6 bg-slate-50 dark:bg-slate-800/30 font-medium" {...props} />
  ),
  a: (props: any) => <a className="text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4 decoration-indigo-200 dark:decoration-indigo-900 transition-all" {...props} />,
  code: (props: any) => <code className="font-mono text-sm bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded" {...props} />,
  pre: (props: any) => <pre className="font-mono text-sm bg-slate-900 text-slate-50 p-4 rounded-xl overflow-x-auto my-6" {...props} />,
  // AudioPlayer is a custom component, react-markdown might need extra work to render it if it's in the text.
  // But for simple markdown pieces, it works fine.
};

interface MDXRemoteWrapperProps {
  content: string;
}

export function MDXRemoteWrapper({ content }: MDXRemoteWrapperProps) {
  return (
    <div className="mdx-content">
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
