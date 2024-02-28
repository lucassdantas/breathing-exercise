import { cardsInfo } from '../../lib/cardsInfo'
import { exercises } from '../../lib/exercises'
import { BreathingCard } from '../BreathingCard'
import { BreathingCardType } from '../../types/BreathingCardType'

export const ChronometerController = ({isChronometerRunning}:{isChronometerRunning:boolean}) => {
  
  const handleSubtractSeconds = () => {
    
    for(let i = 0; i < cardsInfo.length; i ++){
      cardsInfo[i].second = exercises.defaultExercise.inspiration
      setTimeout(() => {})
    }
    setInterval(() => {

    }
    ,1000)
  }
  return (
    <>
    {
        cardsInfo && 
        cardsInfo.map((card:BreathingCardType) => {
            return <BreathingCard title={card.title} second={card.second} key={card.title}/>
        })
        
    }
    {
      isChronometerRunning && 
      handleSubtractSeconds()
    }
    </>
  )
}
