import DownOutlined from "@ant-design/icons/DownOutlined"
import type { MenuProps } from "antd"
import { Dropdown, Space } from "antd"
import React from "react"
import styled from "styled-components"

import { Description } from "~components/elements/DescriptionComponent"
import { Title } from "~components/elements/TitleComponent"
import { ScreenState, useApp } from "~Context/app-context"

export const HeaderPageDescription = ({ content }) => {
  const { screen, setScreen } = useApp()

  interface DropdownMenuOptions {
    key: string
    label: string
  }

  const makeHumanRedable = (text: string) => {
    text = text.split("-")[1]
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  function generateMenuOptions(screen: string): DropdownMenuOptions[] {
    const dropwdownMenuOptions: DropdownMenuOptions[] = []

    let idKey = 0
    for (const state in ScreenState) {
      const value = ScreenState[state]

      // Check if the value does not include 'thread'
      if (!value.includes(screen) && value.startsWith("[main_screen]")) {
        const humanReadableTitle = makeHumanRedable(value)
        dropwdownMenuOptions.push({
          label: humanReadableTitle,
          key: value
        })
        idKey++
      }
    }
    return dropwdownMenuOptions
  }

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setScreen(key)
  }

  const humanReadableCurrentTitle = makeHumanRedable(screen)
  const items: MenuProps["items"] = generateMenuOptions(screen)

  return (
    <PageDescription>
      <MenuDropdown items={items} onClick={onClick}>
        {humanReadableCurrentTitle}
      </MenuDropdown>

      <Description>{content}</Description>
    </PageDescription>
  )
}

const PageDescription = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

export const MenuDropdown = ({ items, onClick, children }) => {
  return (
    <Dropdown menu={{ items, onClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Title>{children}</Title>
          <DownOutlined style={{ color: "white" }} />
        </Space>
      </a>
    </Dropdown>
  )
}
