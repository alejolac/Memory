import { useState, useEffect } from 'react'
import arraysGame from "../data/cards.jsx"
import confetti from 'canvas-confetti'

const Memory = ({ type, handleState, handlePlayer, player }) => {
    const [typeGame, typeGameState] = useState(type)
    const [board, setBoard] = useState("")
    const [firstCard, setFirstCard] = useState("")
    const [secondCard, setSecondCard] = useState("")
    const [idFirstCard, setIdFirstCard] = useState(-1)
    const [idSecondCard, setIdSecondCard] = useState(-1)
    const [flippedCard, setFlippedCard] = useState([])
    const [countError, setCountError] = useState(0)
    const [win, setWin] = useState(false)

    // Player state
    const [playerOne, setPlayerOne] = useState(0)
    const [playerTwo, setPlayerTwo] = useState(0)
    const [turn, setTurn] = useState(2)


    useEffect(() => {
        const manyElements = typeGame / 2
        let arr = [...arraysGame.Animals]
        while (arr.length != manyElements) {
            const num = Math.floor(Math.random() * arr.length)
            arr.splice(num, 1)
        }
        let newArr = arr.concat(arr)
        let newBoard = Array(typeGame).fill(null)
        for (let i = 0; i < newBoard.length; i++) {
            let numRandom = Math.floor(Math.random() * newArr.length)
            newBoard[i] = newArr[numRandom]
            newArr.splice(numRandom, 1)
        }
        let ultimateArr = []
        for (let i = 0; i < newBoard.length; i++) {
            ultimateArr.push([newBoard[i], i + 1])
        }
        setBoard(ultimateArr)
    }, [])

    useEffect(() => {
        console.log("asd");
        if (secondCard != firstCard && typeof (secondCard) != "string") {
            setTimeout(() => {
                setCountError(countError + 1)
                setIdFirstCard(-1)
                setIdSecondCard(-1)
                setFirstCard("1")
                setSecondCard("")

            }, 600);

        } else {
            if (idFirstCard != -1) {
                setTurn(turn == 1 ? 2 : 1)
                let newArr = [...flippedCard]
                newArr.push(idFirstCard)
                newArr.push(idSecondCard)
                setFlippedCard(newArr)
                if (turn == 1) {
                    setPlayerOne(playerOne + 2)
                } else { setPlayerTwo(playerTwo + 2) }
                if (newArr.length == board.length) {
                    confetti()
                    setWin(true)
                }
                setTimeout(() => {
                    setTurn(turn == 1 ? 2 : 1)
                }, 1000);
            }
            setTurn(turn == 1 ? 2 : 1)
            setFirstCard("1")
            setSecondCard("")
            setIdFirstCard(-1)
            setIdSecondCard(-1)
        }
    }, [idSecondCard])


    const handleGame = (data, id) => {
        if (typeof (firstCard) == "object" && secondCard != "") {
            return
        }
        if (firstCard == "" || firstCard == "1") {
            setFirstCard(data)
            setIdFirstCard(id)
            return
        }
        else if (id == idFirstCard) {
            return
        }
        else {
            setIdSecondCard(id)
            setSecondCard(data)
        }
    }

    const handleStyle = id => {
        if (id == idFirstCard || id == idSecondCard) {
            return (`flipped`)
        }
        return ``
    }

    const isFlipped = id => {
        for (let i = 0; i < flippedCard.length; i++) {
            if (flippedCard[i] == id) {
                return "flipped winner"
            }
        }
        return ""
    }

    const resetGame = () => {
        setIdFirstCard(-1)
        setIdSecondCard(-1)
        setFirstCard("1")
        setSecondCard("")
        setFlippedCard([])
        setCountError(0)
        setWin(false)
    }

    const winner = () => {
        if(playerOne > playerTwo) {
            return "Gano el Jugador 1!!"
        } 
        return playerOne == playerTwo ? "Empate" : "Gano el jugador 2!!"
    }

    let cont = 0
    let flipped = false
    return (
        <>
            {
                board != "" &&
                <>
                    <div className='game-menu'>
                        <header className='header-memory'>
                            Memory Game
                        </header>
                        <div className='memory'>
                            {board.map((card) => {
                                let styleClass = ``;
                                if (typeGame == 6) {
                                    styleClass = `card card-6`
                                } else if (typeGame == 12) {
                                    styleClass = `card card-12`
                                } else if (typeGame == 20) {
                                    styleClass = `card card-20`
                                } else { styleClass = `card card-30` }
                                flipped = false
                                cont += 1
                                return (
                                    <div className={`${styleClass} ${handleStyle(card[1])} ${isFlipped(card[1])}`} key={card[1]} onClick={() => handleGame(card[0], card[1])}>
                                        <div className="memory-card-front"></div>
                                        <div className="memory-card-back">{card[0]}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <div className="memory-info">
                                Number of Errors: {countError}
                            </div>
                        </div>
                        <div>
                            <button className='btn-back' onClick={() => {
                                handleState(0)
                                handlePlayer(0)
                            }}>
                                Back
                            </button>
                        </div>
                        {
                            win &&
                            <div className='win-modal'>
                                <div className='txt'>
                                    <div onClick={() => setWin(false)} className='x-modal'>X</div>
                                    <h2>{winner()}</h2>
                                    <footer>
                                        <button onClick={resetGame}>Empezar de nuevo</button>
                                    </footer>
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
            {
                player == 2 &&
                (
                    <div className="aside">
                        <table className="puntos">
                            <thead>
                                <tr>
                                    <th className={turn == 1 ? "turn" : ""}>Jugador 1</th>
                                    <th className={turn == 2 ? "turn" : ""}>Jugador 2</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{playerOne}</td>
                                    <td>{playerTwo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }

        </>
    )
}

export default Memory