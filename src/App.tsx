import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { BreathingCard } from './components/BreathingCard'
import { InputExerciseSelector } from './components/InputExerciseSelector'
import { BreathingCardType } from './types/BreathingCardType'
import { useState } from 'react'

export default function App() {
    const cards:BreathingCardType[] = [
        {
            title:"Inspire por: ",
            second:0,
        },
        {
            title:"Segure por: ",
            second:0,
        },
        {
            title:"Expire por: ",
            second:0,
        },
    ]    
    const exercises = [
        {
            defaultExercise: {
                inspiration: 5,
                holdRespiration: 5,
                expiration: 20,
                repeatTimes: 4
            },
        },
    ]
    const [currentSecond, setCurrentSecond] = useState<number>(0)
    
    const startChronometer = () => {
        setCurrentSecond(currentSecond+1)
    }

    return (
        <>
        <Header/>
        <main>
            <InputExerciseSelector/>
            <section id="CutDownSection" className="cutdown">
                {
                    cards && 
                    cards.map((card:BreathingCardType) => {
                        return <BreathingCard title={card.title} second={card.second}/>
                    })
                }
            </section>
            <div id="DivButton">
                <p>{currentSecond}</p>
                <button id="ButtonInit" onClick={() => startChronometer()}>Iniciar</button>
                <button id="ButtonStop" className="hidden">Parar</button>
            </div>
        </main>
        <Footer/>
        </>
    )
}
