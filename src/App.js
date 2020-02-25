import React, { useState } from 'react'
import { Cell } from './Cell'
import { Controls } from './Controls'
import { getIsCellValidForBoard, generateBoard } from './utils'

const App = () => {
  const [activeNumber, setActiveNumber] = useState(null)
  const [activeCell, setActiveCell] = useState(null)
  const [hoverCell, setHoverCell] = useState(null)
  const [givens] = useState(generateBoard())
  const [board, setBoard] = useState(givens)

  const updateBoard = (value, boardIndex) => {
    if (!!givens[boardIndex]) {
      return
    }
    setBoard(
      board.map((n, i) =>
        i === boardIndex ? (board[boardIndex] === value ? 0 : value) : n,
      ),
    )
  }

  const onClickCell = boardIndex => {
    if (!!activeNumber) {
      updateBoard(activeNumber, boardIndex)
    } else {
      setActiveCell(activeCell === boardIndex ? null : boardIndex)
    }
  }

  const onClickControls = (boardIndex, value) => {
    if (!!activeCell) {
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
                onMouseEnter={() => setHoverCell(boardIndex)}
                onClick={onClickCell}
                boardIndex={boardIndex}
                isGiven={!!givens[boardIndex]}
                hoverCell={hoverCell}
                activeCell={activeCell}
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
          onErase={boardIndex => updateBoard(0, activeCell)}
        />
      </div>
    </>
  )
}

export default App
