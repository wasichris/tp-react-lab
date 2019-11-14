import React from 'react'
import { useLocation } from 'react-router-dom'
// import PropTypes from 'prop-types'

const Practice05View02 = () => {
  const { state } = useLocation()
  const topic = state ? state.topic : ''
  return (
    <>
      <h3> VIEW02 </h3>
      <div>您透過 state 所傳入的 topic 參數為: <b>{topic}</b> </div>
    </>
  )
}

// class Practice05View02 extends React.Component {
//   render () {
//     const state = this.props.location.state
//     const topic = state ? state.topic : ''
//     return (
//       <>
//         <h3> VIEW02 </h3>
//         <div>您透過 state 所傳入的 topic 參數為: <b>{topic}</b> </div>
//       </>
//     )
//   }
// }

// Practice05View02.propTypes = {
//   location: PropTypes.object
// }

export default Practice05View02
