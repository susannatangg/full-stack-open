import {useState} from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Button = ({onClickHandler,text}) => {
  return (
    <button onClick={onClickHandler}>{text}</button>
  )
}

const StatisticLine = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all=props.good+props.neutral+props.bad
  const avg=(props.good-props.bad)/all
  const positive=((props.good/all)*100).toFixed(1)+'%'
  if (all===0){
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good}/>
          <StatisticLine text='neutral' value={props.neutral}/>
          <StatisticLine text='bad' value={props.bad}/>
          <StatisticLine text='all' value={all}/>
          <StatisticLine text='average' value={avg}/>
          <StatisticLine text='positive' value={positive}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHandler = () => {
    setGood(good+1)
  }

  const neutralClickHandler = () => {
    setNeutral(neutral+1)
  }

  const badClickHandler = () => {
    setBad(bad+1)
  }

  const anecdoteHandler = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const voteHandler = () => {
    const copy = [...votes]
    copy[selected]+=1
    setVotes(copy)
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const maxVotesIdx = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Header text='give feedback'/>
      <Button onClickHandler={goodClickHandler} text='good'/>
      <Button onClickHandler={neutralClickHandler} text='neutral'/>
      <Button onClickHandler={badClickHandler} text='bad'/>
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <Header text='Anecdote of the day'/>
      <Button onClickHandler={voteHandler} text='vote'/>
      <Button onClickHandler={anecdoteHandler} text='next anecdote'/>
      <br/>
      {anecdotes[selected]}
      <p>has {votes[selected] || 0} votes</p>
      <Header text='Anecdote with most votes'/>
      {votes.every(val=>val===0) ? 'no votes yet' : anecdotes[maxVotesIdx]}
    </div>
  )
}

export default App