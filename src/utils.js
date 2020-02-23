import shuffle from 'lodash/shuffle'
import chunk from 'lodash/chunk'
import zip from 'lodash/zip'

export const getRowIndex = (boardIndex, boardSize = 9) => {
  if (typeof boardIndex !== 'number') return null

  return Math.floor(boardIndex / boardSize)
}

export const getColumnIndex = (boardIndex, boardSize = 9) => {
  if (typeof boardIndex !== 'number') return null

  return boardIndex % boardSize
}

export const getBoxIndex = (boardIndex, boardSize = 9) => {
  if (typeof boardIndex !== 'number') return null

  const boxSize = Math.floor(boardSize / 3)
  const baseValue = Math.ceil((boardIndex + 1) / boxSize) - 1
  const offset =
    -boxSize * getRowIndex(boardIndex) +
    Math.floor(boardIndex / Math.floor(boardSize * 3)) * boxSize
  return baseValue + offset
}

export const getRowByBoardIndex = (board, boardIndex) => {
  if (typeof boardIndex !== 'number') return []

  const rowIndex = getRowIndex(boardIndex)
  const startingIndex = rowIndex * 9
  return board.slice(startingIndex, startingIndex + 9)
}

export const getColumnByBoardIndex = (board, boardIndex) => {
  if (typeof boardIndex !== 'number') return []

  const columnIndex = getColumnIndex(boardIndex)
  return board.filter((c, i) => getColumnIndex(i) === columnIndex)
}

export const getBoxByBoardIndex = (board, boardIndex) => {
  if (typeof boardIndex !== 'number') return []

  const houseIndex = getBoxIndex(boardIndex)
  return board.filter((c, i) => getBoxIndex(i) === houseIndex)
}

const isHouseValidForValue = (house, value, isIncoming = false) => {
  if (typeof value !== 'number') {
    return !isIncoming
  }
  return house.filter(c => c === value).length <= (isIncoming ? 0 : 1)
}

export const getIsCellValidForBoard = (
  board,
  index,
  value,
  { isIncoming = false } = {},
) => {
  return (
    isHouseValidForValue(getBoxByBoardIndex(board, index), value, isIncoming) &&
    isHouseValidForValue(getRowByBoardIndex(board, index), value, isIncoming) &&
    isHouseValidForValue(getColumnByBoardIndex(board, index), value, isIncoming)
  )
}

export const generateBoard = ({ numGivens = 30 } = {}) => {
  let board = '123456789'.split('').map(n => +n)
  board = shuffle(board)

  for (let i = 0; i < 8; i++) {
    const step = i === 2 || i === 5 ? 1 : 3
    const lastRow = board.slice(i * 9, i * 9 + 9)
    board = board.concat(shift(lastRow, step))
  }

  const rows = chunk(board, 27)
  board = shuffle(rows).flat()
  const cols = chunk(zip(...chunk(board, 9)).flat(), 27)
  board = shuffle(cols).flat()

  const numNulls = 81 - numGivens
  const nulls = shuffle([
    ...new Array(numNulls).fill(false),
    ...new Array(numGivens).fill(true),
  ])
  board = board.map((cell, i) => (nulls[i] ? cell : false)).flat()

  console.log({
    isValid: checkIsValid(board),
    isSolvable: solvePuzzle([...board]),
  })

  return board
}

const shift = (arr, step = 1) => [...arr.slice(step), ...arr.slice(0, step)]

export const logBoardState = (board, activeCell) => {
  const activeRowIndex = getRowIndex(activeCell)
  const activeColumnIndex = getColumnIndex(activeCell)
  const activeHouseIndex = getBoxIndex(activeCell)

  const activeRow = getRowByBoardIndex(board, activeCell).join('')
  const activeColumn = getColumnByBoardIndex(board, activeCell).join('')
  const activeHouse = getBoxByBoardIndex(board, activeCell).join('')

  console.log({
    activeCell,
    activeRow,
    activeColumn,
    activeHouse,
    activeRowIndex,
    activeColumnIndex,
    activeHouseIndex,
  })
}

const checkIsValid = board =>
  board.every((cell, index) => getIsCellValidForBoard(board, index, cell))

const solvePuzzle = board => {
  for (let i = 0; i < 81; i++) {
    if (typeof board[i] !== 'number') {
      for (let n = 1; n <= 9; n++) {
        if (getIsCellValidForBoard(board, i, n, { isIncoming: true })) {
          board[i] = n
          if (solvePuzzle(board)) {
            return true
          } else {
            board[i] = false
          }
        }
      }
      return false
    }
  }
  return true
}
