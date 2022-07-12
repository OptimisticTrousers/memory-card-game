import Card from './components/Card'
import {useState} from 'react'

function App() {

  const [cards, setCards] = useState(() => Array(12).fill(<Card/>))

  return (
    <div>
      <header>
        <h1>Amphibia Memory Game</h1>
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

export default App;
