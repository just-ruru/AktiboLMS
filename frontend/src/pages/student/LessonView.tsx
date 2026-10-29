import { useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ContentBlock } from '../../components/lesson/ContentBlock'
import { ActivityBlock } from '../../components/lesson/ActivityBlock'
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const mockLesson = {
  id: '1',
  title: 'Variables and Data Types',
  description: 'Learn about variables, data types, and basic operations in Python',
  contentBlocks: [
    {
      id: '1',
      type: 'text' as const,
      content: {
        text: '<h2>Introduction to Variables</h2><p>In programming, a <strong>variable</strong> is a container for storing data values. Think of it as a labeled box where you can put information and retrieve it later.</p><h3>Creating Variables in Python</h3><p>Python makes it easy to create variables. You don\'t need to declare the type explicitly:</p>',
      },
      orderIndex: 0,
    },
    {
      id: '2',
      type: 'code_snippet' as const,
      content: {
        language: 'python',
        code: '# Creating variables\nname = "Alice"      # String (text)\nage = 25              # Integer (whole number)\nheight = 5.75         # Float (decimal number)\nis_student = True     # Boolean (True/False)\n\nprint(f"Name: {name}")\nprint(f"Age: {age}")\nprint(f"Height: {height}")\nprint(f"Is Student: {is_student}")',
      },
      orderIndex: 1,
    },
    {
      id: '3',
      type: 'text' as const,
      content: {
        text: '<h3>Variable Naming Rules</h3><ul><li>Must start with a letter or underscore (_)</li><li>Can only contain letters, numbers, and underscores</li><li>Case-sensitive: <code>name</code> and <code>Name</code> are different</li><li>Cannot use Python keywords (if, else, for, while, etc.)</li></ul><p>Good examples: <code>user_name</code>, <code>total_count</code>, <code>_private_var</code></p>',
      },
      orderIndex: 2,
    },
  ],
  activities: [
    {
      id: '1',
      type: 'code_exercise' as const,
      config: {
        language: 'python',
        starterCode: '# TODO: Create variables for your info\nname = ""\nage = 0\nheight = 0.0\n\n# Print them\nprint(f"Name: {name}")\nprint(f"Age: {age}")\nprint(f"Height: {height}")',
        solutionCode: 'name = "Your Name"\nage = 20\nheight = 5.5\n\nprint(f"Name: {name}")\nprint(f"Age: {age}")\nprint(f"Height: {height}")',
        testCases: [
          { input: '', expectedOutput: 'Name: Your Name\nAge: 20\nHeight: 5.5' },
        ],
      },
      orderIndex: 0,
      points: 10,
    },
    {
      id: '2',
      type: 'quiz' as const,
      config: {
        questions: [
          {
            id: 'q1',
            question: 'Which of the following is a valid variable name in Python?',
            options: ['2name', 'user_name', 'user-name', 'class'],
            correctIndex: 1,
            explanation: 'Variable names must start with a letter or underscore, can only contain letters, numbers, and underscores. "class" is a reserved keyword.',
          },
          {
            id: 'q2',
            question: 'What data type is the value 3.14?',
            options: ['Integer', 'Float', 'String', 'Boolean'],
            correctIndex: 1,
            explanation: '3.14 is a decimal number, which is a float in Python.',
          },
        ],
      },
      orderIndex: 1,
      points: 10,
    },
  ],
}

export function StudentLessonView() {
  const { lessonId } = useParams()
  const { user } = useAuth()
  const [activeBlock, setActiveBlock] = useState(0)

  const allBlocks = [
    ...mockLesson.contentBlocks.map((b, i) => ({ ...b, kind: 'content' as const, index: i })),
    ...mockLesson.activities.map((a, i) => ({ ...a, kind: 'activity' as const, index: i })),
  ].sort((a, b) => a.orderIndex - b.orderIndex)

  const currentBlock = allBlocks[activeBlock]
  const isFirst = activeBlock === 0
  const isLast = activeBlock === allBlocks.length - 1

  const handleNext = () => {
    if (!isLast) setActiveBlock(activeBlock + 1)
  }

  const handlePrev = () => {
    if (!isFirst) setActiveBlock(activeBlock - 1)
  }

  const handleSubmit = async (activityId: string, data: any) => {
    console.log('Submit activity', activityId, data)
    alert('Submitted! (Mock - backend not connected yet)')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/courses/1" className="text-sm text-primary-600 hover:underline mb-2 inline-block">
            ← Back to Course
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{mockLesson.title}</h1>
          <p className="text-gray-500 mt-1">{mockLesson.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{activeBlock + 1} / {allBlocks.length}</span>
        </div>
      </div>

      <Card>
        <CardBody className="p-0">
          {currentBlock?.kind === 'content' && (
            <ContentBlock block={currentBlock as any} readOnly={true} />
          )}
          {currentBlock?.kind === 'activity' && (
            <ActivityBlock
              activity={currentBlock as any}
              progress={undefined}
              onSubmit={handleSubmit}
              readOnly={false}
            />
          )}
        </CardBody>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={isFirst}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        <div className="flex gap-2">
          {allBlocks.map((block, index) => (
            <button
              key={block.id}
              onClick={() => setActiveBlock(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === activeBlock
                  ? 'bg-primary-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
        <Button onClick={handleNext} disabled={isLast}>
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

import { useState } from 'react'