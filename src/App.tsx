import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InputExerciseSelector } from './components/InputExerciseSelector'
import { useState } from 'react'
import { ChronometerController } from './components/ChronometerController'
import { Exercises } from './types/Exercises'

export default function App() {
    const [isChronometerRunning, setIsChronometerRunning] = useState<boolean>(false)
    const [selectedExercise, setSelectedExercise] = useState<Exercises>()
    
    const toggleChronometer = () => {
        setIsChronometerRunning(!isChronometerRunning)
    }

    return (
        <>
        <Header/>
        <main>
            <InputExerciseSelector selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise}/>
            <section id="CutDownSection" className="cutdown">
               <ChronometerController isChronometerRunning={isChronometerRunning}/>
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
