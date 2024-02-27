import React from 'react'

export const InputExerciseSelector = () => {
  return (
    <div id="DivExercSelector">
        <label id="SelectExercTitle">Selecione o exercício</label>
        <select name="SeletorExercicio" id="SelectExerc" className="ValueInput">
            <option value="Padrão">Padrão</option>
            <option value="1">Exercício 1</option>
            <option value="Custom">Customizado</option>
        </select>           
    </div>
  )
}
