import { ConfigProvider, Select } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"

import type { ChannelSelect } from "~types"
import { getChannels } from "~utils/proxy"

export const ThreadHeader = ({ handleCastThread, fid }) => {
  const [channels, setChannels] = useState<Array<ChannelSelect>>(null)
  const [isSearchUsed, setIsSearchUsed] = useState(false)

  useEffect(() => {
    const updateWarpcastChannels = async () => {
      const apiChannels = await getChannels(fid)

      setChannels(
        apiChannels.map((channel) => {
          return {
            label: channel.channelId,
            value: channel.channelName
          }
        })
      )

      localStorage.setItem("channelsLastFetchTime", Date.now().toString())
      localStorage.setItem("channels", JSON.stringify(apiChannels))
    }

    if (fid) {
      const lastFetchTime = localStorage.getItem("channelsLastFetchTime")
      const now = Date.now()
      const apiRequestTimeout = 60 * 60 * 1000 // 30 minutes in milliseconds

      if (!lastFetchTime || now - parseInt(lastFetchTime) > apiRequestTimeout) {
        updateWarpcastChannels()
      } else {
        setChannels(JSON.parse(localStorage.getItem("channels")))
      }
    }
  }, [])

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  const handleSearch = (value) => {
    if (value) {
      setIsSearchUsed(true)
    } else {
      setIsSearchUsed(false)
    }
  }

  return (
    <ThreadHeaderContainer>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              selectorBg: "transparent"
            }
          },
          token: {
            colorBorder: "transparent",
            colorText: "#BB96F9",
            colorTextPlaceholder: "#BB96F9",
            colorTextQuaternary: "#BB96F9",
            colorPrimaryHover: null
          }
        }}>
        <Select
          showSearch
          placeholder="Select a channel..."
          optionFilterProp="children"
          onSearch={handleSearch}
          options={
            channels ? (isSearchUsed ? channels : channels.slice(0, 5)) : []
          }
          filterOption={filterOption}
          variant={"borderless"}
          virtual={false}
          loading={channels ? false : true}></Select>
      </ConfigProvider>
      <CastButton onClick={handleCastThread}>Cast a thread</CastButton>
    </ThreadHeaderContainer>
  )
}

const ThreadHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const CastButton = styled.button`
  background-color: #bb96f9;
  color: #ffffff;
  font-size: 12px;
  border-radius: 25px;
  padding: 9px 18px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  border: 0px;

  &:hover {
    background-color: rgb(187, 150, 249, 0.8);
    color: rgb(249, 249, 249, 0.8);
  }
`
