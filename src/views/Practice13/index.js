import React from 'react'
import Wizard from '@src/components/TpWizard/index'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4Result from './Step4Result'

const Practice13 = () => {
  // all steps in wizard haved already gone through
  const handleOnDone = () => console.log('%c done ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;')

  return (
    <div className='App'>

      <header className='App-header'>
        <h1> 打造 Wizard 共用組件 </h1>
        <p className='tp-desc'>
            建立 Wizard 組件，設計具有流程性質表單容器，可依照 children 組件先後順序定義成各 Step 組件，可在 Step 組件中取得表單資料，並切換步驟以呈現不同表單畫面；另外需提供 ProgressBar 示意目前流程執行百分比，提供用戶較好的使用者體驗。
        </p>

        <Wizard onDone={handleOnDone}>
          <Step1 />
          <Step2 />
          <Step3 />
          <Step4Result />
        </Wizard>

      </header>

    </div>
  )
}

export default Practice13
