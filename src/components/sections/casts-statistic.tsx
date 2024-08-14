import { ConfigProvider, Table, Tooltip } from "antd"
import React, { useEffect, useState } from "react"

import { useApp } from "~Context/app-context"
import { sendRequestSignal } from "~utils/helpers"
import { Logger } from "~utils/logger"

const columns = [
  {
    title: "Cast",
    dataIndex: "cast_text",
    key: "cast_text",
    render: (text: string) => (
      <Tooltip title={text}>
        <span>{text.length > 15 ? text.substring(0, 15) + "..." : text}</span>
      </Tooltip>
    )
  },
  {
    title: "Likes",
    dataIndex: "cast_likes",
    key: "cast_likes",
    sorter: (a: PaginatedCastInfo, b: PaginatedCastInfo) =>
      a.cast_likes - b.cast_likes
  },
  {
    title: "Replies",
    dataIndex: "cast_replies",
    key: "cast_replies",
    sorter: (a: PaginatedCastInfo, b: PaginatedCastInfo) =>
      a.cast_replies - b.cast_replies
  },
  {
    title: "Recasts",
    dataIndex: "cast_recasts",
    key: "cast_recasts",
    sorter: (a: PaginatedCastInfo, b: PaginatedCastInfo) =>
      a.cast_recasts - b.cast_recasts
  },
  {
    title: "Timestamp",
    dataIndex: "cast_timestamp",
    key: "cast_timestamp",
    render: (timestamp: string) => new Date(timestamp).toDateString()
  }
]

const CastsStatistic = () => {
  const { fid } = useApp()
  const [casts, setCasts] = useState<PaginatedCastInfo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [prevPageToken, setPrevPageToken] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState<number>(1)

  const pageSize = 10 // Display 10 rows per page

  const fetchCasts = async (pageToken: string | null = null, page: number) => {
    setLoading(true)
    try {
      const response = (await sendRequestSignal({
        action: "fetchPaginatedCast",
        metadata: { fid: fid, pageToken: pageToken }
      })) as PaginatedCasts

      Logger.logInfo("Data fetched and received successfully!")

      setCasts((prevCasts) => {
        // Check for duplicates based on unique properties
        const newCasts = response.casts.filter(
          (newCast) =>
            !prevCasts.some((cast) => cast.cast_text === newCast.cast_text)
        )
        return [...prevCasts, ...newCasts]
      })

      setNextPageToken(response.nextToken)
      setPrevPageToken(response.previousToken)

      setCurrentPage(page) // Update the current page number
    } catch (error) {
      Logger.logError(`Failed to fetch casts: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Fetch the first page of casts when the component mounts
    fetchCasts(null, 1)
  }, [])

  const handlePageChange = (page: number) => {
    if (page > currentPage && nextPageToken) {
      // User is navigating to the next page and there's a nextPageToken
      fetchCasts(nextPageToken, page)
    } else if (page < currentPage && prevPageToken) {
      // User is navigating to the previous page and there's a prevPageToken
      fetchCasts(prevPageToken, page)
    } else {
      // User is navigating to a page that has already been fetched
      setCurrentPage(page)
    }
  }

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const castsToDisplay = casts
    .slice(startIndex, endIndex)
    .map((item, index) => ({
      ...item,
      key: String(index + 1 + startIndex)
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
        dataSource={castsToDisplay}
        size="small"
        loading={loading}
        pagination={{
          position: ["bottomRight"],
          showSizeChanger: false,
          pageSize: pageSize,
          current: currentPage,
          total: casts.length + (nextPageToken ? pageSize : 0), // Estimate total based on fetched casts and presence of next token
          onChange: handlePageChange,
          showPrevNextJumpers: true,
          showQuickJumper: false
        }}
        rowHoverable={false}
      />
    </ConfigProvider>
  )
}

export default CastsStatistic
