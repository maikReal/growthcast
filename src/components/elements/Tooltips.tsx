import { InfoCircleOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"

interface BasicTooltipProps {
  text?: string
  tooltipText: string
}

export const BasicTootlip = ({ text, tooltipText }: BasicTooltipProps) => {
  return (
    <Tooltip color={"#7C65C1"} title={tooltipText}>
      <span>
        {text}{" "}
        <InfoCircleOutlined style={{ color: "#9A9FA9", marginLeft: "5px" }} />{" "}
      </span>
    </Tooltip>
  )
}
