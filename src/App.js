import React, { useState } from 'react'
import { Cell } from './Cell'
import { Controls } from './Controls'
import { getIsCellValidForBoard, generateBoard } from './utils'

const App = () => {
  const [activeNumber, setActiveNumber] = useState(null)
  const [activeCell, setActiveCell] = useState(null)
  const [board, setBoard] = useState(generateBoard())

  const updateBoard = (value, boardIndex) => {
    setBoard(board.map((n, i) => (i === boardIndex ? value : n)))
  }

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
    <>
      <div className="title-container flex-center">
        <p>Sudoku</p>
      </div>

      <div className="board-container">
        <div className="flex-1">
          <div className="board">
            {board.map((value, boardIndex) => (
              <Cell
                key={`cell-${boardIndex}`}
                value={value}
                onClick={onClickCell}
                boardIndex={boardIndex}
                isSelected={activeCell === boardIndex}
                isHighlighted={value === activeNumber}
                isValid={getIsCellValidForBoard(board, boardIndex, value)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="controls-container">
        <Controls
          activeCell={activeCell}
          activeNumber={activeNumber}
          setActiveNumber={setActiveNumber}
          onClickValue={onClickControls}
        />
      </div>
    </>
  )
}

export default App
