import React from 'react'
import { useParams } from 'react-router-dom'
// import PropTypes from 'prop-types'

/* example01: functional component */
const Practice05View01 = () => {
  const { topic } = useParams()
  return (
    <>
      <h3> VIEW01 </h3>
      <div>您透過 url 所傳入的 topic 參數為: <b>{topic}</b> </div>
    </>
  )
}

/* example02: class component */
// class Practice05View01 extends React.Component {
//   render () {
//     const { topic } = this.props.match.params
//     return (
//       <>
//         <h3> VIEW01 </h3>
//         <div>您透過 url 所傳入的 topic 參數為: <b>{topic}</b> </div>
//       </>
//     )
//   }
// }

// Practice05View01.propTypes = {
//   match: PropTypes.object
// }

export default Practice05View01
