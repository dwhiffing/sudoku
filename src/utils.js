export const getRowIndex = (i, s = 9) => Math.floor(i / s)
export const getColumnIndex = (i, s = 9) => i % s
export const getBoxIndex = (i, s = 9) => {
  const size = Math.floor(s / 3)
  const baseValue = Math.ceil((i + 1) / size) - 1
  const offset =
    -size * getRowIndex(i) + Math.floor(i / Math.floor(s * 3)) * size
  return baseValue + offset
}

export const getRowForIndex = (board, index) => {
  if (typeof index !== 'number') return []
  const rowIndex = getRowIndex(index)
  const startingIndex = rowIndex * 9
  return board.slice(startingIndex, startingIndex + 9)
}

export const getColumnForIndex = (board, index) => {
  if (typeof index !== 'number') return []
  const columnIndex = getColumnIndex(index)
  return board.filter((c, i) => getColumnIndex(i) === columnIndex)
}

export const getBoxForIndex = (board, index) => {
  if (typeof index !== 'number') return []
  const houseIndex = getBoxIndex(index)
  return board.filter((c, i) => getBoxIndex(i) === houseIndex)
}

export const logBoardState = (board, activeCell) => {
  const activeRowIndex = getRowIndex(activeCell)
  const activeColumnIndex = getColumnIndex(activeCell)
  const activeHouseIndex = getBoxIndex(activeCell)

  const activeRow = getRowForIndex(board, activeCell).join('')
  const activeColumn = getColumnForIndex(board, activeCell).join('')
  const activeHouse = getBoxForIndex(board, activeCell).join('')

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

const isHouseValidForValue = (box, value) =>
  box.filter(v => v === value).length <= 1

export const getIsCellValidForBoard = (board, index, value) => {
  return (
    isHouseValidForValue(getBoxForIndex(board, index), value) &&
    isHouseValidForValue(getRowForIndex(board, index), value) &&
    isHouseValidForValue(getColumnForIndex(board, index), value)
  )
}
