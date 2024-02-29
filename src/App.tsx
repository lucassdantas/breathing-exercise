import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InputExerciseSelector } from './components/InputExerciseSelector'
import { useState } from 'react'
import { ChronometerController } from './components/ChronometerController'
import { ExercisesType } from './types/Exercises'
import { exercises } from './lib/exercises'

export default function App() {
    const [isChronometerRunning, setIsChronometerRunning] = useState<boolean>(false)
    const [selectedExercise, setSelectedExercise] = useState<ExercisesType>(exercises[0])
    const toggleChronometer = () => {
        setIsChronometerRunning(!isChronometerRunning)
    }

    return (
        <>
        <Header/>
        <main>
            <InputExerciseSelector selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise}/>
            <section id="CutDownSection" className="cutdown">
               <ChronometerController isChronometerRunning={isChronometerRunning} setIsChronometerRunning={setIsChronometerRunning} selectedExercise={selectedExercise}/>
            </section>
            <div id="DivButton">
                <button id="ButtonInit" onClick={() => toggleChronometer()}>Iniciar</button>
                <button id="ButtonStop" className="hidden">Parar</button>
            </div>
        </main>
        <Footer/>
        </>
    )
}
