import { ConfigProvider, Select } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"

import type { ChannelSelect } from "~types"
import { sendRequestSignal } from "~utils/helpers"

import { PrimaryButton } from "../PrimaryButton"

export const ThreadHeader = ({ handleCastThread, fid, setSelectedChannel }) => {
  const [channels, setChannels] = useState<Array<ChannelSelect>>(null)
  const [isSearchUsed, setIsSearchUsed] = useState(false)

  useEffect(() => {
    const updateWarpcastChannels = async () => {
      // Make a request, so the background service can make a request
      // to the backend service and get the list of channels for a user
      const apiChannels = await sendRequestSignal({
        action: "fetchChannels",
        metadata: {
          fid: fid
        }
      })

      setChannels(
        apiChannels.map((channel) => {
          return {
            label: channel.channelName,
            value: channel.channelId
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
        const storedChannels = JSON.parse(localStorage.getItem("channels"))
        if (storedChannels) {
          const formattedChannels = storedChannels.map((channel) => ({
            label: channel.channelName,
            value: channel.channelId
          }))
          setChannels(formattedChannels)
        }
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

  const handleSelect = (value) => {
    console.log("[DEBUG - ThreadHeader.tsx] Selected channel is: ", value)
    setSelectedChannel(value)
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
          onSelect={handleSelect}
          virtual={false}
          loading={channels ? false : true}></Select>
      </ConfigProvider>
      <PrimaryButton handleClick={handleCastThread}>
        {"Cast a thread"}
      </PrimaryButton>
    </ThreadHeaderContainer>
  )
}

const ThreadHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
