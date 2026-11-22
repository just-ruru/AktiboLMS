import type { HTMLAttributes } from 'react'

export interface CourseCardProps extends HTMLAttributes<HTMLDivElement> {
  courseCode: string
  status: 'Enrolled' | 'Open to enroll' | 'Completed'
  title: string
  instructor: string
  structure: string
  progress: number // 0-100
  buttonLabel: string
  onButtonClick?: () => void
  isInstructor?: boolean
}

export function CourseCard({
  courseCode,
  status,
  title,
  instructor,
  structure,
  progress,
  buttonLabel,
  onButtonClick,
  isInstructor = false,
  className = '',
  ...props
}: CourseCardProps) {
  const statusColors: Record<string, string> = {
    Enrolled: 'bg-[#e9f5ef] text-[#236543]',
    'Open to enroll': 'bg-[#f4f6fa] text-[#596579]',
    Completed: 'bg-[#e9f5ef] text-[#236543]',
  }

  return (
    <div
      className={[
        'course-card bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col items-start p-[20px] relative rounded-[16px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <div className="course-card__top">
        <div
          className={[
            'bg-[#f4f6fa] content-stretch flex items-center justify-center rounded-[6px] px-3 py-1',
            statusColors[status],
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <p className="font-['Lexend_Exa:Regular'] text-[#000e53] text-[10px]">
            {courseCode}
          </p>
        </div>
        <div
          className={[
            'content-stretch flex items-center justify-center rounded-[6px] px-3 py-1',
            status === 'Enrolled' ? 'bg-[#e9f5ef] text-[#236543]' : 'bg-[#f4f6fa] text-[#596579]',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <p className="font-['Lexend_Exa:Regular'] text-[10px]">
            {status}
          </p>
        </div>
      </div>
      <h2 className="course-card__title font-['Lexend_Exa:Bold'] font-bold text-[#15203a] text-[18px]">
        {title}
      </h2>
      <p className="course-card__instructor font-['Lexend_Exa:Regular'] text-[#596579] text-[12px]">
        {instructor}
      </p>
      <p className="course-card__structure font-['Lexend_Exa:Regular'] text-[#596579] text-[11px]">
        {structure}
      </p>
      <div className="course-card__footer">
        <div className="course-card__progress">
          <p className="mb-2 text-[#596579] text-[10px]">
              Learning progress
            </p>
          <div className="course-card__progress-track bg-[#e7ebf3] h-[6px] rounded-[3px] overflow-hidden">
            <div
              className="bg-[#ffb700] h-full rounded-[3px] transition-all duration-300 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
            </div>
        </div>
        <button
          type="button"
          onClick={onButtonClick}
          className={[
            'course-card__action h-[40px] rounded-[9px] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0',
            isInstructor
              ? 'bg-white border border-[#dee4ee] text-[#000e53] hover:bg-[#f4f6fa]'
              : 'bg-[#ffb700] border border-[#000e53] text-[#000e53] hover:bg-[#ffc933] active:bg-[#e8a800]',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="font-['Lexend_Exa:Bold'] text-[12px]">
            {buttonLabel}
          </span>
        </button>
      </div>
    </div>
  )
}
