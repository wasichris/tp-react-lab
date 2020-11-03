import React, { useState } from 'react'
import { Tabs, Tab } from '@src/components/TpTabs'
import Practice12 from '../Practice12'
import Practice11 from '../Practice11'
import Practice10 from '../Practice10'

const Practice16 = () => {
  const [tabCounter, setTabCounter] = useState(1)
  const [tabs, setTabs] = useState([{ tabId: 0, title: 'tab0', content: <p>This is a new tab-0</p> }])

  const [selectedTabId, setSelectedTabId] = useState(0)

  const addTab = (title, content) => {
    setTabs([...tabs, { tabId: tabCounter, title, content }])
    setSelectedTabId(tabCounter)
    setTabCounter(tabCounter + 1)
  }

  const handleRemoveAllTab = e => {
    setTabs([])
    setSelectedTabId(-1)
    setTabCounter(0)
  }
  const handleAddTab = e => {
    addTab('tab' + tabCounter, <p>This is a new tab-{tabCounter}</p>)
  }

  const handleAddTabPractice10 = e => {
    addTab('tab' + tabCounter, <Practice10 />)
  }

  const handleAddTabPractice11 = e => {
    addTab('tab' + tabCounter, <Practice11 />)
  }

  const handleAddTabPractice12 = e => {
    addTab('tab' + tabCounter, <Practice12 />)
  }

  const onSelectTabIdChange = selectedTabId => {
    setSelectedTabId(selectedTabId)
  }

  const onTabIdClose = tabId => {
    // 移除該 id 的 Tab 並且切換到下一個 id 顯示
    const targetTabIndex = tabs.findIndex(t => t.tabId === tabId)
    if (targetTabIndex > -1) {
      // 移除 tab
      tabs.splice(targetTabIndex, 1)
      setTabs([...tabs])

      // 選擇需顯示的 tab
      const isCloseSelectedTab = tabId === selectedTabId
      const tabAmount = tabs.length
      if (isCloseSelectedTab && tabAmount > 0) {
        const isCloseLastTab = targetTabIndex === tabAmount
        const nextSeletedTabId = tabs[isCloseLastTab ? (targetTabIndex - 1) : targetTabIndex].tabId
        setSelectedTabId(nextSeletedTabId)
      }
    }
  }

  return (
    <>
      <h1> 打造 Tabs 共用組件 </h1>
      <p className='tp-desc'>
          建立 Tabs 組件。
      </p>

      <h3>Simple Tabs</h3>
      <Tabs className='tp-tabs'>
        <Tab id={0} title='Tab 1'>This is the content of Tab 1.</Tab>
        <Tab id={1} title='Tab 2'>This is the content of Tab 2.<br /> this is second line!!</Tab>
        <Tab id={2} title='Tab 3'>This is the content of Tab 3.</Tab>
        <Tab id={3} title='Tab 4'>This is the content of Tab 4.</Tab>
      </Tabs>

      <h3>Dynamic Tabs</h3>

      <a href='#' onClick={handleAddTab}> New Tab</a> |
      <a href='#' onClick={handleAddTabPractice10}> Practice10 </a> |
      <a href='#' onClick={handleAddTabPractice11}> Practice11</a> |
      <a href='#' onClick={handleAddTabPractice12}> Practice12</a> |
      <a href='#' onClick={handleRemoveAllTab}> Close all</a>

      <Tabs className='tp-tabs' selectedTabId={selectedTabId} onClose={onTabIdClose} onSelect={onSelectTabIdChange}>

        {tabs && tabs.map(tab =>
          <Tab id={tab.tabId} title={tab.title} key={tab.tabId}>
            {tab.content}
          </Tab>)}

      </Tabs>

    </>
  )
}

export default Practice16
