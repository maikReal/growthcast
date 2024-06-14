import { ConfigProvider, Table, Tooltip } from "antd"
import type { TableProps } from "antd"
import React from "react"

import type { DataType } from "~types"

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Cast",
    dataIndex: "text",
    key: "text",
    render: (text, record) => (
      <Tooltip title={text}>
        <a href={record.linkToCast} target="_blank" rel="noopener noreferrer">
          {text.length > 10 ? text.substring(0, 10) + "..." : text}
        </a>
      </Tooltip>
    )
  },
  {
    title: "Likes",
    dataIndex: "likes",
    key: "likes",
    sorter: (a, b) => a.likes - b.likes
  },
  {
    title: "Replies",
    dataIndex: "replies",
    key: "replies",
    sorter: (a, b) => a.replies - b.replies
  },
  {
    title: "Recasts",
    dataIndex: "recasts",
    key: "recasts",
    sorter: (a, b) => a.recasts - b.recasts
  }
]

const CastsStatistic = ({ casts }) => {
  const castsWithkeys = casts.map((item, index) => ({
    ...item,
    key: String(index + 1)
  }))

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerSplitColor: "transparent",
            borderColor: "rgb(231,231,231,60%)",
            colorPrimaryHover: "#ff7875",
            colorPrimaryActive: "#ff7875",
            headerBg: "#777777",
            borderRadius: 20
          },
          Pagination: {
            colorText: "#FFFFFF",
            itemActiveBg: "#FFFFFF",
            itemBg: "transparent",
            itemLinkBg: "transparent",
            borderRadius: 10
          }
        },
        token: {
          colorPrimary: "#16101E",
          borderRadius: 2,

          // Table background
          colorBgContainer: "transparent",
          colorText: "#FFFFFF"
        }
      }}>
      <Table
        style={{ width: "100%" }}
        columns={columns}
        dataSource={castsWithkeys}
        size="small"
        pagination={{
          position: ["bottomRight"],
          showSizeChanger: false,
          pageSize: 8
        }}
        rowHoverable={false}
      />
    </ConfigProvider>
  )
}

export default CastsStatistic
