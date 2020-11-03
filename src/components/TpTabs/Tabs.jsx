
import React, { useState, useEffect, useRef } from 'react'
import Tab from './Tab'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const TabStrip = styled('div')`
  display: flex;
  border-bottom: 1px solid;
  min-height: 36px;
`

const TabWrapper = styled('div')`
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0 10px;
  overflow: hidden;
`

const FloatMenu = styled('div')`
  position: absolute;
  display: none;
  min-width: 100px;
  right: 2px;
  top: 30px;
  padding-top: 10px;

  &:hover  {
    display: flex;
  }
`

const FloatMenuContent = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  background: #373f4a;
  padding: 10px;
`

const OverflowIndicator = styled('div')`
  font-size: 15px;
  line-height: 15px;
  text-align: center;
  cursor: default;
`
const SideFunc = styled('div')`
  width: 30px;
  padding: 10px 0px;
  position: relative;

  &:hover ${OverflowIndicator}{
    font-weight: bold;
  }

  &:hover ${FloatMenu} {
    display: flex;
  }
`

const TabContent = styled('div')`
  padding: 10px;
`

const ContentWrapper = styled.div`
  display: ${props => props.isShow ? 'block' : 'none'};
`

const Tabs = (props) => {
  const { children, onSelect, onClose, className, selectedTabId } = props
  const tabArray = children
    ? (Array.isArray(children) ? children : [children])
    : []

  const initialTab =
    (selectedTabId === undefined ||
    selectedTabId < 0 ||
    selectedTabId >= tabArray.length) ? 0 : selectedTabId

  const [internalSelectedTabId, setInternalSelectedTabId] = useState(initialTab)
  const isSelectControlByParent = typeof onSelect === 'function'

  const tabWrapper = useRef(null)
  const [isOverflow, setIsOverflow] = useState(false)
  const [maxVisibleTabIndex, setMaxVisibleTabIndex] = useState(tabArray.length - 1)

  // 偵測 Tab 是否超出邊界
  useEffect(() => {
    if (tabWrapper.current) {
      const isOverX = tabWrapper.current.clientWidth < tabWrapper.current.scrollWidth
      const isOverY = tabWrapper.current.clientHeight < tabWrapper.current.scrollHeight
      const isOverflowNow = isOverX || isOverY

      if (isOverflow === false && isOverflowNow === true) {
        setMaxVisibleTabIndex(tabArray.length - 2)
      }

      if (isOverflow === true && isOverflowNow === false) {
        setMaxVisibleTabIndex(tabArray.length - 1)
      }

      if (isOverflow === false && isOverflowNow === false) {
        setMaxVisibleTabIndex(tabArray.length - 1)
      }

      setIsOverflow(isOverflowNow)
    }
  }, [isOverflow, tabArray.length])

  return (
    <div className={className}>

      {/* TAB 標籤區塊 */}
      <TabStrip>

        {/* 可以顯示的標籤區塊 */}
        <TabWrapper ref={(el) => { tabWrapper.current = el }}>

          {tabArray.length > 0 &&
            tabArray.map((tab, index) => {
              return (
                <Tab
                  isVisible={index <= maxVisibleTabIndex}
                  title={tab.props.title}
                  key={tab.props.id}
                  selected={isSelectControlByParent ? tab.props.id === selectedTabId : tab.props.id === internalSelectedTabId}
                  onSelect={isSelectControlByParent ? onSelect : setInternalSelectedTabId}
                  onClose={onClose}
                  id={tab.props.id}
                />
              )
            })}

        </TabWrapper>

        {/* 無法顯示的標籤區塊 */}
        <SideFunc>

          {isOverflow &&
            <>
              <OverflowIndicator>...</OverflowIndicator>

              <FloatMenu>
                <FloatMenuContent>

                  {tabArray.map((tab, index) => {
                    return (
                      index > maxVisibleTabIndex &&
                        <Tab
                          isVisible
                          title={tab.props.title}
                          key={tab.props.id}
                          selected={isSelectControlByParent ? tab.props.id === selectedTabId : tab.props.id === internalSelectedTabId}
                          onSelect={isSelectControlByParent ? onSelect : setInternalSelectedTabId}
                          onClose={onClose}
                          id={tab.props.id}
                        />
                    )
                  })}

                </FloatMenuContent>
              </FloatMenu>

            </>}

        </SideFunc>

      </TabStrip>

      {/* TAB 內容區塊 */}
      <TabContent>
        {tabArray.length > 0 &&
          tabArray.map(tab =>
            <ContentWrapper
              key={tab.props.id}
              isShow={tab.props.id === (isSelectControlByParent ? selectedTabId : internalSelectedTabId)}
            >
              {tab.props.children}
            </ContentWrapper>
          )}
      </TabContent>

    </div>
  )
}

Tabs.propTypes = {
  // 各 Tab 內容
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]).isRequired,
  // 要被選擇的 TabId
  selectedTabId: PropTypes.number,
  // 被選擇時的事件 (送出 Tab ID)
  onSelect: PropTypes.func,
  // 被關閉時的事件 (送出 Tab ID)
  onClose: PropTypes.func,
  // 樣式名稱來 override 原本樣式
  className: PropTypes.string
}

export default Tabs
