/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import api from '@src/services/api'
import styled from 'styled-components'
import storage from '@src/services/storage'

const CodeWrap = styled.p`
  word-break: break-all;
`
const Practice17 = () => {
  const [jwtAccessToken, setJwtAccessToken] = useState([storage.token.value])
  const [users, setUsers] = useState([])

  const handleLogin = async (e) => {
    // call api
    const resp = await api.authenticate({ username: 'test', password: 'test' })
    console.log(resp)
    storage.token.value = resp.jwtToken
    setJwtAccessToken(resp.jwtToken)
  }

  const handleGetData = async (e) => {
    // call api
    const resp = await api.getUsers()
    console.log(resp)
    setUsers(resp)
  }

  return (
    <>
      <h1> 測試 JWT access/refresh token </h1>
      <p className='tp-desc'>
          測試 JWT access / refesh toke 機制運作是否正確。後端可以搭配
        <a href='https://jasonwatmore.com/post/2020/05/25/aspnet-core-3-api-jwt-authentication-with-refresh-tokens'> ASP.NET Core 3.1 API - JWT Authentication with Refresh Tokens </a>
      文章說明及 <a href='https://github.com/cornflourblue/aspnet-core-3-jwt-refresh-tokens-api'> Github </a>
      程式碼範例使用。

      </p>

      <button type='button' onClick={handleLogin}>Login</button>
      <CodeWrap>
        {jwtAccessToken}
      </CodeWrap>

      <button type='button' onClick={handleGetData}>Get users</button>
      <CodeWrap>
        {users.map(u => u.username + ',')}
      </CodeWrap>
    </>
  )
}

export default Practice17
