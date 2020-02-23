import React from 'react'
import { getRowIndex, getColumnIndex } from './utils'

export const Cell = ({
  isHighlighted,
  isSelected,
  value,
  boardIndex,
  onClick,
  boardSize = 9,
  isValid = true,
  isGiven,
}) => {
  const rowIndex = getRowIndex(boardIndex, boardSize)
  const columnIndex = getColumnIndex(boardIndex, boardSize)

  let borderBottomWidth = rowIndex === boardSize - 1 ? 2 : 1
  let borderRightWidth = columnIndex === boardSize - 1 ? 2 : 1
  let borderLeftWidth = columnIndex === 0 ? 2 : 0
  let borderTopWidth = rowIndex === 0 ? 2 : 0

  if (boardSize === 9) {
    if (columnIndex > 0 && columnIndex % 3 === 0) {
      borderLeftWidth += 1
    }

    if (rowIndex > 0 && rowIndex % 3 === 0) {
      borderTopWidth += 1
    }
  }

  return (
    <div
      className={`cell`}
      onClick={() => onClick && onClick(boardIndex, value)}
      style={{
        borderColor: isSelected ? 'black' : '#666',
        fontWeight: isGiven || isSelected ? 'bold' : 'normal',
        color: isGiven ? 'blue' : 'black',
        borderBottomWidth,
        borderRightWidth,
        borderLeftWidth,
        borderTopWidth,
      }}
    >
      <Fill active={!isValid} color="red" opacity={0.5} />

      <Fill active={isValid && isHighlighted} color="yellow" opacity={0.5} />

      <Fill active={isSelected} color="gray" opacity={0.5} />

      <Fill
        active
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {value}
      </Fill>
    </div>
  )
}

const Fill = ({ active, children, color, opacity = 1, style = {} }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity,
      backgroundColor: active ? color : 'transparent',
      ...style,
    }}
  >
    {children}
  </div>
)
