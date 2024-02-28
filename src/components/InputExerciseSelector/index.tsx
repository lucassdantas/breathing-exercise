import React, { ChangeEvent } from 'react'
import { Exercises } from '../../types/Exercises'
import { exercises } from '../../lib/exercises'

export const InputExerciseSelector = ({selectedExercise, setSelectedExercise}:{selectedExercise:Exercises, setSelectedExercise:React.Dispatch<React.SetStateAction<Exercises>>}) => {
  
  const selectExercise = (e:ChangeEvent<HTMLInputElement>) => {
    setSelectedExercise(e.target.value)
    console.log(selectedExercise)
  }  
  return (
    <div id="DivExercSelector">
        <label id="SelectExercTitle">Selecione o exercício</label>
        <select name="SeletorExercicio" id="SelectExerc" className="ValueInput" onChange={() => selectExercise}>
          {
            exercises && 
            exercises.map((exercise:Exercises, i:number) => <option value={i}>{exercise.name}</option>)
          }
        </select>           
    </div>
  )
}
