import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { log } from 'util'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))
    const [popular, setPopular] = useState(0)
    

    const handleNextAnecdote = () => {
        let selectedCopy = 0
        while (selectedCopy === selected){
            selectedCopy = Math.floor(Math.random() * anecdotes.length)
        }
        setSelected(selectedCopy)
    }

    const handleVote = () => {
        const votesCopy = [...votes]
        votesCopy[selected] = votesCopy[selected] + 1
        setVotes(votesCopy)
        const mostPopular = votesCopy.indexOf(Math.max(...votesCopy))
        setPopular(mostPopular)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}<br />has {votes[selected]} votes</p>
            <button onClick={handleVote}>Vote</button>
            <button onClick={handleNextAnecdote}>Next Anecdote</button>
            <h1>Anecdote with most votes</h1>
            <p>{props.anecdotes[popular]}</p>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)