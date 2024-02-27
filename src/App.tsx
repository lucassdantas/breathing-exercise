import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { BreathingCard } from './components/BreathingCard'
import { InputExerciseSelector } from './components/InputExerciseSelector'
import { BreathingCardType } from './types/BreathingCardType'

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
                <button id="ButtonInit">Iniciar</button>
                <button id="ButtonStop" className="hidden">Parar</button>
            </div>
        </main>
        <Footer/>
        </>
    )
}
