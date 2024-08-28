/* eslint-disable react/prop-types */
const Header = ({name}) => {
  console.log('tääl');
  console.log(name)
  
  return (
  <h1>{name}</h1>
  )
}

const Total = ({parts}) => {
  console.log(parts)
  let sum = 0
  for (let index = 0; index < parts.length; index++) {
    sum += parts[index].exercises
    
  }
  return (
    <p>Total of {sum} exercises</p>
  )
}

const Part = ({name , exe}) => {
  console.log(name , exe)
  return (
    <li>{name} {exe}</li>
  )
}

const Content = ({parts}) => {
  console.log('contentissa käyty')
  console.log(parts)
  return (
    <div>
      <ul>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exe={part.exercises} />
    )}
      </ul>
      <Total parts={parts}/>
    </div>
  )
}

const Course = ({course}) => {
  console.log(course)
  console.log('kaikki ok')
  return (
    <div>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
    </div>
  )
}

const App = () => {
  console.log('app');
  
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Fundamentals of React 2',
        exercises: 18,
        id: 8
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App