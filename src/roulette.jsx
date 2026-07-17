export default function Roulette({ balance, setBalance }) {
  return (
    <div className="game-card">
      <h2>🎡 Roulette</h2>

      <p>Bilanci: £{balance.toFixed(2)}</p>

      <p>Roulette do ta ndërtojmë hap pas hapi.</p>

      <button>🔴 Red</button>
      <button>⚫ Black</button>
      <button>🟢 0</button>
    </div>
  )
}