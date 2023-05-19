import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled}) {
  
  const handleClick = () => {
    if(!disabled && !flipped) {
      handleChoice(card)
    }
    //choicesTest()
  }
  
  return (
    <div className="card">
        <div className={flipped ? "flipped": ""}>
            <img className="front" src={card.src} alt="card front"/>
            <img
              className="back"
              src="/img/cover.png"
              // onClick={() => flipped ? console.log("Select another card!") : handleClick}
              onClick={handleClick}
              alt="card back"
            />
        </div>
    </div>
  )
}
