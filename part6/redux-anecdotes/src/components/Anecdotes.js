import React from 'react'
import { connect } from 'react-redux'
import { changeVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
    const handleVote = (anecdote) => () => {
        props.changeVote(anecdote.id)
        props.setNotification(`anecdote '${anecdote.content}' votes have increased`, 3)
    }


    return (
        <div>
            <h2>Anecdotes</h2>
            {props.visibleAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                    {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes}
                    <button onClick={handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const anecdotesToShow = ({ anecdotes, filterText, notification }) => {
    const anecdotesToShow = anecdotes.filter(a => {
        const anecdoteContent = a.content
        if (anecdoteContent.includes(filterText)){
            return a
        }
    })
    const sortedAnecdotes = anecdotesToShow.sort((l,m) => m.votes - l.votes)
    return sortedAnecdotes
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    changeVote,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)