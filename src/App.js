import { getRowIndex, getColumnIndex, getIsCellValidForBoard } from './utils'
import React, { useState } from 'react'
import { Cell } from './Cell'
import { Controls } from './Controls'

const boardString =
  '145327698839654127672918543496185372218473956753296481367542819984761235521839764'

const regex = /1|2|3|4|5|6|7|8|9/
const initialBoard = boardString
  .split('')
  .map(c => (regex.test(c) ? +c : undefined))

const App = () => {
  const [activeNumber, setActiveNumber] = useState(null)
  const [activeCell, setActiveCell] = useState(null)

  const [board, setBoard] = useState(initialBoard)
  const updateBoard = (value, index) => {
    setBoard(
      board.map((cell, cellIndex) => (cellIndex === index ? value : cell)),
    )
  }

  const rows = board.reduce((sum, n, i) => {
    sum[getRowIndex(i)] = sum[getRowIndex(i)] || []
    sum[getRowIndex(i)][getColumnIndex(i)] = n
    return sum
  }, [])

  const onClickCell = boardIndex => {
    if (typeof activeNumber === 'number') {
      updateBoard(activeNumber, boardIndex)
    } else {
      setActiveCell(activeCell === boardIndex ? null : boardIndex)
    }
  }

  const onClickControls = (boardIndex, value) => {
    if (typeof activeCell === 'number') {
      updateBoard(value, activeCell)
    } else {
      setActiveNumber(activeNumber === value ? null : value)
    }
  }

  return (
    <div>
      <div style={{ width: 500, margin: '20px auto' }}>
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} style={{ display: 'flex' }}>
            {row.map((value, i) => {
              const boardIndex = rowIndex * 9 + i
              return (
                <Cell
                  key={`cell-${i}`}
                  value={value}
                  boardIndex={boardIndex}
                  isSelected={activeCell === boardIndex}
                  isValid={getIsCellValidForBoard(board, boardIndex, value)}
                  isHighlighted={value === activeNumber}
                  onClick={onClickCell}
                />
              )
            })}
          </div>
        ))}
      </div>

      <Controls
        activeCell={activeCell}
        activeNumber={activeNumber}
        setActiveNumber={setActiveNumber}
        onClickValue={onClickControls}
      />
    </div>
  )
}

export default App
