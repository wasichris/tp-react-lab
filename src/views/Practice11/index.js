import React, { useState } from 'react'
import TpSection from '@src/components/TpSection/index'
import TpSwitch from '@src/components/TpSwitch/index'

import styled, { css, ThemeProvider } from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  padding: 0.25em 1em;
  cursor: pointer;

  &:hover{
    box-shadow: 2px 2px 4px 0px #7a7a7a;
  }

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`

const TallButton = styled(Button)`
  padding: 2em 0.5em;
`

// =====

const theme = (isDarkMode) => ({
  fg: isDarkMode ? 'white' : 'palevioletred',
  bg: isDarkMode ? '#3E3E3E' : 'white'
})

const ThemeButton = styled.button`
color: ${props => props.theme.fg};
border: 2px solid ${props => props.theme.fg};
background: ${props => props.theme.bg};
font-size: 1em;
margin: 1em 1em 1em 0;
padding: 0.25em 1em;
border-radius: 3px;
cursor: pointer;
`

const ThemeInput = styled.input`
color: ${props => props.theme.fg};
background: ${props => props.theme.bg};
font-size: 1em;
margin: 1em 1em 1em 0;
padding: 0.25em 1em;
`

// =====
const SwitchWrapper = styled.div`
  line-height: 24px;
`

const Practice11 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className='App'>
      <header className='App-header'>
        <h1> 熟悉 styled-components 操作方式 </h1>
        <p className='tp-desc'>
          理解 CSS in JS 的設計概念，熟悉 styled-components 的基礎操作方式。
        </p>

        <TpSection>
          <p><b>基本按鍵</b>：以 styled-components 建立的 Button 組件。 </p>
          <Button> I'm the Button </Button>
        </TpSection>

        <TpSection>
          <p><b>傳遞參數</b>：傳入 primary 至 Button 組件，當 primary 值為 true 時調整樣式為 background: palevioletred; color: white; 來呈現動態樣式效果。 </p>
          <Button primary> I'm the Button with primary props </Button>
        </TpSection>

        <TpSection>
          <p><b>覆寫組件</b>：以 Button 組件為基礎建立 TallButton 組件，調整樣式為 padding: 2em 0.5em; 呈現。 </p>
          <TallButton> I'm the TallButton </TallButton>
        </TpSection>

        <TpSection>
          <p><b>主題樣式</b>：以 ThemeProvider 將 ThemeButton 及 ThemeInput 組件套上 theme 主題樣式，並使用 isDarkMode 狀態來動態切換主題樣式。 </p>
          <ThemeProvider theme={theme(isDarkMode)}>
            <SwitchWrapper>
              Dark Mode <TpSwitch value={isDarkMode} onChange={isOn => setIsDarkMode(isOn)} />
            </SwitchWrapper>
            <ThemeButton> I'm the ThemeButton </ThemeButton>
            <ThemeInput placeholder='I am the ThemeInput' />
          </ThemeProvider>
        </TpSection>

      </header>
    </div>
  )
}

export default Practice11
