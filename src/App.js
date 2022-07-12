import Card from './components/Card'
import {useState, useEffect} from 'react'

export default function App() {

  const [cards, setCards] = useState([])

  useEffect(() => {
    fetch('https://thronesapi.com/api/v2/Characters').then(res => res.json()).then(data => {

      setCards([...new Array(12)].map((card, index) => <Card key={data[index].id} fullName={data[index].fullName} image={data[index].imageUrl} />))
    })
  }, [])

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
        {cards}
      </main>
    </div>
  );
}