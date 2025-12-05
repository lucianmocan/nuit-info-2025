import React from 'react'

function GameOver(props) {
  return (
    <div
      id='GameBoard'
      className="responsive-game-board"
    >
      <div id='GameOver' className="game-over-content">
        <div id='GameOverText'>GAME OVER</div>
        <div>Your score: {props.score}</div>
        <div>
          {props.newHighScore ? 'New local ' : 'Local '}high score:{' '}
          {props.highScore}
        </div>
        <div id='PressSpaceText'>Press Space to restart</div>
      </div>
    </div>
  )
}

export default GameOver