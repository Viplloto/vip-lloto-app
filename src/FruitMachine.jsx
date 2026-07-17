import { useState } from 'react'

const symbols = ['🍒', '🍋', '⭐', '🔔', '7️⃣', '💎']

function FruitMachine({ balance, setBalance }) {
  const [slots, setSlots] = useState(['🍒', '🍋', '⭐'])
  const [bet, setBet] = useState(1)
  const [message, setMessage] = useState(
    'Zgjidh bastin dhe shtyp SPIN.'
  )
  const [spinning, setSpinning] = useState(false)

  function randomSymbol() {
    const randomIndex = Math.floor(Math.random() * symbols.length)
    return symbols[randomIndex]
  }

  function changeBet(amount) {
    if (spinning) return

    setBet(amount)
    setMessage(`Basti u vendos: £${amount}`)
  }

  function spin() {
    if (spinning) return

    if (balance < bet) {
      setMessage('Nuk ke bilanc të mjaftueshëm.')
      return
    }

    setSpinning(true)
    setBalance((currentBalance) => currentBalance - bet)
    setMessage('Po rrotullohet...')

    let spinCount = 0

    const interval = setInterval(() => {
      setSlots([
        randomSymbol(),
        randomSymbol(),
        randomSymbol(),
      ])

      spinCount += 1

      if (spinCount >= 12) {
        clearInterval(interval)

        const finalSlots = [
          randomSymbol(),
          randomSymbol(),
          randomSymbol(),
        ]

        setSlots(finalSlots)

        const allSame =
          finalSlots[0] === finalSlots[1] &&
          finalSlots[1] === finalSlots[2]

        const twoSame =
          finalSlots[0] === finalSlots[1] ||
          finalSlots[1] === finalSlots[2] ||
          finalSlots[0] === finalSlots[2]

        if (allSame) {
          const prize = bet * 10

          setBalance(
            (currentBalance) => currentBalance + prize
          )

          setMessage(`JACKPOT! Fitove £${prize}!`)
        } else if (twoSame) {
          const prize = bet * 2

          setBalance(
            (currentBalance) => currentBalance + prize
          )

          setMessage(`Fitove £${prize}!`)
        } else {
          setMessage(
            'Nuk fitove këtë herë. Provo përsëri.'
          )
        }

        setSpinning(false)
      }
    }, 100)
  }

  return (
    <main className="fruit-machine-page">
      <section className="fruit-machine">
        <h2>Fruit Machine</h2>

        <div className="slot-balance">
          Bilanci virtual:{' '}
          <strong>£{balance.toFixed(2)}</strong>
        </div>

        <div className="slot-reels">
          {slots.map((symbol, index) => (
            <div className="slot-reel" key={index}>
              {symbol}
            </div>
          ))}
        </div>

        <div className="slot-bets">
          <span>Zgjidh bastin:</span>

          {[1, 2, 5, 10].map((amount) => (
            <button
              key={amount}
              className={
                bet === amount ? 'active-bet' : ''
              }
              onClick={() => changeBet(amount)}
              disabled={spinning}
            >
              £{amount}
            </button>
          ))}
        </div>

        <button
          className="spin-button"
          onClick={spin}
          disabled={spinning}
        >
          {spinning
            ? 'DUKE U RROTULLUAR...'
            : `SPIN £${bet}`}
        </button>

        <p className="slot-message">
          <strong>{message}</strong>
        </p>

        <div className="slot-rules">
          <p>3 simbole të njëjta: fiton 10 × bastin.</p>
          <p>2 simbole të njëjta: fiton 2 × bastin.</p>
        </div>
      </section>
    </main>
  )
}

export default FruitMachine