import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Cell } from './Cell'
import { Controls } from './Controls'
import {
  formatTime,
  checkIsSolved,
  getIsCellValidForBoard,
  generateBoard,
} from './utils'
import useUndo from 'use-undo'
import sample from 'lodash/sample'

const App = () => {
  const [time, setTime] = useState(0)
  const [activeNumber, setActiveNumber] = useState(null)
  const [activeCell, setActiveCell] = useState(null)
  const [hoverCell, setHoverCell] = useState(null)
  const [usePencil, setUsePencil] = useState(false)
  const [pencilState, setPencilState] = useState(new Array(81).fill([]))
  const [boardGivens, solvedBoard] = useMemo(generateBoard, [])
  const [givens, setGivens] = useState(boardGivens)
  const [
    boardState,
    {
      set: setBoard,
      undo: undoBoard,
      redo: redoBoard,
      canUndo: canUndoBoard,
      canRedo: canRedoBoard,
    },
  ] = useUndo(givens)

  const board = boardState.present

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
  const timeout = useRef()
  useEffect(() => {
    timeout.current = setTimeout(() => setTime(time + 1), 1000)
    return () => clearTimeout(timeout.current)
  }, [time])

  useEffect(() => {
    const isSolved = checkIsSolved(board)
    if (isSolved) {
      clearTimeout(timeout.current)
      setTimeout(() => {
        alert(`You win!! time: ${formatTime(time)}`)
      }, 500)
    }
  }, [board, time])

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

  const onHint = () => {
    if (board.filter(c => c === 0).length === 0) {
      return
    }
    const [, value, index] = sample(
      board
        .map((cell, index) => [cell, solvedBoard[index], index])
        .filter(([cell]) => cell === 0),
    )
    updateBoard(value, index)
  }

  const onReset = () => {
    const givens = generateBoard()
    setGivens(givens)
    setBoard(givens)
    setPencilState(new Array(81).fill([]))
    setUsePencil(false)
    setActiveNumber(null)
    setActiveCell(null)
  }

  return (
    <>
      <div className="title-container flex-center">
        <p style={{ width: 400, textAlign: 'center' }}>
          Sudoku - {formatTime(time)}
        </p>
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
                activeNumber={activeNumber}
                isValid={getIsCellValidForBoard(board, boardIndex, value)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="controls-container">
        <Controls
          activeCell={activeCell}
          board={board}
          activeNumber={activeNumber}
          setActiveCell={setActiveCell}
          setActiveNumber={setActiveNumber}
          usePencil={usePencil}
          undoBoard={undoBoard}
          redoBoard={redoBoard}
          canUndoBoard={canUndoBoard}
          canRedoBoard={canRedoBoard}
          onClickValue={onClickControls}
          onClickPencil={() => setUsePencil(!usePencil)}
          onHint={onHint}
          onClickGame={onReset}
          onErase={boardIndex => updateBoard(0, activeCell)}
        />
      </div>
    </>
  )
}

export default App
