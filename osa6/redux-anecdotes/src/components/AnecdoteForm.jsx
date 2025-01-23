import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const toAdd = event.target.new_anecdote.value
        event.target.new_anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(toAdd)
        console.log(newAnecdote)
        dispatch(createAnecdote(newAnecdote))
        // dispatch(createAnecdote(toAdd))
        dispatch(showNotification(`added anecdote '${toAdd}'`))
        setTimeout(() => {
          dispatch(showNotification(''))
        }, 5000)
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