import React from 'react'
import { getRowIndex, getColumnIndex, getBoxIndex } from './utils'

export const Cell = ({
  isHighlighted,
  isSelected,
  value,
  boardIndex,
  onClick,
  hoverCell,
  onMouseEnter,
  activeCell,
  boardSize = 9,
  isValid = true,
  isGiven,
}) => {
  const rowIndex = getRowIndex(boardIndex, boardSize)
  const columnIndex = getColumnIndex(boardIndex, boardSize)
  const boxIndex = getBoxIndex(boardIndex, boardSize)
  const isRowHover =
    rowIndex > 0 && getRowIndex(hoverCell, boardSize) === rowIndex
  const isColumnHover =
    columnIndex > 0 && getColumnIndex(hoverCell, boardSize) === columnIndex
  const isBoxHover =
    boxIndex > 0 && getBoxIndex(hoverCell, boardSize) === boxIndex
  const isRowActive =
    rowIndex > 0 && getRowIndex(activeCell, boardSize) === rowIndex
  const isColumnActive =
    columnIndex > 0 && getColumnIndex(activeCell, boardSize) === columnIndex
  const isBoxActive =
    boxIndex > 0 && getBoxIndex(activeCell, boardSize) === boxIndex

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

  const isHovered = hoverCell === boardIndex

  const houseSelected =
    isRowActive || isColumnActive || isBoxActive || isSelected

  const houseHovered =
    !houseSelected && (isRowHover || isColumnHover || isBoxHover)

  return (
    <div
      className={`cell`}
      onClick={() => onClick && onClick(boardIndex, value)}
      onMouseEnter={onMouseEnter}
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

      <Fill active={!isSelected && houseHovered} color="blue" opacity={0.05} />

      <Fill active={!isSelected && isHovered} color="blue" opacity={0.125} />

      <Fill active={!isSelected && houseSelected} color="blue" opacity={0.13} />

      <Fill active={isSelected} color="blue" opacity={0.05} />

      <Fill
        active
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 28,
        }}
      >
        {value > 0 ? value : ''}
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
