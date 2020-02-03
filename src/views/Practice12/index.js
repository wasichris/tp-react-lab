import React, { useContext, useState, useEffect } from 'react'
import TpSection from '@src/components/TpSection/index'
import TpSwitch from '@src/components/TpSwitch/index'
import styled, { css } from 'styled-components'

// 取決於由上層 component 距離最近的 <MyContext.Provider> 的 value prop。
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
}

// 建立 theme context
const ThemeContext = React.createContext(themes.light)

// 建立測試子組件
const TpCard = (prop) => {
  // 接收 theme context 資訊
  const themeMode = useContext(ThemeContext)

  return (
    <Card theme={themeMode}>
      <div>I'm TpCard with ThemeContext!!</div>
      <div>{`foreground: ${themeMode.foreground}`}</div>
      <div>{`background: ${themeMode.background}`}</div>
    </Card>
  )
}

const Card = styled.div`
  margin: 20px 0;
  padding: 5px;
  border-radius: 5px;

  ${props =>
    props.theme &&
    css`
      background: ${props.theme.background};
      color: ${props.theme.foreground};
    `};
`

const SwitchWrapper = styled.div`
  line-height: 24px;
`

const Practice12 = () => {
  const [themeMode, setThemeMode] = useState(themes.dark)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    setThemeMode(isDarkMode ? themes.dark : themes.light)
  }, [isDarkMode])

  return (
    <div className='App'>
      {/* 加入 ThemeContext Provider 於使用範圍上，加入 context value 值向子組件傳遞 */}
      <ThemeContext.Provider value={themeMode}>

        <header className='App-header'>
          <h1> 熟悉 Context 操作方式 </h1>
          <p className='tp-desc'>
            理解 Context 的設計概念，設計 React 組件中共享資料；
            請使用 createContext 建立 ThemeContext 來傳遞 themes 定義的 light 與 dark 樣式至子組件中，為方便測試則透過 TpSwitch 切換兩模式，最後使用 useContext 將樣式套用在 TpCard 測試子組件中。
          </p>

          <TpSection>
            <SwitchWrapper>
              Dark Mode <TpSwitch value={isDarkMode} onChange={isOn => setIsDarkMode(isOn)} />
            </SwitchWrapper>

            {/* 可以收到父層 ThemeContext Provider 向子組件傳遞的 themeMode 數值 */}
            <TpCard />
          </TpSection>

        </header>

      </ThemeContext.Provider>
    </div>
  )
}

export default Practice12
