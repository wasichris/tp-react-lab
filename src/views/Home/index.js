import React from 'react'
import logo from '@src/assets/images/logo.svg'
import { Link } from 'react-router-dom'

export default () =>
  <>
    <img src={logo} className='app-logo' alt='logo' />

    <h2> React Lab 練習主題 </h2>
    <ul>

      <li><Link to='/p1'>Practice01 - 輸入控制</Link></li>
      <li><Link to='/p2'>Practice02 - 父子組件溝通</Link></li>
      <li><Link to='/p3'>Practice03 - 於子組件中插入區塊</Link></li>
      <li><Link to='/p4'>Practice04 - 存取前端資訊</Link></li>
      <li><Link to='/p5'>Practice05 - 路由設定及轉址</Link></li>
      <li><Link to='/p6'>Practice06 - Redux 全域狀態控制</Link></li>
      <li><Link to='/p7'>Practice07 - 呼叫 API 取得資訊</Link></li>
      <li><Link to='/p8'>Practice08 - 使用 saga 完成登入流程</Link></li>
      <li><Link to='/p9'>Practice09 - 表單驗證</Link></li>
      <li><Link to='/p10'>Practice10 - 熟悉 Hook 操作方式</Link></li>
      <li><Link to='/p11'>Practice11 - 熟悉 styled-components 操作方式</Link></li>
      <li><Link to='/p12'>Practice12 - 熟悉 Context 操作方式</Link></li>
      <li><Link to='/p13'>Practice13 - 打造 Wizard 共用組件</Link></li>
      <li><Link to='/p14'>Practice14 - 打造 Modal 共用組件</Link></li>
      <li><Link to='/p15'>Practice15 - 打造 Upload File 共用組件</Link></li>
      <li><Link to='/p16'>Practice16 - 打造 Tabs 共用組件</Link></li>
      <li><Link to='/p17'>Practice17 - 實作第三方登入</Link></li>
      <li><Link to='/p18'>Practice18 - 使用 svg 實作圓環樣式</Link></li>
    </ul>
  </>
