import React from 'react';

const getId = () => (100000*Math.random()).toFixed(0)

class App extends React.Component {

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        id: getId(),
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }

  addVote = (id) => () => {
    this.props.store.dispatch({
      type: 'ADD_VOTE',
      data: { id }
    })
  }

  render() {
    const anecdotes = this.props.store.getState().sort(
      function(a,b) {
        return b.votes - a.votes
      }
    )
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <input name="anecdote" />
          <button>Add</button> 
        </form>
      </div>
    )
  }
}

export default App