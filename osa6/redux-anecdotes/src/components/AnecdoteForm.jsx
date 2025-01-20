import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const toAdd = event.target.new_anecdote.value
        event.target.new_anecdote.value = ''
        dispatch(createAnecdote(toAdd))
      }

    return (
        <div>
          <h2>create new</h2>
          <form onSubmit={newAnecdote}>
            <div><input name="new_anecdote"/></div>
            <button type="submit">create</button>
          </form>
        </div>
    )
}

export default AnecdoteForm