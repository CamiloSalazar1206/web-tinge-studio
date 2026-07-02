import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

// Counts 0 → `to` once, when scrolled into view. Writes to the DOM node
// directly (no React state) — the idiomatic Framer Motion pattern. Respects
// reduced-motion.
export default function CountUp({ to, prefix = '', suffix = '', duration = 1.3 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.textContent = `${prefix}0${suffix}`
    if (!inView) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) { node.textContent = `${prefix}${to}${suffix}`; return }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { node.textContent = `${prefix}${Math.round(v)}${suffix}` },
    })
    return () => controls.stop()
  }, [inView, to, prefix, suffix, duration])

  return <span ref={ref}>{prefix}{to}{suffix}</span>
}
