import { RichTextEditor } from '../editor/RichTextEditor'
import { CodeEditor } from '../editor/CodeEditor'
import { Image, Video, Code } from 'lucide-react'

interface ContentBlockContent {
  text?: string
  videoUrl?: string
  imageUrl?: string
  language?: string
  code?: string
}

interface ContentBlockProps {
  block: {
    id: string
    type: 'text' | 'video' | 'image' | 'code_snippet'
    content: ContentBlockContent
    orderIndex: number
  }
  readOnly?: boolean
  onChange?: (blockId: string, content: ContentBlockContent) => void
}

export function ContentBlock({ block, readOnly = true, onChange }: ContentBlockProps) {
  const { type, content, id } = block

  const handleTextChange = (text: string) => {
    onChange?.(id, { ...content, text })
  }

  const handleCodeChange = (code: string) => {
    onChange?.(id, { ...content, code })
  }

  switch (type) {
    case 'text':
      return (
        <div className="prose prose-sm sm:prose lg:prose-xl max-w-none">
          <RichTextEditor
            content={content.text || ''}
            onChange={handleTextChange}
            readOnly={readOnly}
            editable={!readOnly}
            placeholder="Write your lesson content here..."
          />
        </div>
      )

    case 'video':
      return (
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
          {content.videoUrl ? (
            <iframe
              src={content.videoUrl}
              title="Lesson video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <Video className="w-12 h-12 mb-2" />
              <p>No video URL provided</p>
            </div>
          )}
        </div>
      )

    case 'image':
      return (
        <div className="rounded-lg overflow-hidden bg-gray-100">
          {content.imageUrl ? (
            <img
              src={content.imageUrl}
              alt="Lesson image"
              className="w-full h-auto"
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <Image className="w-12 h-12 mb-2" />
              <p>No image URL provided</p>
            </div>
          )}
        </div>
      )

    case 'code_snippet':
      return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 uppercase">
                {content.language || 'code'}
              </span>
            </div>
          </div>
          <CodeEditor
            value={content.code || ''}
            onChange={handleCodeChange}
            language={content.language || 'plaintext'}
            readOnly={readOnly}
            theme="vs"
            height="auto"
            className="min-h-[200px]"
          />
        </div>
      )

    default:
      return null
  }
}