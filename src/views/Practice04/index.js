import React from 'react'
import TpSection from '@src/components/TpSection/index'

class Practice04 extends React.Component {
  handleTokenSave = () => {
    // save token to session storage
  }

  handleIdSave = () => {
    // save id to local storage
  }

  handleNameSave = () => {
    // save name to cookie
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
          <input type='text' />
          <button onClick={this.handleTokenSave}>save</button>

          <div className='hint'>您存放的 token 資料: xxxx </div>
        </TpSection>

        <TpSection>
          <div>存放<span className='tp-tag'>id</span>於 local storage 中</div>
          <input type='text' />
          <button onClick={this.handleIdSave}>save</button>

          <div className='hint'>您存放的 id 資料: xxxx </div>
        </TpSection>

        <TpSection>
          <div>存放<span className='tp-tag'>name</span>於 cookie 中</div>
          <input type='text' />
          <button onClick={this.handleNameSave}>save</button>

          <div className='hint'>您存放的 name 資料: xxxx </div>
        </TpSection>

      </>
    )
  }
}

export default Practice04
