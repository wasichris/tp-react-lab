// import React, { useState } from 'react'
import React, { useEffect, useState, useCallback } from 'react'
import { OAuth2Client } from 'google-auth-library'

// [模擬後端API]
// 模擬前端登入 google 後，向後端要求登入
const backendLogin = async (loginType, idToken) => {
  let response = { isLogin: false, token: '', msg: '' }

  if (loginType === 'google') {
    // https://developers.google.com/identity/sign-in/web/backend-auth
    // 模擬後端檢核 idToken 方式如下 (本範例使用 google 提供的 lib，也可以使用通用性的 JWT 類別庫進行檢核)
    const CLIENT_ID = '550888553528-l6mmk0up3vnr8mnvv2cojp69clgc8r9e.apps.googleusercontent.com'
    const client = new OAuth2Client(CLIENT_ID)

    try {
      // a. 檢核 token 資訊
      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: CLIENT_ID
      })

      // b. 檢查通過，使用 userid 取得用戶資訊 (DB 沒資料就以 Payload 內含資訊建立一筆用戶資料)
      const payload = ticket.getPayload()
      const user = {
        id: payload.sub,
        name: payload.name,
        imgUrl: payload.picture,
        email: payload.email,
        accessToken: '',
        idToken: idToken
      }
      window.localStorage.setItem('server-user', JSON.stringify(user))
      console.log('%c userid ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;', user.id)

      // c. 將剛剛新增/取出的用戶視為登入
      // 可能是產出一組後端與前端驗證的 token 並寫入 session 中，並 response 給前端此 token 來保存使用
      const token = 'ooxxoo'
      window.localStorage.setItem('server-token', token)
      response = { isLogin: true, token: token, msg: '登入成功' }
    } catch (error) {
      // 驗證失敗，登入失敗
      console.error(error)
      response = { isLogin: false, token: '', msg: '登入失敗' }
    }
  }

  return response
}

// [模擬後端API]
// 模擬前端使用 token 詢問後端目前的登入狀態
const backendLoginStatus = (token) => {
  return {
    isLogin: token && window.localStorage.getItem('server-token') === token,
    user: JSON.parse(window.localStorage.getItem('server-user'))
  }
}

// [模擬後端API]
// 模擬前端使用 token 通知後端登出系統
const backendLogout = async (token) => {
  const { isLogin } = backendLoginStatus(token)
  if (isLogin) {
    window.sessionStorage.removeItem('server-token')
  }
}

//= ===============================================================
//= ===============================================================
//= ===============================================================
//= ===============================================================
//= ===============================================================
//= ===============================================================

// 事前準備：
// 1. 於 Google Cloud Platform 建立專案，設定憑證 & OAuth 同意畫面
//    https://console.cloud.google.com/apis/credentials?hl=zh-tw&project=react-lab-317206&folder=&organizationId=
// 2. 載入 <script src="https://apis.google.com/js/platform.js" ></script>
// 3. 初始 window.gapi.auth2.init()

//= ===============================================================
//= ===============================================================
//= ===============================================================

const Practice17 = () => {
  const [isBackendLogin, setIsBackendLogin] = useState(false)
  const [loginUser, setLoginUser] = useState({
    id: '',
    name: '',
    imgUrl: '',
    email: '',
    accessToken: '',
    idToken: ''
  })

  const bindLoginClickEvent = useCallback((elementId) => {
    var element = document.getElementById(elementId)
    var auth2 = window.gapi.auth2.getAuthInstance()
    auth2.attachClickHandler(element, {}, handleGoogleSignInSuccess, handleGoogleSignInFail)
  }, [])

  useEffect(() => {
    // 檢查中台登入狀態

    // 頁面進入時，若要判斷用戶是否登入時，要使用網站中台提供的 token 與中台溝通來判斷
    // 至於 Google 的 idToken 只用於第三方登入(包含中台流程)，而登入後 idToken 就沒有意義了
    var { isLogin, user } = backendLoginStatus(window.localStorage.getItem('token'))
    setIsBackendLogin(isLogin)
    if (isLogin) {
      setLoginUser(user)
    }
  }, [])

  useEffect(() => {
    // 初始登入按鈕

    // https://developers.google.com/identity/sign-in/web/build-button
    // // option1: 自動產生按鈕 (已登入情況下，會自動觸發handleGoogleSignInSuccess)
    // window.gapi.signin2.render('google-sign-in-button1', {
    //   scope: 'profile email',
    //   width: '200px',
    //   height: '40px',
    //   longtitle: true,
    //   theme: 'light',
    //   onsuccess: handleGoogleSignInSuccess,
    //   onfailure: handleGoogleSignInFail
    // })

    // option2: 使用自定義按鈕 - 綁定登入點擊事件
    bindLoginClickEvent('google-sign-in-button2')
  }, [bindLoginClickEvent])

  const handleGoogleSignInSuccess = async (user) => {
    // Google 登入成功取得用戶資料

    const profile = user.getBasicProfile()
    setLoginUser({
      id: profile.getId(), // Do not send to your backend! Use an ID token instead.
      name: profile.getName(),
      imgUrl: profile.getImageUrl(),
      email: profile.getEmail(), // This is null if the 'email' scope is not present.
      accessToken: user.mc.access_token,
      idToken: user.mc.id_token // JWT
    })

    // 針對 id_token 資訊，前端可透過以下兩種方式簡易解析內容
    // 1. Google API: https://oauth2.googleapis.com/tokeninfo?id_token=XYZ123
    // 2. JWT Website: https://jwt.io/

    // 請求使用 Google idToken 登入後端系統 (驗證 idToken 作為登入依據，並產出前後台溝通 token [後續判斷是否登入都是以此 token 決定])
    const { isLogin, token } = await backendLogin('google', user.mc.id_token)
    window.localStorage.setItem('token', token)
    setIsBackendLogin(isLogin)
  }

  const handleGoogleSignInFail = async (error) => {
    // Google 登入失敗
    console.log(JSON.stringify(error, undefined, 2))
  }

  const handleSignOut = e => {
    // 直接通知中台登出系統
    backendLogout()

    // 清除前端登入資訊
    setIsBackendLogin(false)
    window.localStorage.removeItem('token')
    setLoginUser({
      id: '',
      name: '',
      imgUrl: '',
      email: '',
      accessToken: '',
      idToken: ''
    })

    // 應該不需要再通知 Google 登出
    // var auth2 = window.gapi.auth2.getAuthInstance()
    // var isLogin = auth2.isSignedIn.get()
    // if (isLogin) {
    //   var profile = auth2.currentUser.get().getBasicProfile()
    //   console.log('ID: ' + profile.getId())
    //   console.log('Full Name: ' + profile.getName())
    //   console.log('Given Name: ' + profile.getGivenName())
    //   console.log('Family Name: ' + profile.getFamilyName())
    //   console.log('Image URL: ' + profile.getImageUrl())
    //   console.log('Email: ' + profile.getEmail())

    //   // logout
    //   auth2.signOut().then(function () {
    //     console.log('User signed out.')
    //   })
    // }
  }

  return (
    <>
      <h1> 實作第三方登入 </h1>
      <p className='tp-desc'>
        透過 Google 實作第三方登入的前端邏輯流程。
      </p>

      <div id='google-sign-in-button1' />
      <button id='google-sign-in-button2'>Login</button>
      <button onClick={handleSignOut}>logout</button>

      <p>isBackendLogin: {isBackendLogin ? '已登入' : '未登入'}</p>

      <h3>第三方登入可取得的資料</h3>
      <ul>
        <li>ID: {loginUser.id}</li>
        <li>Full Name: {loginUser.name}</li>
        <li>Image URL: <img src={loginUser.imgUrl} alt='' /></li>
        <li>Email: {loginUser.email}</li>
        <li>Access Token: {loginUser.accessToken}</li>
        <li>ID Token: {loginUser.idToken}</li>
      </ul>
    </>
  )
}

export default Practice17
