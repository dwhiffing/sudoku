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

export const getRowForBoardIndex = (board, boardIndex) => {
  if (typeof boardIndex !== 'number') return []

  const rowIndex = getRowIndex(boardIndex)
  const startingIndex = rowIndex * 9
  return board.slice(startingIndex, startingIndex + 9)
}

export const getColumnForBoardIndex = (board, boardIndex) => {
  if (typeof boardIndex !== 'number') return []

  const columnIndex = getColumnIndex(boardIndex)
  return board.filter((c, i) => getColumnIndex(i) === columnIndex)
}

export const getBoxForBoardIndex = (board, boardIndex) => {
  if (typeof boardIndex !== 'number') return []

  const houseIndex = getBoxIndex(boardIndex)
  return board.filter((c, i) => getBoxIndex(i) === houseIndex)
}

const isHouseValidForValue = (box, value) =>
  box.filter(v => v === value).length <= 1

export const getIsCellValidForBoard = (board, boardIndex, value) => {
  return (
    isHouseValidForValue(getBoxForBoardIndex(board, boardIndex), value) &&
    isHouseValidForValue(getRowForBoardIndex(board, boardIndex), value) &&
    isHouseValidForValue(getColumnForBoardIndex(board, boardIndex), value)
  )
}

export const logBoardState = (board, activeCell) => {
  const activeRowIndex = getRowIndex(activeCell)
  const activeColumnIndex = getColumnIndex(activeCell)
  const activeHouseIndex = getBoxIndex(activeCell)

  const activeRow = getRowForBoardIndex(board, activeCell).join('')
  const activeColumn = getColumnForBoardIndex(board, activeCell).join('')
  const activeHouse = getBoxForBoardIndex(board, activeCell).join('')

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
