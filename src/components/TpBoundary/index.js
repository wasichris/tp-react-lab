import React from 'react'
import PropTypes from 'prop-types'

const Boundary = (props) => {
  const { children, tag } = props
  return (
    <div className='tp-bundary'>
      <div className='tp-bundary__tag'>{tag}</div>
      {children}
    </div>
  )
}

Boundary.propTypes = {
  children: PropTypes.node,
  tag: PropTypes.string
}

export default Boundary
