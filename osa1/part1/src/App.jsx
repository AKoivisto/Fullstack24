const Hello = (props) => {
  console.log
  return (
    <div>
      <p>Hello {props.name} you are {props.age}</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 50
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="maya" age= {20} />
      <Hello name={nimi} age={ika}/>
    </div>
  )
}

export default App