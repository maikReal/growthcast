import { ConfigProvider, FloatButton } from "antd"
import React from "react"

import { OpenedFloatButton } from "./FloatButtonOpened"
import { CloseIcon, RocketIcon } from "./Icons"

export const CustomFloatButton = ({ handleSetScreen }) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FFFFFF"
        }
      }}>
      <FloatButton.Group
        trigger="click"
        type="primary"
        shape="circle"
        style={{ position: "absolute", left: "55px" }}
        icon={<RocketIcon />}
        closeIcon={<CloseIcon />}>
        <OpenedFloatButton
          handleClick={handleSetScreen}
          content={"Secret"}
          type={"secret"}
        />
        <OpenedFloatButton
          handleClick={handleSetScreen}
          content={"Threads"}
          type={"thread"}
        />
      </FloatButton.Group>
    </ConfigProvider>
  </>
)
