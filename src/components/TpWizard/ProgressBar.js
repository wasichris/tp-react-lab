import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: thin solid #ccc;
  background: #e6e6e6;
`

const Bar = styled.div`
  height: 4px;
  width: ${props => props.current * 100 / props.total}%; 
  background-color: #9e9e9e;
`

const ProgressBar = ({ current, total }) => {
  return (
    <Wrapper>
      <Bar current={current} total={total} />
    </Wrapper>
  )
}

ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default ProgressBar
