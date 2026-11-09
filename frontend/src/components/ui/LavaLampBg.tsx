/**
 * LavaLampBg — moving blur gradient background.
 *
 * Uses pure CSS + SVG feGaussianBlur/feColorMatrix filters on absolutely
 * positioned blurred blobs. GPU-composited, no JavaScript, respects
 * prefers-reduced-motion.
 */
import type { HTMLAttributes } from 'react'
import { useEffect, useState } from 'react'

interface LavaLampBgProps extends HTMLAttributes<HTMLDivElement> {}

export function LavaLampBg({ className = '', ...props }: LavaLampBgProps) {
  const [motion, setMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setMotion(mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  if (motion) {
    // Static fallback when user prefers reduced motion
    return (
      <div
        className={['absolute inset-0 bg-aktif-navy z-[-1]', className].filter(Boolean).join(' ')}
        {...props}
      />
    )
  }

  return (
    <div
      className={['relative w-full h-full overflow-hidden bg-aktif-navy z-[-1]', className].filter(Boolean).join(' ')}
      {...props}
    >
      <svg
        width="0"
        height="0"
        className="hidden"
        aria-hidden="true"
      >
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      <div className="absolute inset-0 -z-10 filter url(#goo) overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-aktif-gold/20 blur-[120px] lava-blob-1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#001a83]/20 blur-[140px] lava-blob-2" />
        <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-aktif-gold/10 blur-[100px] lava-blob-3" />
      </div>
    </div>
  )
}
