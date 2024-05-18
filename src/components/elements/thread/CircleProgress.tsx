import React from "react"

import "../../../styles/styles.module.css"

interface CircleProgressProps {
  value: number // current value
  maxValue: number // maximum value that represents a full circle
}

const CircleProgress: React.FC<CircleProgressProps> = ({ value, maxValue }) => {
  const radius = 13 // Radius of the circle
  const stroke = 2 // Stroke width of the circle progress bar
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (value / maxValue) * circumference

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="lightgray"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        className="circle-progress"
        stroke="#BB96F9"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  )
}

export default CircleProgress
