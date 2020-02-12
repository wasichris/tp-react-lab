import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ProgressBar from './ProgressBar'

const injectPropsInStep = ({ step, ...options }) => React.cloneElement(step, options)

const TpWizard = ({ children, onDone } = { children: [] }) => {
  const [stepIndex, setStepIndex] = useState(1)
  const [formValue, setFormValue] = useState({})

  const totalSteps = children.length

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

  // scroll top while step change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [stepIndex])

  // find current step
  const step = React.Children.toArray(children)[stepIndex - 1]
  const currentStepWithProps = step
    ? injectPropsInStep({ step, go, goNext, goPrevious, formValue }) : null

  // render
  return (
    <>
      <ProgressBar current={stepIndex} total={totalSteps} />
      {currentStepWithProps}
    </>

  )
}

TpWizard.propTypes = {
  children: PropTypes.node,
  onDone: PropTypes.func
}

export default TpWizard
