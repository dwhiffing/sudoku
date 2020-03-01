import { useEffect, useState, useRef } from 'react'

export function useTimer() {
  const [start] = useState(Date.now())
  const [seconds, setSeconds] = useState(0)
  const [stopped, setStopped] = useState(false)
  const timer = useRef()

  useEffect(() => {
    if (stopped) {
      return
    }
    timer.current = setTimeout(() => {
      setSeconds(Date.now() - start)
    }, 10)

    return () => clearTimeout(timer.current)
  })

  return [
    seconds,
    () => {
      setStopped(true)
      clearTimeout(timer.current)
    },
  ]
}
