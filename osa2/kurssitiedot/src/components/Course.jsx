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

  export default Course