import { useState, useEffect } from 'react'
import arraysGame from "../data/cards.jsx"
import confetti from 'canvas-confetti'

const Memory = ({ type, handleState }) => {
    const [typeGame, typeGameState] = useState(type)
    const [board, setBoard] = useState("")
    const [firstCard, setFirstCard] = useState("")
    const [secondCard, setSecondCard] = useState("")
    const [idFirstCard, setIdFirstCard] = useState(-1)
    const [idSecondCard, setIdSecondCard] = useState(-1)
    const [flippedCard, setFlippedCard] = useState([])
    const [countError, setCountError] = useState(0)
    const [win, setWin] = useState(false)

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
                let newArr = [...flippedCard]
                newArr.push(idFirstCard)
                newArr.push(idSecondCard)
                setFlippedCard(newArr)
                if (newArr.length == board.length) {
                    confetti()
                    
                    setWin(true)

                }
            }
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

    let cont = 0
    let flipped = false
    return (
        <>
            {
                board != "" &&
                <>
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
                        <button className='btn-back' onClick={() => handleState(0)}>
                            Back
                        </button>
                    </div>
                    {
                        win &&
                        <div className='win-modal'>
                            <div className='txt'>
                                <div onClick={() => setWin(false)} className='x-modal'>X</div>
                                <h2>Ganaste!!</h2>
                                <footer>
                                    <button onClick={resetGame}>Empezar de nuevo</button>
                                </footer>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Memory