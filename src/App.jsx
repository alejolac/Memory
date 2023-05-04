import { useState } from 'react'
import Game from "./components/memory.jsx"
import './App.css'
import Footer from "./components/footer.jsx"

function App() {
  const [game, setGame] = useState(0)

  const startGame = () => {
    if (game == 0) {
      return (
        <div className="menu">
          <h1 className="title">Memory Game</h1>
          <div className="button-row">
            <button onClick={() => handleState(6)} className="button"> 2 X 3</button>
            <button onClick={() => handleState(12)} className="button"> 3 X 4</button>
          </div>
          <div className="button-row">
            <button onClick={() => handleState(20)} className="button"> 4 X 5</button>
            <button onClick={() => handleState(30)} className="button"> 5 X 6</button>
          </div>
        </div>
      )
    }
    return (
      <div className='game-menu'>
        <Game type={game} handleState={handleState} />
      </div>
    )
  }
  const handleState = (state) => {
    setGame(state)
  }

  return (
    <>
      {startGame()}
      <Footer />
    </>
  )
}

export default App
