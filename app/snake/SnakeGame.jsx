
import React from 'react'
import './SnakeGame.css'
import GameOver from './GameOver.jsx'

class SnakeGame extends React.Component {
  constructor(props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)

    this.state = {
      width: 0,
      height: 0,
      blockWidth: 0,
      blockHeight: 0,
      gameLoopTimeout: 125,
      timeoutId: 0,
      startSnakeSize: 0,
      snake: [],
      walls: [],
      apple: {},
      direction: 'right',
      directionChanged: false,
      isGameOver: false,
      snakeColor: this.props.snakeColor || this.getRandomColor(),
      appleColor: this.props.appleColor || this.getRandomColor(),
      score: 0,
      highScore: 0,
      newHighScore: false,
      framesPerMove: 5,
      actualFrame: 1,
    }
  }

  componentDidMount() {
    this.setState({
      highScore: Number(localStorage.getItem('snakeHighScore')) || 0,
    })
    this.initGame()
    window.addEventListener('keydown', this.handleKeyDown)
    this.gameLoop()
  }

  initGame() {
    const gameBoard = document.getElementById('GameBoard');
    if (!gameBoard) {
      setTimeout(() => this.initGame(), 100);
      return;
    }

    let width = gameBoard.offsetWidth;
    width -= width % 30;
    if (width < 30) width = 30;

    let height = (width / 3) * 2;
    let blockWidth = width / 30;
    let blockHeight = height / 20;

    let startSnakeSize = this.props.startSnakeSize || 6;
    let snake = [];
    let Xpos = width / 2;
    let Ypos = height / 2;

    snake.push({ Xpos, Ypos });

    for (let i = 1; i < startSnakeSize; i++) {
      Xpos -= blockWidth;
      snake.push({ Xpos, Ypos });
    }

    let appleXpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) * blockWidth;
    let appleYpos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) * blockHeight;

    while (appleYpos === snake[0].Ypos) {
      appleYpos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight;
    }

    let nbCol = Math.floor(width / blockWidth);
    let nbLines = Math.floor(height / blockHeight);

    let walls = [];

    for (let i = 0; i < nbLines; i++) {
      let row = [];

      if (i === 0) {
        for (let j = 0; j < nbCol; j++) {
          row.push(`/imgs/Blocs/Blocs${j % 2}.png`);
        }
      } else if (i === nbLines - 1) {
        for (let j = 0; j < nbCol; j++) {
          row.push(`/imgs/Blocs/Blocs${(i + j) % 2}.png`);
        }
      } else {
        for (let j = 0; j < nbCol; j++) {
          if (j === 0 || j === nbCol - 1) {
            row.push(`/imgs/Blocs/Blocs${i % 2}.png`);
          } else {
            row.push(`/imgs/Blocs/background.png`);
          }
        }
      }

      walls.push(row);
    }

    this.setState({
      width,
      height,
      blockWidth,
      blockHeight,
      startSnakeSize,
      snake,
      walls,
      apple: { Xpos: appleXpos, Ypos: appleYpos }
    });
  }


  gameLoop() {
    let timeoutId = setTimeout(() => {
      if (!this.state.isGameOver) {
        this.state.actualFrame %= 12
        this.state.actualFrame += 0.2
        if (this.state.actualFrame < 1)
        {this.state.actualFrame = 1.2}
        this.state.appleFrameImage = "/imgs/Apple/apple" + Math.round(this.state.actualFrame) + ".png"
        this.state.snakeHeadFrameImage = "/imgs/snake_head/snake_head_" + Math.round(this.state.actualFrame) + ".png"
        this.state.snakeTailFrameImage = "/imgs/snake_tail/snake_tail_" + Math.round(this.state.actualFrame) + ".png"
        this.state.snakeBodyFrameImage = "/imgs/snake_body/snake_body_" + Math.round(this.state.actualFrame) + ".png"
        this.state.snakeBendFrameImage = "/imgs/snake_bend/snake_bended_" + Math.round(this.state.actualFrame) + ".png"
        for (let i = 0; i < 1; i++)
        {
          this.moveSnake(this.state.framesPerMove)
        }
        this.tryToEatSnake()
        this.tryToEatApple()
        this.setState({ directionChanged: false })
      }

      this.gameLoop()
    }, this.state.gameLoopTimeout)

    this.setState({ timeoutId })
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  resetGame() {
    let width = this.state.width
    let height = this.state.height
    let blockWidth = this.state.blockWidth
    let blockHeight = this.state.blockHeight
    let apple = this.state.apple

    let snake = []
    let Xpos = width / 2
    let Ypos = height / 2
    let snakeHead = { Xpos: width / 2, Ypos: height / 2 }
    snake.push(snakeHead)
    for (let i = 1; i < this.state.startSnakeSize; i++) {
      Xpos -= blockWidth
      let snakePart = { Xpos: Xpos, Ypos: Ypos }
      snake.push(snakePart)
    }

    apple.Xpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth
    apple.Ypos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight
    while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
      apple.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth
      apple.Ypos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight
    }

    this.setState({
      snake,
      apple,
      direction: 'right',
      directionChanged: false,
      isGameOver: false,
      gameLoopTimeout: 125,
      snakeColor: this.getRandomColor(),
      appleColor: this.getRandomColor(),
      score: 0,
      newHighScore: false,
    })
  }

  getRandomColor() {
    let hexa = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) color += hexa[Math.floor(Math.random() * 16)]
    return color
  }

  moveSnake(nbFrames) {
    let snake = this.state.snake
    let previousPartX = this.state.snake[0].Xpos
    let previousPartY = this.state.snake[0].Ypos
    let tmpPartX = previousPartX
    let tmpPartY = previousPartY
    this.moveHead(nbFrames)
    for (let i = 1; i < snake.length; i++) {
      tmpPartX = snake[i].Xpos
      tmpPartY = snake[i].Ypos
      snake[i].Xpos = previousPartX
      snake[i].Ypos = previousPartY
      previousPartX = tmpPartX
      previousPartY = tmpPartY
    }
    this.setState({ snake })
  }

  tryToEatApple() {
    let snake = this.state.snake
    let apple = this.state.apple

    // if the snake's head is on an apple
    if (snake[0].Xpos === apple.Xpos && snake[0].Ypos === apple.Ypos) {
      let width = this.state.width
      let height = this.state.height
      let blockWidth = this.state.blockWidth
      let blockHeight = this.state.blockHeight
      let newTail = { Xpos: apple.Xpos, Ypos: apple.Ypos }
      let highScore = this.state.highScore
      let newHighScore = this.state.newHighScore
      let gameLoopTimeout = this.state.gameLoopTimeout

      // increase snake size
      snake.push(newTail)

      // create another apple
      apple.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth
      apple.Ypos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight
      while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
        apple.Xpos =
          Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
          blockWidth
        apple.Ypos =
          Math.floor(
            Math.random() * ((height - blockHeight) / blockHeight + 1)
          ) * blockHeight
      }

      // increment high score if needed
      if (this.state.score === highScore) {
        highScore++
        localStorage.setItem('snakeHighScore', highScore)
        newHighScore = true
      }

      // decrease the game loop timeout
      if (gameLoopTimeout > 25) gameLoopTimeout -= 0.5

      this.setState({
        snake,
        apple,
        score: this.state.score + 1,
        highScore,
        newHighScore,
        gameLoopTimeout,
      })
    }
  }

  tryToEatSnake() {
    let snake = this.state.snake

    for (let i = 1; i < snake.length; i++) {
      if (snake[0].Xpos === snake[i].Xpos && snake[0].Ypos === snake[i].Ypos)
        this.setState({ isGameOver: true })
    }
  }

  isAppleOnSnake(appleXpos, appleYpos) {
    let snake = this.state.snake
    for (let i = 0; i < snake.length; i++) {
      if (appleXpos === snake[i].Xpos && appleYpos === snake[i].Ypos)
        return true
    }
    return false
  }

  moveHead(nbFrames) {
    switch (this.state.direction) {
      case 'left':
        this.moveHeadLeft(nbFrames)
        break
      case 'up':
        this.moveHeadUp(nbFrames)
        break
      case 'right':
        this.moveHeadRight(nbFrames)
        break
      default:
        this.moveHeadDown(nbFrames)
    }
  }

  moveHeadLeft(nbFrames) {
    let width = this.state.width
    let blockWidth = this.state.blockWidth
    let snake = this.state.snake
    snake[0].Xpos =
      snake[0].Xpos <= 0 ? width - blockWidth : snake[0].Xpos - blockWidth
    this.setState({ snake })
  }

  moveHeadUp(nbFrames) {
    let height = this.state.height
    let blockHeight = this.state.blockHeight
    let snake = this.state.snake
    snake[0].Ypos =
      snake[0].Ypos <= 0 ? height - blockHeight : snake[0].Ypos - blockHeight
    this.setState({ snake })
  }

  moveHeadRight(nbFrames) {
    let width = this.state.width
    let blockWidth = this.state.blockWidth
    let snake = this.state.snake
    snake[0].Xpos =
      snake[0].Xpos >= width - blockWidth ? 0 : snake[0].Xpos + blockWidth
    this.setState({ snake })
  }

  moveHeadDown(nbFrames) {
    let height = this.state.height
    let blockHeight = this.state.blockHeight
    let snake = this.state.snake
    snake[0].Ypos =
      snake[0].Ypos >= height - blockHeight ? 0 : snake[0].Ypos + blockHeight
    this.setState({ snake })
  }

  handleKeyDown(event) {
    // if spacebar is pressed to run a new game
    if (this.state.isGameOver && event.keyCode === 32) {
      this.resetGame()
      return
    }

    if (this.state.directionChanged) return

    switch (event.keyCode) {
      case 37:
      case 65:
        this.goLeft()
        break
      case 38:
      case 87:
        this.goUp()
        break
      case 39:
      case 68:
        this.goRight()
        break
      case 40:
      case 83:
        this.goDown()
        break
      default:
    }
    this.setState({ directionChanged: true })
  }

  goLeft() {
    let newDirection = this.state.direction === 'right' ? 'right' : 'left'
    this.setState({ direction: newDirection })
  }

  goUp() {
    let newDirection = this.state.direction === 'down' ? 'down' : 'up'
    this.setState({ direction: newDirection })
  }

  goRight() {
    let newDirection = this.state.direction === 'left' ? 'left' : 'right'
    this.setState({ direction: newDirection })
  }

  goDown() {
    let newDirection = this.state.direction === 'up' ? 'up' : 'down'
    this.setState({ direction: newDirection })
  }

getDirection(from, to) {
    const { blockWidth, blockHeight } = this.state;
    
    // Calculate distance
    const dx = to.Xpos - from.Xpos;
    const dy = to.Ypos - from.Ypos;

    // If distance is huge (e.g., > 1 block), they are on opposite sides of screen
    // If 'to' is way to the right (dx > blockWidth), it actually wrapped left-to-right, so it's on the 'left'
    if (dx > blockWidth) return 'left';
    if (dx < -blockWidth) return 'right';
    if (dy > blockHeight) return 'up';
    if (dy < -blockHeight) return 'down';

    // Use a small buffer (0.1) to handle potential floating point math issues
    if (dx > 0.1) return 'right';
    if (dx < -0.1) return 'left';
    if (dy > 0.1) return 'down';
    if (dy < -0.1) return 'up';
    
    return null; // Should not happen if objects are adjacent
  }

getSegmentStyle(index) {
    const snake = this.state.snake;
    const current = snake[index];
    
    // Base style for all parts
    let style = {
      position: "absolute",
      width: this.state.blockWidth,
      height: this.state.blockHeight,
      left: current.Xpos,
      top: current.Ypos,
      objectFit: "cover",
      transformOrigin: "center center",
    };

    if (index === 0) {
      let rotation = 0;
      switch (this.state.direction) {
        case 'down': rotation = 0; break;
        case 'left': rotation = 90; break;
        case 'up': rotation = 180; break;
        case 'right': rotation = 270; break; 
      }
      return { ...style, transform: `rotate(${rotation}deg)`, src: this.state.snakeHeadFrameImage };
    }

    if (index === snake.length - 1) {
      const prev = snake[index - 1]; 
      const directionToPrev = this.getDirection(current, prev);
      
      let rotation = 0;
      switch (directionToPrev) {
        case 'down': rotation = 0; break;
        case 'left': rotation = 90; break;
        case 'up': rotation = 180; break;
        case 'right': rotation = 270; break;
      }
      return { ...style, transform: `rotate(${rotation}deg)`, src: this.state.snakeTailFrameImage };
    }

    const prev = snake[index - 1]; 
    const next = snake[index + 1]; 
    
    const dirToPrev = this.getDirection(current, prev);
    const dirToNext = this.getDirection(current, next);

    // Sort the directions alphabetically to make checking easier
    // e.g. "down" and "right" becomes "down-right"
    // e.g. "right" and "down" ALSO becomes "down-right"
    const cornerKey = [dirToPrev, dirToNext].sort().join('-');

    // If the directions are opposites, it's a straight line
    if (cornerKey === 'down-up') {
      return { ...style, transform: `rotate(0deg)`, src: this.state.snakeBodyFrameImage };
    }
    if (cornerKey === 'left-right') {
      return { ...style, transform: `rotate(90deg)`, src: this.state.snakeBodyFrameImage };
    }

    // Default Bend Image: Connects SOUTH (Down) and EAST (Right)
    let rotation = 0;

    switch (cornerKey) {
      case 'down-right': // Connects Bottom and Right
        rotation = 0;
        break;
      case 'down-left':  // Connects Bottom and Left
        rotation = 90;
        break;
      case 'left-up':    // Connects Top and Left
        rotation = 180;
        break;
      case 'right-up':   // Connects Top and Right
        rotation = 270;
        break;
      default:
        rotation = 0;
    }

    return { 
      ...style, 
      transform: `rotate(${rotation}deg)`, 
      src: this.state.snakeBendFrameImage 
    };
  }

  render() {
    // Game over
    if (this.state.isGameOver) {
      return (
        <GameOver
          width={this.state.width}
          height={this.state.height}
          highScore={this.state.highScore}
          newHighScore={this.state.newHighScore}
          score={this.state.score}
        />
      );
    }

    return (
      <div id="GameBoard" className="responsive-game-board">

        {/* BACKGROUND GRID */}
        {this.state.walls.map((row, rowIndex) =>
          row.map((tileSrc, colIndex) => (
            <img
              key={`wall-${rowIndex}-${colIndex}`}
              src={tileSrc}
              alt="wall tile"
              style={{
                position: "absolute",
                width: this.state.blockWidth,
                height: this.state.blockHeight,
                left: colIndex * this.state.blockWidth,
                top: rowIndex * this.state.blockHeight,
                objectFit: "cover",
                pointerEvents: "none"
              }}
            />
          ))
        )}

        {/* SNAKE */}
        {this.state.snake.map((snakePart, index) => {
          const partStyle = this.getSegmentStyle(index);
          return (
            <img
              key={index}
              src={partStyle.src}
              alt="snake part"
              style={{
                position: partStyle.position,
                width: partStyle.width,
                height: partStyle.height,
                left: partStyle.left,
                top: partStyle.top,
                objectFit: partStyle.objectFit,
                transform: partStyle.transform,
                transformOrigin: partStyle.transformOrigin
              }}
            />
          );
        })}

        {/* APPLE */}
        <img
          src={this.state.appleFrameImage}
          alt="apple"
          style={{
            position: "absolute",
            width: this.state.blockWidth,
            height: this.state.blockHeight,
            left: this.state.apple.Xpos,
            top: this.state.apple.Ypos,
            objectFit: "cover"
          }}
        />

        {/* SCORE */}
        <div id="Score" className="game-score">
          HIGH-SCORE: {this.state.highScore}
          &ensp;&ensp;&ensp;&ensp;
          SCORE: {this.state.score}
        </div>
      </div>
    );
  }

}

export default SnakeGame