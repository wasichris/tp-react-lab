import React from 'react'
import PropTypes from 'prop-types'
import TpBoundary from '@src/components/TpBoundary/index'

class Practice03Child extends React.Component {
  render () {
    return (
      <TpBoundary tag='child component'>
        子層組件

        <TpBoundary tag='top'>
          從父組件對子組件插入&lt;p&gt;I'm top&lt;/p&gt;
        </TpBoundary>

        <TpBoundary tag='middle'>
          從父組件對子組件插入&lt;p&gt;I'm middle&lt;/p&gt;
          {this.props.children}
        </TpBoundary>

        <TpBoundary tag='bottom'>
          從父組件對子組件插入&lt;p&gt;I'm dottom&lt;/p&gt;
        </TpBoundary>

      </TpBoundary>
    )
  }
}

Practice03Child.propTypes = {
  children: PropTypes.element
}

export default Practice03Child
