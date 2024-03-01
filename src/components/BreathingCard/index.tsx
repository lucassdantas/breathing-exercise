import { BreathingCardType } from '../../types/BreathingCardType'

export const BreathingCard = ({title, second}:BreathingCardType) => {
  return (
    <div id="InspiracaoDiv" className="cutdown">
        <h2 className="cutdown-title">{title}</h2>
        <p id="InspText" className="cutdown text">{second} s</p>
    </div>
  )
}
