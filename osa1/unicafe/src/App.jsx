/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({handleClick , text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({good , neutral , bad}) => {
  const all = good + neutral + bad
  const total = 1*good + (-1*bad)
  console.log(all)
  const positive = good/all

  if (all === 0) {
    return (
      <div>
        <p>No feedback given. Give feedback to see statistics</p>
      </div>
    )
  }

    return (
    <div>
    <h2>Stats</h2>
    <p>good: {good} </p>
    <p>neutral: {neutral}</p>
    <p>bad: {bad}</p>
    <p>all: {all}</p>
    <p>average: {total/all}</p>
    <p>positive: {positive} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)




  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
    </div>
  )
}

export default App