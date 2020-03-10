import { useEffect, useRef, useState } from 'react'

function useTimer (callback, delay) {
  const savedCallback = useRef()
  const savedDelay = useRef()
  const [remainSecond, setRemainSecond] = useState(0)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    savedDelay.current = delay
    setRemainSecond(delay)

    const tick = (id) => {
      if (savedDelay.current > 0) {
        savedDelay.current -= 1
      } else {
        savedDelay.current = 0
      }

      setRemainSecond(savedDelay.current)
      if (savedDelay.current <= 0) {
        savedCallback.current()
        clearInterval(id)
      }
    }

    if (delay !== null) {
      const id = setInterval(() => tick(id), 1000)
      return () => clearInterval(id)
    }
  }, [delay])

  return remainSecond
}

export default useTimer
