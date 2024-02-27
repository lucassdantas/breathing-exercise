import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InfoCard } from './components/InfoCard'
import { InputExerciseSelector } from './components/InputExerciseSelector'

export default function App() {
  return (
    <>
    <Header/>
    <main>
        <InputExerciseSelector/>
        <div id="DivCustom" className="Custom CustomHidden">
            <div id="DivCustomInsp" className="Custom CustomDiv CustomHidden">
                <label className="Custom CustomLabel CustomHidden">Inspiração</label>
                <br/>
                <input id="InspValue" type="number" className="Custom ValueInput CustomHidden"/>    
            </div>
            <div id="DivCustomPause" className="Custom CustomDiv CustomHidden">
                <label className="Custom CustomLabel CustomHidden">Pausa</label>
                <br/>
                <input id="PauseValue"type="number" className="Custom ValueInput CustomHidden"/>    
            </div> 
            <div id="DivCustomExp" className="Custom CustomDiv CustomHidden">
                <label className="Custom CustomLabel CustomHidden">Expirção</label>
                <br/>
                <input id="ExpValue" type="number" className="Custom ValueInput CustomHidden"/>    
            </div>  
            <div id="RepeatValue" className="Custom CustomDiv CustomHidden">
                <label id="SelectRepeatTitle" className="Custom CustomHidden">Selecione o número de repetições</label>
                <br/>
                <input type="number" id="RepeatNumber" className="Custom ValueInput CustomHidden"/>
            </div>  
        </div>
        <section id="CutDownSection" className="cutdown">
            <InfoCard title={"Inspire por: "} seconds={0}/>
            <InfoCard title={"Segure por: "} seconds={0}/>
            <InfoCard title={"Expire por: "} seconds={0}/>
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
