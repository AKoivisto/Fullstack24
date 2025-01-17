import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'VOTE',
      payload: { id }
    })
  }

  const newAnecdote = (event) => {
    event.preventDefault()
    const toAdd = event.target.new_anecdote.value
    event.target.new_anecdote.value = ''
    const id = (100000 * Math.random()).toFixed(0)
    dispatch({
      type: 'NEW_ANECDOTE',
      payload: {
        content: toAdd,
        id: id,
        votes: 0
      }
  })

  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="new_anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App