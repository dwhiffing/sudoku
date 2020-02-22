import { getRowIndex, getColumnIndex, getIsCellValidForBoard } from './utils'
import React, { useState } from 'react'
import { Cell } from './Cell'
import { Controls } from './Controls'

const boardString =
  '145327698839654127672918543496185372218473956753296481367542819984761235521839764'
const regex = /1|2|3|4|5|6|7|8|9/
const initialBoard = boardString.split('').map(c => (regex.test(c) ? +c : null))

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

  return (
    <div>
      <div style={{ width: 500, margin: '20px auto' }}>
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} style={{ display: 'flex' }}>
            {row.map((value, i) => {
              const index = rowIndex * 9 + i
              return (
                <Cell
                  key={`cell-${i}`}
                  value={value}
                  index={index}
                  isCellSelected={activeCell === index}
                  isValueSelected={
                    typeof value === 'number' && value === activeNumber
                  }
                  getIsCellValid={(index, value) =>
                    getIsCellValidForBoard(board, index, value)
                  }
                  onClick={() => {
                    if (typeof activeNumber === 'number') {
                      updateBoard(activeNumber, index)
                    } else {
                      setActiveCell(activeCell === index ? null : index)
                    }
                  }}
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
        onClickValue={value => {
          if (typeof activeCell === 'number') {
            updateBoard(value, activeCell)
          } else {
            setActiveNumber(activeNumber === value ? null : value)
          }
        }}
      />
    </div>
  )
}

export default App
