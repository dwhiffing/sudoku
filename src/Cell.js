import React from 'react'
import { getRowIndex, getColumnIndex } from './utils'

export const Cell = ({
  isValueSelected,
  isCellSelected,
  value,
  index,
  size = 9,
  onClick,
  getIsCellValid,
}) => {
  const width = 100 / size
  const row = getRowIndex(index, size)
  const column = getColumnIndex(index, size)
  const isValid =
    typeof getIsCellValid !== 'function' || typeof value !== 'number'
      ? true
      : getIsCellValid(index, value)

  const borderWidth = 1
  const isTopRow = row === 0
  const isLeftColumn = column === 0
  const isBottomRow = row === size - 1
  const isRightColumn = column === size - 1
  const isHouseColumnEdge = size === 9 && column > 0 && column % 3 === 0
  const isHouseRowEdge = size === 9 && row > 0 && row % 3 === 0

  let borderLeftWidth = isLeftColumn ? 2 : 0
  let borderTopWidth = isTopRow ? 2 : 0

  if (isHouseColumnEdge) {
    borderLeftWidth += borderWidth
  }

  if (isHouseRowEdge) {
    borderTopWidth += borderWidth
  }

  return (
    <div
      onClick={() => onClick && onClick(value)}
      style={{
        width: `${width}%`,
        cursor: onClick ? 'pointer' : '',
        userSelect: 'none',
        paddingBottom: `${width}%`,
        position: 'relative',
        borderStyle: 'solid',
        borderColor: isCellSelected ? 'black' : '#666',
        fontWeight: isCellSelected ? 'bold' : 'normal',
        borderBottomWidth: isBottomRow ? 2 : borderWidth,
        borderRightWidth: isRightColumn ? 2 : borderWidth,
        borderLeftWidth,
        borderTopWidth,
      }}
    >
      {!isValid && <Fill color="red" opacity={0.5} />}
      {isValid && isValueSelected && <Fill color="yellow" opacity={0.5} />}
      {isValid && isCellSelected && <Fill color="lightgray" opacity={0.75} />}
      <Fill
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

const Fill = ({ children, color, opacity = 1, style = {} }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity,
      backgroundColor: color,
      ...style,
    }}
  >
    {children}
  </div>
)
