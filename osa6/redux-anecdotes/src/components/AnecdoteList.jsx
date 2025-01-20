import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector( state => 
        state.anecdotes.filter((anecdote) => 
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
    )

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
      }

    if (!anecdotes || anecdotes.length === 0) {
        return (
            <div>
                <p>No anecdotes found</p>
            </div>
        )

    }

    return (
        <div>
        {anecdotes.sort((a,b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )
        }
        </div>
        )
        
}

export default AnecdoteList

