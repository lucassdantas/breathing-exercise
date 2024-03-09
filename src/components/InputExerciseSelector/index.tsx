import React, { ChangeEvent } from 'react'
import { ExercisesType } from '../../types/Exercises'
import { exercises } from '../../lib/exercises'
import './style.css'

export const InputExerciseSelector = ({selectedExercise, setSelectedExercise}:{selectedExercise:ExercisesType, setSelectedExercise:React.Dispatch<React.SetStateAction<ExercisesType>>}) => {
  
  const handleSelectExercise = (e:ChangeEvent<HTMLSelectElement>) => {
    const selectedExerciseIndex:number = Number(e.target.value)
    setSelectedExercise(exercises[selectedExerciseIndex])
  }  
  
  return (
    <div id="exerciseSelectorDiv">
        <label id="exerciseSelectorLabel">Selecione seu exercício</label>
        <select name="exerciseSelector" id="exerciseSelector" className="exerciseSelector" onChange={(e) => handleSelectExercise(e)}>
          {
            exercises && 
            exercises.map((exercise:ExercisesType, i:number) => <option value={i}>{exercise.name}</option>)
          }
        </select>           
    </div>
  )
}
