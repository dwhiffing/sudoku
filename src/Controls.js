import React from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import { Cell } from './Cell'

const Button = ({ value, onClick }) => (
  <div className="button" onClick={onClick}>
    {value}
  </div>
)

export const Controls = ({ onClickValue, activeNumber, onErase }) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const otherKeys = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c']
  return (
    <>
      <KeyboardEventHandler
        handleKeys={data.map(d => d.toString()).concat(otherKeys)}
        onKeyEvent={(key, e) => {
          if (otherKeys.includes(key)) {
            onClickValue(null, otherKeys.indexOf(key) + 1)
          } else {
            onClickValue(null, +key)
          }
        }}
      />
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
