import React from 'react'

class Practice02Son extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div className='bundary'>
        <div className='bundary__tag'>sub component</div>

        <div>外部傳入的數值: OOO</div>
        <div>是否合法: OOO</div>

      </div>
    )
  }
}

export default Practice02Son
