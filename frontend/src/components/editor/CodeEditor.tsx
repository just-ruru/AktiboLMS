import { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { Badge } from '../ui/Badge'
import { clsx } from 'clsx'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  theme?: 'vs-dark' | 'vs' | 'hc-black'
  readOnly?: boolean
  height?: string
  className?: string
  onRun?: () => void
  running?: boolean
  output?: string
  error?: string
}

const languageMap: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  csharp: 'csharp',
  go: 'go',
  rust: 'rust',
  php: 'php',
  ruby: 'ruby',
  swift: 'swift',
  kotlin: 'kotlin',
  sql: 'sql',
}

export function CodeEditor({
  value,
  onChange,
  language,
  theme = 'vs-dark',
  readOnly = false,
  height = '400px',
  className = '',
  onRun,
  running,
  output,
  error,
}: CodeEditorProps) {
  const editorRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue())
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (onRun && !running) onRun()
    })
  }

  if (!mounted) {
    return (
      <div className={clsx('border border-gray-200 rounded-lg overflow-hidden', className)} style={{ height }}>
        <div className="flex items-center justify-center h-full bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx('border border-gray-200 rounded-lg overflow-hidden bg-gray-900', className)}>
      <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700">
        <Badge variant="gray" className="text-xs">
          {language.toUpperCase()}
        </Badge>
        {onRun && (
          <button
            onClick={onRun}
            disabled={running}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {running ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Running...
              </>
            ) : (
              'Run Code'
            )}
          </button>
        )}
      </div>

      <Editor
        height={height}
        defaultLanguage={languageMap[language] || 'plaintext'}
        value={value}
        theme={theme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: language === 'python' ? 4 : 2,
          readOnly,
          wordWrap: 'on',
          bracketPairColorization: { enabled: true },
          guides: { bracketPairs: true },
        }}
        onMount={handleEditorDidMount}
      />

      {(output || error) && (
        <div className="border-t border-gray-700 bg-gray-800 p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase">Output</span>
            {error && <Badge variant="danger" className="text-xs">Error</Badge>}
            {output && !error && <Badge variant="success" className="text-xs">Success</Badge>}
          </div>
          <pre className="text-sm text-gray-100 whitespace-pre-wrap font-mono max-h-60 overflow-auto">
            {error || output}
          </pre>
        </div>
      )}
    </div>
  )
}