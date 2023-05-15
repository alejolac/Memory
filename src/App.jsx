import { useState } from 'react'
import Game from "./components/memory.jsx"
import './App.css'
import Footer from "./components/footer.jsx"

function App() {
  const [game, setGame] = useState(0)
  const [player, setPlayer] = useState(0)

  const startGame = () => {
    if (game == 0) {
      return (
        <>
          <div className="menu">
            <h1 className="title">Memory Game</h1>
            <div className="button-row">
              <button onClick={() => handleState(6)} className="button"> 2 X 3</button>
              <button onClick={() => handleState(12)} className="button"> 3 X 4</button>
            </div>
            <div className="button-row" style={{marginBottom: "30px"}}>
              <button onClick={() => handleState(20)} className="button"> 4 X 5</button>
              <button onClick={() => handleState(30)} className="button"> 5 X 6</button>
            </div>
            <div onClick={() => setPlayer(0)} className='back-home'>
              <button className='btn-back' onClick={() => handleState(0)}>
                Back
              </button>
            </div>
          </div>
        </>

      )
    }
    return (
      <div className='flex-menu'>
        <Game type={game} handleState={handleState} handlePlayer={handlePlayer} player={player}/>
      </div>
    )
  }

  const numberOfPlayers = () => {
    if (player == 0) {
      return (
        <div className="menu">
          <h1 className="title">Memory Game</h1>
          <div className="button-row">
            <button onClick={() => handlePlayer(1)} className="button">One Player <i className="icon-menu fa-solid fa-user"></i></button>
          </div>
          <div className="button-row">
            <button onClick={() => handlePlayer(2)} className="button">Two Players <i className="icon-menu fa-solid fa-user-group"></i></button>
          </div>
        </div>
      )
    }
    return (
      startGame()
    )
  }

  const handleState = state => setGame(state)

  const handlePlayer = num => setPlayer(num)
  return (
    <>
      {numberOfPlayers()}
      <Footer />
    </>
  )
}

export default App
