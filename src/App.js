import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/egg-1.png", matched: false},
  {"src": "/img/feather-1.png", matched: false},
  {"src": "/img/flower-1.png", matched: false},
  {"src": "/img/mushroom-1.png", matched: false},
  {"src": "/img/switch-1.png", matched: false},
  {"src": "/img/star-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false) 
  //const [choicesFilled, setchoicesFilled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice  = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    //console.log(card)
    //choicesTest()  
  }

  // copare two selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  // const choicesTest = () => {
  //   console.log('New test')
  //   console.log('choice one', choiceOne)
  //   console.log('choice two', choiceTwo)
  // }

  //console.log(cards)

  //reset choices & increase turn
  const resetTurn = () => { 
    setChoiceOne(null)
    setChoiceTwo(null)
    //console.log('resetando', choiceOne, choiceTwo)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start new game auto
  useEffect(() => {
    shuffleCards()
  }, [])

  // console.log(cards, turns)

  return (
    <div className="App">
      <h1 className="game-title">Mario Memory Mini Game</h1>
      
      <button onClick={shuffleCards}>New Game</button>
      
 
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key= {card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            // choicesTest={choicesTest} 
          />
        ))}  
      </div>
      {/* <p>Punches: {turns}</p> */}
    </div>
  );
}

export default App;
