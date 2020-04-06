import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ name, handleClick}) => {
  return (
    <>
      <button onClick={handleClick}>
        {name}
      </button>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  
  let average = (good + -bad) / all
  if (isNaN(average)) average = 0
  
  let positive = good / all * 100
  if (isNaN(positive)) positive = 0

  if (all > 0) return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
  else return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' handleClick={() => setGood(good + 1)} />
      <Button name='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button name='bad' handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))