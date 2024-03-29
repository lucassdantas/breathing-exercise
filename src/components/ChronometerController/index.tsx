import { cardsInfo as externalCardsInfo } from '../../lib/cardsInfo';
import { BreathingCard } from '../BreathingCard';
import { BreathingCardType } from '../../types/BreathingCardType';
import { ExercisesType } from '../../types/Exercises';
import { useEffect, useState } from 'react';
import { CardState } from '../../types/CardState';
import './style.css'

export const ChronometerController = ({
  isChronometerRunning,
  setIsChronometerRunning,
  selectedExercise
}: {
  isChronometerRunning: boolean;
  setIsChronometerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  selectedExercise: ExercisesType;
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentRepetition, setCurrentRepetition] = useState(1);
  const [cardsInfo, setCardsInfo] = useState([...externalCardsInfo])
  
  const setInitialCardsSeconds = (cards:BreathingCardType[], incrementQuantity:number) => {
    for (let i = 0; i < cards.length; i++) {
      if (i === 0) cards[i].second = selectedExercise.inspiration + incrementQuantity;
      if (i === 1) cards[i].second = selectedExercise.holdRespiration + incrementQuantity;
      if (i === 2) cards[i].second = selectedExercise.expiration + incrementQuantity;
      // if (i > 2) Set custom exercises on the future
    }
    return cards
  }

  const setActiveCard = (cards:BreathingCardType[], index:number) => {
    cards.forEach((card:BreathingCardType, i:number) => {
      card.currentState = CardState.Deactivated
      if(i === index) card.currentState = CardState.Active
    })
  }
  const setInitialExerciseState = () => {
    const initialCardsInfo = [...cardsInfo]; 
    initialCardsInfo.forEach((card:BreathingCardType) => {
      card.currentState = CardState.Initial
    })
    setInitialCardsSeconds(initialCardsInfo, 0)
    setIsChronometerRunning(false);
    setCurrentRepetition(0); 
    setCurrentCardIndex(0); 
    return initialCardsInfo;
  };
  useEffect(() => {
    const initialCardsInfo = setInitialExerciseState();
    setCardsInfo(initialCardsInfo);
  }, [selectedExercise]);

  useEffect(() => {
    let subtractInterval: NodeJS.Timeout;

    const subtractCardSeconds = () => {
      setCardsInfo(prevCardsInfo => {
        let updatedCardsInfo = [...prevCardsInfo]; 
          if (currentCardIndex === cardsInfo.length - 1 && updatedCardsInfo[currentCardIndex].second === 0) {
            if (currentRepetition < selectedExercise.repeatTimes) {
              setCurrentCardIndex(0);
              setActiveCard(updatedCardsInfo, 0)
              setCurrentRepetition(prevRepetition => prevRepetition + 1);
              updatedCardsInfo = setInitialCardsSeconds(updatedCardsInfo, selectedExercise.incrementQuantityPerRepetition * (currentRepetition+1))
              updatedCardsInfo[0].second -= 1
            } else {
              setInitialExerciseState()
              return [...cardsInfo]; 
            }
          } else {
            if(updatedCardsInfo[currentCardIndex].second > 0) {
              if(currentRepetition === 0 && updatedCardsInfo[currentCardIndex].second === selectedExercise.inspiration && currentCardIndex === 0) setActiveCard(updatedCardsInfo, 0)
              updatedCardsInfo[currentCardIndex].second -= 1;
            }else {
              setActiveCard(updatedCardsInfo, currentCardIndex+1)
              updatedCardsInfo[currentCardIndex+1].second -= 1;
              setCurrentCardIndex(prevIndex => prevIndex + 1);
            }
          }
        return updatedCardsInfo;
      });
    };

    if (isChronometerRunning) {
      subtractInterval = setInterval(subtractCardSeconds, 1000);
    } else {
      setInitialExerciseState()
      clearInterval(subtractInterval); 
    }

    return () => clearInterval(subtractInterval); 
  }, [isChronometerRunning, currentCardIndex, currentRepetition]);

  return (
    <section id="cardsSection" className="cardsSection">
      {cardsInfo.map((card: BreathingCardType) => (
        <BreathingCard title={card.title} second={card.second} currentState={card.currentState} key={card.title} />
      ))}
    </section>
  );
};
