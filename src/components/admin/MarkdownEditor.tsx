'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = '내용을 입력하세요 (Markdown 지원)',
  minHeight = '300px'
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex flex-col bg-white dark:bg-slate-800">
      {/* Editor Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setIsPreview(false)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            !isPreview 
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-600' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setIsPreview(true)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            isPreview 
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-600' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 relative" style={{ minHeight }}>
        {isPreview ? (
          <div className="absolute inset-0 p-4 overflow-y-auto prose prose-slate dark:prose-invert max-w-none prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-800">
            {value ? (
              <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
              <p className="text-slate-400 italic">미리볼 내용이 없습니다.</p>
            )}
          </div>
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="absolute inset-0 w-full p-4 resize-none focus:outline-none bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        )}
      </div>
    </div>
  );
}
