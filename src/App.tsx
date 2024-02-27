import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InputExerciseSelector } from './components/InputExerciseSelector'
import { useState } from 'react'
import { ChronometerController } from './components/ChronometerController'

export default function App() {
    const [currentSecond, setCurrentSecond] = useState<number>(0)
    const [isChronometerRunning, setIsChronometerRunning] = useState<boolean>(false)
    const toggleChronometer = () => {
        setIsChronometerRunning(!isChronometerRunning)
    }

    return (
        <>
        <Header/>
        <main>
            <InputExerciseSelector/>
            <section id="CutDownSection" className="cutdown">
               <ChronometerController isChronometerRunning={isChronometerRunning}/>
            </section>
            <div id="DivButton">
                <p>{currentSecond}</p>
                <button id="ButtonInit" onClick={() => toggleChronometer()}>Iniciar</button>
                <button id="ButtonStop" className="hidden">Parar</button>
            </div>
        </main>
        <Footer/>
        </>
    )
}
