/* eslint-disable react/prop-types */
const Header = ({name}) => {
  console.log('tääl');
  console.log(name)
  
  return (
  <h1>{name}</h1>
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

  const total = parts.reduce((sum, part) => {
    console.log('total test', sum, part.exercises);
    return sum + part.exercises}, 0)



  return (
    <div>
      <ul>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exe={part.exercises} />
    )}
      </ul>
      <p>Total of {total} exercises</p>
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

const Courses = ({courses}) => {
  console.log(courses)
  
  return (
    <div>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
  
}

const App = () => {
  console.log('app');
  
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }, 
    {
      name: 'Java',
      id: 3,
      parts: [
        {
          name: 'Java basics',
          exercises: 30,
          id: 1
        },
        {
          name: 'Advanced Java',
          exercises: 15,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Courses</h1>
      <Courses courses={courses} />
    </div>
  )
}

export default App