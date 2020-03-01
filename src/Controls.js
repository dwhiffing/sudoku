import React from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import { Cell } from './Cell'

const Button = ({ style, value, onClick }) => (
  <div className="button" onClick={onClick} style={style}>
    {value}
  </div>
)

export const Controls = ({
  board,
  onClickPencil,
  onClickGame,
  onClickValue,
  activeNumber,
  undoBoard,
  onHint,
  canUndoBoard,
  redoBoard,
  canRedoBoard,
  onErase,
  usePencil,
}) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const otherKeys = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c']
  return (
    <>
      <KeyboardEventHandler
        handleKeys={data
          .map(d => d.toString())
          .concat(otherKeys)
          .concat(['h'])}
        onKeyEvent={(key, e) => {
          if (key === 'h') {
            onHint()
            return
          }
          if (otherKeys.includes(key)) {
            onClickValue(null, otherKeys.indexOf(key) + 1)
          } else {
            onClickValue(null, +key)
          }
        }}
      />
      <div className="controls">
        <Button value="Hint" onClick={onHint} />
        <Button value="Undo" onClick={undoBoard} />
        <Button value="Redo" onClick={redoBoard} />
      </div>
      <div className="controls-numbers">
        {data.map((value, boardIndex) => (
          <Cell
            key={`control-cell-${boardIndex}`}
            value={value}
            boardIndex={boardIndex}
            boardSize={3}
            isHighlighted={value === activeNumber}
            onClick={onClickValue}
          />
        ))}
      </div>
      <div className="controls">
        <Button
          style={{ backgroundColor: usePencil ? 'lightgrey' : 'white' }}
          value="Pencil"
          onClick={onClickPencil}
        />
        <Button value="Erase" onClick={onErase} />
        <Button value="Game" onClick={onClickGame} />
      </div>
    </>
  )
}
