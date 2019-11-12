import React from 'react'
import PropTypes from 'prop-types'
import TpBoundary from '@src/components/TpBoundary/index'

class Practice03Child extends React.Component {
  render () {
    return (
      <TpBoundary tag='child component'>
        請於子組件各指定區塊插入對應文字

        <TpBoundary tag='top'>
          請由父組件插入&lt;p&gt;任意文字&lt;/p&gt;
        </TpBoundary>

        <TpBoundary tag='middle'>
          請由父組件插入&lt;p&gt;任意文字&lt;/p&gt;
          {this.props.children}
        </TpBoundary>

        <TpBoundary tag='bottom'>
          請由父組件插入&lt;p&gt;任意文字&lt;/p&gt;
        </TpBoundary>

      </TpBoundary>
    )
  }
}

Practice03Child.propTypes = {
  children: PropTypes.node
}

export default Practice03Child
