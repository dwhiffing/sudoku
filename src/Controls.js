import React from 'react'
import { Cell } from './Cell'

const Button = ({ value, onClick }) => (
  <div className="button" onClick={onClick}>
    {value}
  </div>
)

export const Controls = ({ onClickValue, activeNumber, onErase }) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <>
      <div className="controls">
        <Button value="Hint" onClick={() => {}} />
        <Button value="Undo" onClick={() => {}} />
        <Button value="Redo" onClick={() => {}} />
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
        <Button value="Pencil" onClick={() => {}} />
        <Button value="Erase" onClick={onErase} />
        <Button value="Game" onClick={() => {}} />
      </div>
    </>
  )
}
