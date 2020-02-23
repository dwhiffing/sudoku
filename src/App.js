import React, { useState } from 'react'
import { Cell } from './Cell'
import { Controls } from './Controls'
import { getIsCellValidForBoard, generateBoard } from './utils'

const App = () => {
  const [activeNumber, setActiveNumber] = useState(null)
  const [activeCell, setActiveCell] = useState(null)
  const [givens] = useState(generateBoard())
  const [board, setBoard] = useState(givens)

  const updateBoard = (value, boardIndex) => {
    if (typeof givens[boardIndex] === 'number') {
      return
    }
    setBoard(
      board.map((n, i) =>
        i === boardIndex ? (board[boardIndex] === value ? false : value) : n,
      ),
    )
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
                isGiven={typeof givens[boardIndex] === 'number'}
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
          onErase={boardIndex => updateBoard(false, activeCell)}
        />
      </div>
    </>
  )
}

export default App
