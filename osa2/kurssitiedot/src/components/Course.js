import React from 'react'

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</div>
	)
}

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Content = ({ course }) => {
	return (
		<div>
			{course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
		</div>
	)
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>    
  )
}

const Total = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return (
    <p>
      <strong>
        total of {totalExercises} exercises
      </strong>
    </p>    
  )
}

export default Course