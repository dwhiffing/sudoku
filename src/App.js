import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Cell } from './Cell'
import { Controls } from './Controls'
import { useTimer } from './Timer'
import {
  formatTime,
  checkIsSolved,
  getIsCellValidForBoard,
  generateBoard,
} from './utils'
import useUndo from 'use-undo'
import sample from 'lodash/sample'

const App = () => {
  const [time, stopTime] = useTimer()
  const hasWon = useRef(false)
  const boardRef = useRef(generateBoard())
  const [boardGivens, solvedBoard] = boardRef.current
  const [state, setState] = useState({
    hasWon: false,
    activeNumber: null,
    activeCell: null,
    hoverCell: null,
    usePencil: null,
    pencilState: Array(81).fill([]),
    givens: boardGivens,
  })
  const {
    activeNumber,
    activeCell,
    hoverCell,
    usePencil,
    pencilState,
    givens,
  } = state

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
    if (!!board[boardIndex]) {
      return
    }
    setState({
      ...state,
      pencilState: pencilState.map((n, i) => {
        if (i === boardIndex) {
          if (n.includes(value)) {
            return n.filter(v => v !== value)
          } else {
            return n.concat([value])
          }
        }
        return n
      }),
    })
  }

  useEffect(() => {
    const isSolved = checkIsSolved(board)
    if (isSolved && !hasWon.current) {
      stopTime()
      hasWon.current = true
      setTimeout(() => {
        alert(`You win!! time: ${formatTime(time)}`)
      }, 1000)
    }
  }, [board, stopTime, time])

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
    console.log(activeNumber)
    if (!!activeNumber) {
      if (usePencil) {
        updatePencil(activeNumber, boardIndex)
      } else {
        updateBoard(activeNumber, boardIndex)
      }
    } else {
      setState({
        ...state,
        activeCell: activeCell === boardIndex ? null : boardIndex,
      })
    }
  }

  const onClickControls = (boardIndex, value) => {
    console.log(activeNumber === value ? null : value)
    if (!!activeCell) {
      if (usePencil) {
        updatePencil(value, activeCell)
      } else {
        updateBoard(value, activeCell)
      }
    } else {
      setState({
        ...state,
        activeNumber: activeNumber === value ? null : value,
      })
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
    boardRef.current = generateBoard()
    const [boardGivens] = boardRef.current

    setBoard(boardGivens)
    setState({
      givens: boardGivens,
      board: boardGivens,
      pencilState: new Array(81).fill([]),
      usePencil: false,
      activeNumber: null,
      activeCell: null,
    })
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
                onMouseEnter={() =>
                  setState({ ...state, hoverCell: boardIndex })
                }
                onMouseLeave={() => setState({ ...state, hoverCell: null })}
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
          setActiveCell={activeCell => setState({ ...state, activeCell })}
          setActiveNumber={activeNumber => setState({ ...state, activeNumber })}
          usePencil={usePencil}
          undoBoard={undoBoard}
          redoBoard={redoBoard}
          canUndoBoard={canUndoBoard}
          canRedoBoard={canRedoBoard}
          onClickValue={onClickControls}
          onClickPencil={() => setState({ ...state, usePencil: !usePencil })}
          onHint={onHint}
          onClickGame={onReset}
          onErase={boardIndex => updateBoard(0, activeCell)}
        />
      </div>
    </>
  )
}

export default App
