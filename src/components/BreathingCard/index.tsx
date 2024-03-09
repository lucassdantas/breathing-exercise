import { BreathingCardType } from '../../types/BreathingCardType'
import './style.css'

export const BreathingCard = ({title, second, currentState}:BreathingCardType) => {
  return (
    <div className={'breathingCard ' + currentState}>
        <span className="breathingCardTitle">{title}</span>
        <p className="breathingCardSecond">{second} <small>s</small></p>
    </div>
  )
}
