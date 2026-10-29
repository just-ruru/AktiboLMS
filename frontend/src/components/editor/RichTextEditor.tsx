import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Bold, Italic, Code, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Undo, Redo, Link, Image } from 'lucide-react'
import { clsx } from 'clsx'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  readOnly?: boolean
  className?: string
  editable?: boolean
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const isActive = (name: string) => editor.isActive(name)

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-100 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', isActive('heading') && editor.getAttributes('heading').level === 1 ? 'bg-primary-100 text-primary-700' : 'text-gray-600')}
        title="Heading 1"
        aria-label="Heading 1"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', isActive('heading') && editor.getAttributes('heading').level === 2 ? 'bg-primary-100 text-primary-700' : 'text-gray-600')}
        title="Heading 2"
        aria-label="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', isActive('heading') && editor.getAttributes('heading').level === 3 ? 'bg-primary-100 text-primary-700' : 'text-gray-600')}
        title="Heading 3"
        aria-label="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', isActive('bold') ? 'bg-primary-100 text-primary-700' : 'text-gray-600')}
        title="Bold (Ctrl+B)"
        aria-label="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', isActive('italic') ? 'bg-primary-100 text-primary-700' : 'text-gray-600')}
        title="Italic (Ctrl+I)"
        aria-label="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', isActive('code') ? 'bg-primary-100 text-primary-700' : 'text-gray-600')}
        title="Inline Code"
        aria-label="Inline Code"
      >
        <Code className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', isActive('bulletList') ? 'bg-primary-100 text-primary-700' : 'text-gray-600')}
        title="Bullet List"
        aria-label="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', isActive('orderedList') ? 'bg-primary-100 text-primary-700' : 'text-gray-600')}
        title="Numbered List"
        aria-label="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', isActive('blockquote') ? 'bg-primary-100 text-primary-700' : 'text-gray-600')}
        title="Quote"
        aria-label="Quote"
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        type="button"
        onClick={addLink}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', isActive('link') ? 'bg-primary-100 text-primary-700' : 'text-gray-600')}
        title="Add Link"
        aria-label="Add Link"
      >
        <Link className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={addImage}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', isActive('image') ? 'bg-primary-100 text-primary-700' : 'text-gray-600')}
        title="Add Image"
        aria-label="Add Image"
      >
        <Image className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', !editor.can().undo() ? 'opacity-50 cursor-not-allowed' : 'text-gray-600')}
        title="Undo (Ctrl+Z)"
        aria-label="Undo"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={clsx('p-2 rounded hover:bg-gray-200 transition-colors', !editor.can().redo() ? 'opacity-50 cursor-not-allowed' : 'text-gray-600')}
        title="Redo (Ctrl+Shift+Z)"
        aria-label="Redo"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  )
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
  readOnly = false,
  className = '',
  editable = true,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-xl max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
  })

  if (readOnly || !editable) {
    return (
      <div className={clsx('prose prose-sm sm:prose lg:prose-xl max-w-none p-4', className)}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }

  return (
    <div className={clsx('border border-gray-200 rounded-lg bg-white', className)}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}