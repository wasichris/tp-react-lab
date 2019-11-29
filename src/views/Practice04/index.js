import React from 'react'
import TpSection from '@src/components/TpSection/index'
import storage from '@src/utils/storage'

class Practice04 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: '',
      id: '',
      name: ''
    }
  }

  handleTokenSave = () => {
    // save token to session storage
    storage.token.value = this.state.token
    this.setState({ ...this.state, token: this.state.token })
  }

  handleIdSave = () => {
    // save id to local storage
    storage.id.value = this.state.id
    this.setState({ ...this.state, id: this.state.id })
  }

  handleNameSave = () => {
    // save name to cookie
    storage.name.value = this.state.name
    this.setState({ ...this.state, name: this.state.name })
  }

  render () {
    return (
      <>
        <h1> 存取前端資訊 </h1>
        <p className='desc'>
          熟悉前端資訊封裝方式，請依照以下要求使用 utils\storage 模組存放以下資訊，重整頁面後可顯示存放於前端的資訊於輸入框下方。
        </p>

        <TpSection>
          <div>存放<span className='tp-tag'>token</span>於 session storage 中</div>
          <input type='text' onChange={e => this.setState({ ...this.state, token: e.target.value })} />
          <button onClick={this.handleTokenSave}>save</button>

          <div className='hint'>您存放的 token 資料: {storage.token.value} </div>
        </TpSection>

        <TpSection>
          <div>存放<span className='tp-tag'>id</span>於 local storage 中</div>
          <input type='text' onChange={e => this.setState({ ...this.state, id: e.target.value })} />
          <button onClick={this.handleIdSave}>save</button>

          <div className='hint'>您存放的 id 資料: {storage.id.value} </div>
        </TpSection>

        <TpSection>
          <div>存放<span className='tp-tag'>name</span>於 cookie 中</div>
          <input type='text' onChange={e => this.setState({ ...this.state, name: e.target.value })} />
          <button onClick={this.handleNameSave}>save</button>

          <div className='hint'>您存放的 name 資料: {storage.name.value} </div>
        </TpSection>

      </>
    )
  }
}

export default Practice04
