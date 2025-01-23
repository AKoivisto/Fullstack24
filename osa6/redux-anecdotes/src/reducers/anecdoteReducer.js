import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToLike = state.find(n => n.id === id)
      anecdoteToLike.votes += 1
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { createAnecdote, voteAnecdote, appendAnecdote } =anecdoteSlice.actions
export default anecdoteSlice.reducer