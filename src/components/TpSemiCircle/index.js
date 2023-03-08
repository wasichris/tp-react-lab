import React from 'react'
import PropTypes from 'prop-types'

const TpSemiCircle = ({ percentage } = { percentage: 0 }) => {
  const strokeDashoffset = () => {
    const fixedPercentage =
      percentage > 100
        ? 100
        : percentage < 0
          ? 0
          : percentage
    const offset = 198 - (fixedPercentage * (198 / 100))
    return `${offset}px`
  }

  return (
    <>

      <svg className='tp-semi-circle' viewBox='0 0 110 100'>

        <linearGradient id='tp-semi-circle-gradient' x1='0' y1='0' x2='0' y2='100%'>
          <stop offset='0%' stopColor='#56c4fb' />
          <stop offset='100%' stopColor='#0baeff' />
        </linearGradient>

        {/* grey line */}
        <path
          d='M30,90 A40,40 0 1,1 80,90'
          fill='none' stroke='#e7e7e8'
          strokeLinecap='round' strokeWidth='8px'
        />

        {/* blue line */}
        <path
          className='tp-semi-circle__path-blue'
          d='M30,90 A40,40 0 1,1 80,90'
          fill='none' stroke='url(#tp-semi-circle-gradient)'
          strokeLinecap='round' strokeWidth='8px'
          strokeDasharray={198} strokeDashoffset={strokeDashoffset()}
        />

        {/* text */}
        <text
          fill='white' x='50%' y='70%'
          dominantBaseline='middle' textAnchor='middle'
        >
          {percentage} %
        </text>

      </svg>

    </>
  )
}

TpSemiCircle.propTypes = {
  percentage: PropTypes.number
}

export default TpSemiCircle
