import React from 'react'
import { getRowIndex, getColumnIndex } from './utils'

export const Cell = ({
  isValueSelected,
  isCellSelected,
  value,
  index,
  size = 9,
  onClick,
}) => {
  const width = 100 / size
  const row = getRowIndex(index, size)
  const column = getColumnIndex(index, size)

  return (
    <div
      onClick={() => onClick && onClick(value)}
      style={{
        width: `${width}%`,
        cursor: onClick ? 'pointer' : '',
        userSelect: 'none',
        paddingBottom: `${width}%`,
        position: 'relative',
        backgroundColor: isValueSelected
          ? 'gray'
          : isCellSelected
          ? 'lightgray'
          : 'white',
        borderBottom: row === size - 1 ? '' : '1px solid',
        borderRight: column === size - 1 ? '' : '1px solid',
        borderLeft:
          size === 9 && column > 0 && column % 3 === 0 ? '1px solid' : '',
        borderTop: size === 9 && row > 0 && row % 3 === 0 ? '1px solid' : '',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {value}
      </div>
    </div>
  )
}
