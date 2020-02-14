import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ProgressBar from './ProgressBar'

const TpWizard = ({ children, onDone } = { children: [] }) => {
  const [stepIndex, setStepIndex] = useState(1)
  const [formValue, setFormValue] = useState({})

  // total step amount
  const totalSteps = children.length

  // scroll top while step change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [stepIndex])

  // go next
  const goNext = (newFormValue) => go(stepIndex + 1, newFormValue)

  // go previous
  const goPrevious = () => go(stepIndex - 1)

  // go any step
  const go = (newStepIndex, newFormValue = null) => {
    // update form value
    if (newFormValue) {
      setFormValue(newFormValue)
    }

    // move steps
    if (newStepIndex > 0 && newStepIndex <= totalSteps) {
      setStepIndex(newStepIndex)
      if (newStepIndex === totalSteps) onDone()
    } else if (newStepIndex < 1) {
      setStepIndex(1)
    } else if (newStepIndex > totalSteps) {
      setStepIndex(totalSteps)
    }
  }

  // find current step
  const step = React.Children.toArray(children)[stepIndex - 1]
  const currentStepWithProps = step
    ? React.cloneElement(step, { go, goNext, goPrevious, formValue }) : null

  // render
  return (
    <div className='tp-section'>
      <ProgressBar current={stepIndex} total={totalSteps} />
      {currentStepWithProps}
    </div>

  )
}

TpWizard.propTypes = {
  children: PropTypes.node,
  onDone: PropTypes.func
}

export default TpWizard
