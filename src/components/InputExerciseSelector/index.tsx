import React, { ChangeEvent } from 'react'
import { ExercisesType } from '../../types/Exercises'
import { exercises } from '../../lib/exercises'

export const InputExerciseSelector = ({selectedExercise, setSelectedExercise}:{selectedExercise:ExercisesType, setSelectedExercise:React.Dispatch<React.SetStateAction<ExercisesType>>}) => {
  
  const handleSelectExercise = (e:ChangeEvent<HTMLSelectElement>) => {
    const selectedExerciseIndex:number = Number(e.target.value)
    setSelectedExercise(exercises[selectedExerciseIndex])
  }  
  
  return (
    <div id="DivExercSelector">
        <label id="SelectExercTitle">Selecione o exercício</label>
        <select name="SeletorExercicio" id="SelectExerc" className="ValueInput" onChange={(e) => handleSelectExercise(e)}>
          {
            exercises && 
            exercises.map((exercise:ExercisesType, i:number) => <option value={i}>{exercise.name}</option>)
          }
        </select>           
    </div>
  )
}
