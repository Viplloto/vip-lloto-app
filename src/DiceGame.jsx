import { useState } from 'react'

function DiceGame({ balance, setBalance }) {
  const [bet, setBet] = useState(1)
  const [choice, setChoice] = useState('high')
  const [dice, setDice] = useState(null)
  const [message, setMessage] = useState(
    'Zgjidh bastin dhe parashiko rezultatin.'
  )
  const [rolling, setRolling] = useState(false)

  function playDice() {
    if (rolling) return

    if (balance < bet) {
      setMessage('Nuk ke bilanc të mjaftueshëm.')
      return
    }

    setRolling(true)
    setDice(null)
    setMessage('Zari po rrotullohet...')

    setBalance((currentBalance) => currentBalance - bet)

    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1
      setDice(result)

      const won =
        (choice === 'low' && result <= 3) ||
        (choice === 'high' && result >= 4)

      if (won) {
        const prize = bet * 2

        setBalance((currentBalance) => currentBalance + prize)
        setMessage(`Fitove £${prize}! Zari doli ${result}.`)
      } else {
        setMessage(`Nuk fitove. Zari doli ${result}.`)
      }

      setRolling(false)
    }, 1000)
  }

  return (
    <main className="dice-page">
      <section className="dice-game">
        <h2>Dice Game</h2>

        <div className="slot-balance">
          Bilanci virtual:{' '}
          <strong>£{balance.toFixed(2)}</strong>
        </div>

        <div className="dice-display">
          {dice === null ? '🎲' : dice}
        </div>

        <div className="dice-choices">
          <button
            className={choice === 'low' ? 'active-bet' : ''}
            onClick={() => setChoice('low')}
            disabled={rolling}
          >
            1–3
          </button>

          <button
            className={choice === 'high' ? 'active-bet' : ''}
            onClick={() => setChoice('high')}
            disabled={rolling}
          >
            4–6
          </button>
        </div>

        <div className="slot-bets">
          <span>Zgjidh bastin:</span>

          {[1, 2, 5, 10].map((amount) => (
            <button
              key={amount}
              className={bet === amount ? 'active-bet' : ''}
              onClick={() => setBet(amount)}
              disabled={rolling}
            >
              £{amount}
            </button>
          ))}
        </div>

        <button
          className="spin-button"
          onClick={playDice}
          disabled={rolling}
        >
          {rolling ? 'DUKE U RROTULLUAR...' : `HIDH ZARIN £${bet}`}
        </button>

        <p className="slot-message">
          <strong>{message}</strong>
        </p>

        <div className="slot-rules">
          <p>Zgjidh 1–3 ose 4–6.</p>
          <p>Nëse fiton, merr 2 × bastin.</p>
        </div>
      </section>
    </main>
  )
}

export default DiceGame