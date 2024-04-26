import { ConfigProvider, FloatButton } from "antd"
import React from "react"

import { OpenedFloatButton } from "./FloatButtonOpened"
import { CloseIcon, RocketIcon } from "./Icons"

export const CustomFloatButton: React.FC = () => (
  <>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#DCD8EA"
        }
      }}>
      <FloatButton.Group
        trigger="click"
        type="primary"
        shape="circle"
        style={{ right: "315px" }}
        icon={<RocketIcon />}
        closeIcon={<CloseIcon />}>
        <OpenedFloatButton content={"Secret"} type={"secret"} />
        <OpenedFloatButton content={"Threads"} type={"thread"} />
      </FloatButton.Group>
    </ConfigProvider>
  </>
)
