import Card from './components/Card'
import {useState, useEffect} from 'react'

export default function App() {

  const [cards, setCards] = useState(() => [])

  const [bestScore, setBestScore] = useState(() => 0)

  const [score, setScore] = useState(() => 0)

  function randomizeCards(id){

    setCards((prevCards) => prevCards.map(prevCard => {
        return prevCard.id === id ? {...prevCard, hasPlayerClicked: true} : prevCard
      }).sort(() => Math.random() - 0.5)
    )

    if(cards.some((card) => card.id === id && card.hasPlayerClicked)){
      setCards((prevCards) => prevCards.map(prevCard => ({...prevCard, hasPlayerClicked: false})).sort(() => Math.random() - 0.5))

      if(bestScore < score){
        setBestScore(() => score)
      }

      setScore(() => 0)
    }
    else{

      setScore((prevScore) => prevScore + 1)
    }
  }

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character').then(res => res.json()).then(data => {

      setCards([...new Array(12)].map((card, index) => ({id: data.results[index].id, name: data.results[index].name, image: data.results[index].image, hasPlayerClicked: false})))
    })
  }, [])

  const renderedCards = cards.map(card => {
    return <Card key={card.id} name={card.name} image={card.image} handleClick={() => randomizeCards(card.id)} />
  })

  return (
    <div>
      <header>
        <h1>Rick and Morty Memory Game</h1>
        <div className="scores">
          <h2>Score: {score}</h2>
          <h2>Best score: {bestScore}</h2>
        </div>
      </header>
        <p className="directions">SPIDERS: Get points by clicking on an image but don't click on any more than one</p>
      <main>
        {renderedCards}
      </main>
    </div>
  );
}