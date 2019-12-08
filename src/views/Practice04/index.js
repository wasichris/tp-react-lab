import React from 'react'
import TpSection from '@src/components/TpSection/index'

class Practice04 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: '',
      id: '',
      name: ''
    }
  }

  render () {
    return (
      <>
        <h1> 存取前端資訊 </h1>
        <p className='tp-desc'>
          熟悉前端資訊封裝方式，請依照以下要求使用 \services\storage.js 存放以下資訊，重整頁面後可顯示存放於前端的資訊於輸入框下方。
        </p>

        <TpSection>
          <div>存放 token 於 session storage 中</div>
          <input type='text' onChange={e => this.setState({ ...this.state, token: e.target.value })} />
          <button>save</button>

          <div className='tp-hint'>您存放的 token 資料: OO </div>
        </TpSection>

        <TpSection>
          <div>存放 id 於 local storage 中</div>
          <input type='text' onChange={e => this.setState({ ...this.state, id: e.target.value })} />
          <button>save</button>

          <div className='tp-hint'>您存放的 id 資料: OO </div>
        </TpSection>

        <TpSection>
          <div>存放 name 於 cookie 中</div>
          <input type='text' onChange={e => this.setState({ ...this.state, name: e.target.value })} />
          <button>save</button>

          <div className='tp-hint'>您存放的 name 資料: OO </div>
        </TpSection>

      </>
    )
  }
}

export default Practice04
