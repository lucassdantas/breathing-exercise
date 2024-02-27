import React from 'react'
import { cardsInfo } from '../../lib/cardsInfo'
import { BreathingCard } from '../BreathingCard'
import { BreathingCardType } from '../../types/BreathingCardType'

export const ChronometerController = ({isChronometerRunning}:{isChronometerRunning:boolean}) => {
  return (
    <>
    {
        cardsInfo && 
        cardsInfo.map((card:BreathingCardType) => {
            return <BreathingCard title={card.title} second={card.second}/>
        })
        
    }
    {
        isChronometerRunning && <p>oi</p>
    }
    </>
  )
}
