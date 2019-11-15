import React from 'react'
import PropTypes from 'prop-types'

const TpSection = (props) => {
  const { children } = props
  return (
    <div className='tp-section'>
      {children}
    </div>

  )
}

TpSection.propTypes = {
  children: PropTypes.node
}

export default TpSection
