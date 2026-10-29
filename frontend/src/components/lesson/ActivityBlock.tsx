import { useState } from 'react'
import { CodeEditor } from '../editor/CodeEditor'
import { Button } from '../ui/Button'
import { Card, CardBody, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { CheckCircle, XCircle, AlertCircle, Play, RotateCcw } from 'lucide-react'
import { clsx } from 'clsx'
import { api } from '../../services/api'
import { Activity, ActivityProgress, CodeSubmission, QuizAttempt } from '../../types'

interface ActivityBlockProps {
  activity: Activity
  progress?: ActivityProgress
  onSubmit: (activityId: string, data: any) => Promise<void>
  readOnly?: boolean
}

export function ActivityBlock({ activity, progress, onSubmit, readOnly = false }: ActivityBlockProps) {
  const { type, config } = activity
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; output?: string; error?: string } | null>(null)

  const handleSubmit = async (data: any) => {
    setSubmitting(true)
    setResult(null)
    try {
      await onSubmit(activity.id, data)
      setResult({ success: true, message: 'Submitted successfully!' })
    } catch (error: any) {
      setResult({ success: false, message: error.response?.data?.message || 'Submission failed' })
    } finally {
      setSubmitting(false)
    }
  }

  const statusColors = {
    not_started: 'gray',
    in_progress: 'warning',
    submitted: 'primary',
    completed: 'success',
  }

  const statusLabels = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    submitted: 'Submitted',
    completed: 'Completed',
  }

  if (type === 'code_exercise') {
    const [code, setCode] = useState(config.starterCode || '')
    const [output, setOutput] = useState<string | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [running, setRunning] = useState(false)

    const runCode = async () => {
      setRunning(true)
      setOutput(undefined)
      setError(undefined)
      try {
        const response = await api.post('/code/execute', {
          code,
          language: config.language || 'python',
        })
        setOutput(response.data.output)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Execution failed')
      } finally {
        setRunning(false)
      }
    }

    const submitCode = async () => {
      await handleSubmit({ code, language: config.language || 'python' })
    }

    return (
      <Card className="border-l-4 border-primary-500">
        <CardHeader className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Code Exercise</h3>
            <p className="text-sm text-gray-500 mt-1">{config.language || 'python'}</p>
          </div>
          <Badge variant={statusColors[progress?.status || 'not_started']}>
            {statusLabels[progress?.status || 'not_started']}
          </Badge>
        </CardHeader>
        <CardBody className="space-y-4">
          <CodeEditor
            value={code}
            onChange={setCode}
            language={config.language || 'python'}
            readOnly={readOnly}
            onRun={runCode}
            running={running}
            output={output}
            error={error}
            height="350px"
          />
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={() => setCode(config.starterCode || '')} disabled={readOnly}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button
              variant="primary"
              onClick={runCode}
              disabled={running || readOnly}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              Run Code
            </Button>
            {!readOnly && progress?.status !== 'completed' && (
              <Button
                variant="primary"
                onClick={submitCode}
                disabled={submitting}
                className="gap-2"
              >
                {submitting ? 'Submitting...' : 'Submit Solution'}
              </Button>
            )}
          </div>
          {result && (
            <div className={clsx('p-3 rounded-lg text-sm', result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800')}>
              <div className="flex items-center gap-2">
                {result.success ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                {result.message}
              </div>
            </div>
          )}
          {progress?.score !== undefined && progress.status === 'completed' && (
            <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
              <strong>Score: {progress.score}%</strong>
            </div>
          )}
        </CardBody>
      </Card>
    )
  }

  if (type === 'quiz') {
    const [answers, setAnswers] = useState<number[]>(new Array(config.questions?.length || 0).fill(-1))
    const [showResults, setShowResults] = useState(false)

    const handleAnswer = (questionIndex: number, optionIndex: number) => {
      if (readOnly || showResults) return
      const newAnswers = [...answers]
      newAnswers[questionIndex] = optionIndex
      setAnswers(newAnswers)
    }

    const submitQuiz = async () => {
      await handleSubmit({ answers })
      setShowResults(true)
    }

    const questions = config.questions || []

    return (
      <Card className="border-l-4 border-purple-500">
        <CardHeader className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quiz</h3>
            <p className="text-sm text-gray-500 mt-1">{questions.length} questions</p>
          </div>
          <Badge variant={statusColors[progress?.status || 'not_started']}>
            {statusLabels[progress?.status || 'not_started']}
          </Badge>
        </CardHeader>
        <CardBody className="space-y-6">
          {questions.map((question, qIndex) => (
            <div key={question.id || qIndex} className="space-y-3">
              <p className="font-medium text-gray-900">{qIndex + 1}. {question.question}</p>
              <div className="space-y-2 ml-4">
                {question.options.map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className={clsx(
                      'flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all',
                      showResults
                        ? oIndex === question.correctIndex
                          ? 'bg-green-50 border-green-300'
                          : answers[qIndex] === oIndex
                          ? 'bg-red-50 border-red-300'
                          : 'bg-gray-50 border-gray-200'
                        : answers[qIndex] === oIndex
                        ? 'bg-primary-50 border-primary-300'
                        : 'bg-white border-gray-200 hover:border-primary-300'
                    )}
                  >
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value={oIndex}
                      checked={answers[qIndex] === oIndex}
                      onChange={() => handleAnswer(qIndex, oIndex)}
                      disabled={readOnly || showResults}
                      className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <span className="text-gray-700">{option}</span>
                    {showResults && oIndex === question.correctIndex && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                    {showResults && answers[qIndex] === oIndex && answers[qIndex] !== question.correctIndex && (
                      <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                    )}
                  </label>
                ))}
                {showResults && question.explanation && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            {!readOnly && !showResults && progress?.status !== 'completed' && (
              <Button
                variant="primary"
                onClick={submitQuiz}
                disabled={submitting || answers.some(a => a === -1)}
                className="gap-2"
              >
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </Button>
            )}
            {showResults && (
              <Button variant="secondary" onClick={() => setShowResults(false)}>
                Try Again
              </Button>
            )}
          </div>
          {result && (
            <div className={clsx('p-3 rounded-lg text-sm', result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800')}>
              <div className="flex items-center gap-2">
                {result.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                {result.message}
              </div>
            </div>
          )}
          {progress?.score !== undefined && progress.status === 'completed' && (
            <div className="p-3 bg-purple-50 text-purple-800 rounded-lg text-sm">
              <strong>Score: {progress.score}%</strong>
            </div>
          )}
        </CardBody>
      </Card>
    )
  }

  return null
}