import React, { useState } from 'react'
import { Cell } from './Cell'
import { Controls } from './Controls'
import { getIsCellValidForBoard, generateBoard } from './utils'

const App = () => {
  const [activeNumber, setActiveNumber] = useState(null)
  const [activeCell, setActiveCell] = useState(null)
  const [hoverCell, setHoverCell] = useState(null)
  const [usePencil, setUsePencil] = useState(false)
  const [pencilState, setPencilState] = useState(new Array(81).fill([]))
  const [givens, setGivens] = useState(generateBoard())
  const [board, setBoard] = useState(givens)

  const updatePencil = (value, boardIndex) => {
    if (!!givens[boardIndex] || !!board[boardIndex]) {
      return
    }
    setPencilState(
      pencilState.map((n, i) => {
        if (i === boardIndex) {
          if (n.includes(value)) {
            return n.filter(v => v !== value)
          } else {
            return n.concat([value])
          }
        }
        return n
      }),
    )
  }

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
      if (usePencil) {
        updatePencil(activeNumber, boardIndex)
      } else {
        updateBoard(activeNumber, boardIndex)
      }
    } else {
      setActiveCell(activeCell === boardIndex ? null : boardIndex)
    }
  }

  const onClickControls = (boardIndex, value) => {
    if (!!activeCell) {
      if (usePencil) {
        updatePencil(value, activeCell)
      } else {
        updateBoard(value, activeCell)
      }
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
                onMouseLeave={() => setHoverCell(null)}
                onClick={onClickCell}
                boardIndex={boardIndex}
                activePencil={pencilState[boardIndex]}
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
          usePencil={usePencil}
          onClickValue={onClickControls}
          onClickPencil={() => setUsePencil(!usePencil)}
          onClickGame={() => {
            const givens = generateBoard()
            setGivens(givens)
            setBoard(givens)
            setPencilState(new Array(81).fill([]))
            setUsePencil(false)
            setActiveNumber(null)
            setActiveCell(null)
          }}
          onErase={boardIndex => updateBoard(0, activeCell)}
        />
      </div>
    </>
  )
}

export default App
