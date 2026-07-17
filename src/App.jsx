import { useState } from 'react'
import './App.css'
import FruitMachine from './FruitMachine'
import DiceGame from './DiceGame'
import Roulette from './roulette'
const matches = [
  {
    id: 1,
    teams: 'Manchester City - Arsenal',
    time: 'Sot, 20:00',
    odds: [
      { result: '1', value: 1.95 },
      { result: 'X', value: 3.4 },
      { result: '2', value: 3.8 },
    ],
  },
  {
    id: 2,
    teams: 'Liverpool - Chelsea',
    time: 'Sot, 21:00',
    odds: [
      { result: '1', value: 1.7 },
      { result: 'X', value: 3.75 },
      { result: '2', value: 4.6 },
    ],
  },
  {
    id: 3,
    teams: 'Barcelona - Real Madrid',
    time: 'Nesër, 21:00',
    odds: [
      { result: '1', value: 2.3 },
      { result: 'X', value: 3.3 },
      { result: '2', value: 2.8 },
    ],
  },
  {
    id: 4,
    teams: 'Inter - Milan',
    time: 'Nesër, 19:45',
    odds: [
      { result: '1', value: 2.15 },
      { result: 'X', value: 3.2 },
      { result: '2', value: 3.1 },
    ],
  },
  {
    id: 5,
    teams: 'Bayern Munich - Dortmund',
    time: 'Sot, 18:30',
    odds: [
      { result: '1', value: 1.8 },
      { result: 'X', value: 3.9 },
      { result: '2', value: 4.2 },
    ],
  },
]

function App() {
  const [page, setPage] = useState('football')
  const [balance, setBalance] = useState(1000)
  const [selection, setSelection] = useState(null)
  const [stake, setStake] = useState('')
  const [history, setHistory] = useState([])
  const [message, setMessage] = useState('')

  const stakeNumber = Number(stake) || 0

  const possibleReturn = selection
    ? Math.min(stakeNumber * selection.odds, 10000)
    : 0

  function chooseOdd(match, odd) {
    setSelection({
      match: match.teams,
      result: odd.result,
      odds: odd.value,
    })

    setMessage('')
  }

  function placeBet() {
    if (!selection) {
      setMessage('Zgjidh një koeficient.')
      return
    }

    if (stakeNumber < 1) {
      setMessage('Shuma minimale është £1.')
      return
    }

    if (stakeNumber > 1000) {
      setMessage('Basti maksimal është £1,000.')
      return
    }

    if (stakeNumber > balance) {
      setMessage('Nuk ke bilanc të mjaftueshëm.')
      return
    }

    const betId = Date.now()
    const betReturn = Math.min(
      stakeNumber * selection.odds,
      10000
    )

    const newBet = {
      id: betId,
      match: selection.match,
      result: selection.result,
      odds: selection.odds,
      stake: stakeNumber,
      possibleReturn: betReturn,
      status: 'pending',
    }

    setBalance((currentBalance) => {
      return currentBalance - stakeNumber
    })

    setHistory((currentHistory) => [
      newBet,
      ...currentHistory,
    ])

    setSelection(null)
    setStake('')
    setMessage('Skedina u vendos. Rezultati del pas 5 sekondash.')

    setTimeout(() => {
      const isWinner = Math.random() < 0.45

      setHistory((currentHistory) =>
        currentHistory.map((item) =>
          item.id === betId
            ? {
                ...item,
                status: isWinner ? 'won' : 'lost',
              }
            : item
        )
      )

      if (isWinner) {
        setBalance((currentBalance) => {
          return currentBalance + betReturn
        })
      }
    }, 5000)
  }

  function statusText(status) {
    if (status === 'pending') return '⏳ Në pritje...'
    if (status === 'won') return '✅ Fituese'
    return '❌ Humbëse'
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>VIP LLOTO</h1>
          <p>Lojë private me kredite virtuale</p>
        </div>

        <div className="balance">
          Bilanci: <strong>£{balance.toFixed(2)}</strong>
        </div>
      </header>

      <nav className="menu">
  <button onClick={() => setPage('football')}>
    Futboll
  </button>

  <button onClick={() => setPage('slots')}>
    Fruit Machine
  </button>

  <button onClick={() => setPage('dice')}>
    Dice Game
  </button>
<button onClick={() => setPage('roulette')}>
  Roulette
</button>
</nav>

      {page === 'football' && (
        <>
          <main className="content">
            <section className="matches">
              <h2>Ndeshjet</h2>

              {matches.map((match) => (
                <div className="match" key={match.id}>
                  <div className="match-info">
                    <strong>{match.teams}</strong>
                    <span>{match.time}</span>
                  </div>

                  <div className="odds">
                    {match.odds.map((odd) => (
                      <button
                        key={odd.result}
                        onClick={() => chooseOdd(match, odd)}
                      >
                        {odd.result}{' '}
                        <strong>
                          {odd.value.toFixed(2)}
                        </strong>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <aside className="betslip">
              <h2>Skedina ime</h2>

              {selection ? (
                <div>
                  <p>
                    <strong>{selection.match}</strong>
                  </p>

                  <p>
                    Zgjedhja: {selection.result}
                  </p>

                  <p>
                    Koeficienti:{' '}
                    {selection.odds.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p>Zgjidh një koeficient.</p>
              )}

              <label htmlFor="stake">
                Shuma virtuale
              </label>

              <input
                id="stake"
                type="number"
                min="1"
                max="1000"
                value={stake}
                onChange={(event) =>
                  setStake(event.target.value)
                }
                placeholder="£1 - £1,000"
              />

              <div className="limits">
                <span>Basti maksimal: £1,000</span>
                <span>Fitimi maksimal: £10,000</span>
                <span>
                  Kthimi i mundshëm: £
                  {possibleReturn.toFixed(2)}
                </span>
              </div>

              {message && (
                <p>
                  <strong>{message}</strong>
                </p>
              )}

              <button
                className="place-bet"
                onClick={placeBet}
              >
                Vendos bastin
              </button>
            </aside>
          </main>

          <section className="history">
            <h2>Historiku i skedinave</h2>

            {history.length === 0 ? (
              <p>
                Nuk ka ende skedina të vendosura.
              </p>
            ) : (
              history.map((item) => (
                <div
                  className="history-item"
                  key={item.id}
                >
                  <strong>{item.match}</strong>

                  <span>
                    Zgjedhja: {item.result}
                  </span>

                  <span>
                    Koeficienti:{' '}
                    {item.odds.toFixed(2)}
                  </span>

                  <span>
                    Basti: £{item.stake.toFixed(2)}
                  </span>

                  <span>
                    Kthimi: £
                    {item.possibleReturn.toFixed(2)}
                  </span>

                  <span>
                    <strong>
                      {statusText(item.status)}
                    </strong>
                  </span>
                </div>
              ))
            )}
          </section>
        </>
      )}

{page === 'slots' && (
  <FruitMachine
    balance={balance}
    setBalance={setBalance}
  />
)}

{page === 'dice' && (
  <DiceGame
    balance={balance}
    setBalance={setBalance}
  />
)}

{page === 'roulette' && (
  <Roulette
    balance={balance}
    setBalance={setBalance}
  />
)}

</div>
)
}
export default App