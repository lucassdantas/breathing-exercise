import { BreathingCardType } from '../../types/BreathingCardType'
import './style.css'

export const BreathingCard = ({title, second, currentState}:BreathingCardType) => {
  return (
    <div id="InspiracaoDiv" className={'cutdown ' + currentState}>
        <h2 className="cutdown-title">{title}</h2>
        <p id="InspText" className="cutdown text">{second} s</p>
    </div>
  )
}
