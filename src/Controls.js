import React from 'react'
import { Cell } from './Cell'

export const Controls = ({ onClickValue, activeNumber }) => {
  const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  return (
    <div style={{ maxWidth: 200, margin: '0 auto 20px' }}>
      {data.map((row, rowIndex) => (
        <div key={`control-row-${rowIndex}`} style={{ display: 'flex' }}>
          {row.map((value, columnIndex) => (
            <Cell
              key={`control-cell-${columnIndex}`}
              value={value}
              index={rowIndex * 3 + columnIndex}
              size={3}
              isValueSelected={value === activeNumber}
              onClick={onClickValue}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
