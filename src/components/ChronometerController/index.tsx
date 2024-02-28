import { cardsInfo } from '../../lib/cardsInfo'
import { BreathingCard } from '../BreathingCard'
import { BreathingCardType } from '../../types/BreathingCardType'
import { ExercisesType } from '../../types/Exercises'
import { useEffect } from 'react'

export const ChronometerController = ({isChronometerRunning, selectedExercise}:{isChronometerRunning:boolean, selectedExercise:ExercisesType}) => {
  
  const setInitialCardsValue = () => {
    for(let i = 0; i < cardsInfo.length; i ++){
      if(i === 0) cardsInfo[i].second = selectedExercise.inspiration
      if(i === 1) cardsInfo[i].second = selectedExercise.holdRespiration
      if(i === 2) cardsInfo[i].second = selectedExercise.expiration
      //if(i > 2) Set custom exercises on the future
    }
  }
  setInitialCardsValue()
  useEffect(() => {setInitialCardsValue()}, [selectedExercise])
  
  const handleSubtractSeconds = () => {
    for(let i = 0; i < cardsInfo.length; i ++){
      let currentCardSecond = 0

      if(i === 0) currentCardSecond = selectedExercise.inspiration
      if(i === 1) currentCardSecond = selectedExercise.holdRespiration
      if(i === 2) currentCardSecond = selectedExercise.expiration

      for(let i2 = currentCardSecond; i2 > 0; i2--){
        setTimeout(() => {
          currentCardSecond-- 
          cardsInfo[i].second = currentCardSecond
          
        }, 1000)
        console.log(currentCardSecond)
      }
    }
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
