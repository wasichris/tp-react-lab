import React, { useState } from 'react'
import TpSection from '@src/components/TpSection/index'
import TpModal from '@src/components/TpModal/index'
import styled from 'styled-components'

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`
const ModalContent = styled.div`

`

const Practice14 = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggleModalShowUp = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className='App'>

      <header className='App-header'>
        <h1> 打造 Modal 共用組件 </h1>
        <p className='tp-desc'>
            建立 Modal 組件。
        </p>
        <TpSection>

          {/* 彈跳視窗 */}
          <TpModal
            title='Welcome'
            isVisible={isVisible}
            onClose={handleToggleModalShowUp}
          >

            <ModalContent>
              Would you like to join this team?
            </ModalContent>
            <ModalFooter>
              <button onClick={handleToggleModalShowUp}>Yes</button>
              <button onClick={handleToggleModalShowUp}>Cancel</button>
            </ModalFooter>

          </TpModal>

          <input type='button' value='Show Modal' onClick={handleToggleModalShowUp} />

        </TpSection>

      </header>

    </div>
  )
}

export default Practice14
