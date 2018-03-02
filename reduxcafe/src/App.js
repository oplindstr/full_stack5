import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import reducer from './reducer'

const Statistiikka = (props) => {
  const state = store.getState()
  const palautteita = state.good + state.ok + state.bad

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  const positiivisia = Math.round((state.good / palautteita) * 100)

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={props.nollaa('ZERO')}>nollaa tilasto</button>
    </div >
  )
}

const store = createStore(reducer)

class App extends React.Component {

  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka nollaa={this.klik}/>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App