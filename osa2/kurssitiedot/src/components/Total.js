import React from 'react'

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

export default Total