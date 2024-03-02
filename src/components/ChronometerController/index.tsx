import { cardsInfo as externalCardsInfo } from '../../lib/cardsInfo';
import { BreathingCard } from '../BreathingCard';
import { BreathingCardType } from '../../types/BreathingCardType';
import { ExercisesType } from '../../types/Exercises';
import { useEffect, useState } from 'react';

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
  }
  const setInitialExerciseState = () => {
    const initialCardsInfo = [...cardsInfo]; 
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
        const updatedCardsInfo = [...prevCardsInfo]; // Clonando para evitar mutações diretas
          if (currentCardIndex === cardsInfo.length - 1 && updatedCardsInfo[currentCardIndex].second === 1) {
            // Último card, verificar repetições
            if (currentRepetition < selectedExercise.repeatTimes) {
              // Reiniciar cronômetro
              setCurrentCardIndex(0);
              setInitialCardsSeconds(updatedCardsInfo, selectedExercise.incrementQuantityPerRepetition)
              setCurrentRepetition(prevRepetition => prevRepetition + 1);
              console.log(updatedCardsInfo)
            } else {
              // Parar cronômetro
              setInitialExerciseState()
              return [...cardsInfo]; // Retornar estado atual sem modificar
            }
          } else {
            if(updatedCardsInfo[currentCardIndex].second > 0) {
              updatedCardsInfo[currentCardIndex].second -= 1;
            }else {
              setCurrentCardIndex(prevIndex => prevIndex + 1);
              updatedCardsInfo[currentCardIndex+1].second -= 1;
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

    return () => clearInterval(subtractInterval); // Limpar intervalo quando o componente desmontar ou o cronômetro parar
  }, [isChronometerRunning, currentCardIndex, currentRepetition]);

  return (
    <>
      {cardsInfo.map((card: BreathingCardType) => (
        <BreathingCard title={card.title} second={card.second} key={card.title} />
      ))}
    </>
  );
};
