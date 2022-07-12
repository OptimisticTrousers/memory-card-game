import Card from './components/Card'
import {useState, useEffect} from 'react'

export default function App() {

  const [cards, setCards] = useState(() => [])

  const [score, setScore] = useState(() => 0)

  function randomizeCards(id){

    if(cards.some((card) => card.id === id && card.hasPlayerClicked)){
      setCards((prevCards) => {
        return [...prevCards].sort(() => Math.random() - 0.5)
      })
    }
    else{
      setCards((prevCards) => {
        return prevCards.map(prevCard => {
          return prevCard.id === id ? {...prevCard, hasPlayerClicked: true} : prevCard
        })
      })
    }
  }

  useEffect(() => {
    fetch('https://thronesapi.com/api/v2/Characters').then(res => res.json()).then(data => {

      setCards([...new Array(12)].map((card, index) => ({id: data[index].id, fullName: data[index].fullName, image: data[index].imageUrl, hasPlayerClicked: false})))
    })
  }, [])

  const renderedCards = cards.map(card => {
    return <Card key={card.id} fullName={card.fullName} image={card.image} handleClick={() => randomizeCards(card.id)} />
  })

  return (
    <div>
      <header>
        <h1>Game of Thrones Memory Game</h1>
        <div className="score">
          <h2>Score: 0</h2>
          <h2>Best score: 0</h2>
        </div>
        <p>Get points by clicking on an image but don't click on any more than one</p>
      </header>
      <main>
        {renderedCards}
      </main>
    </div>
  );
}