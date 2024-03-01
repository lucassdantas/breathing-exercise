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
  
  const setInitialExerciseState = () => {
    const initialCardsInfo = [...cardsInfo]; 
    for (let i = 0; i < initialCardsInfo.length; i++) {
      if (i === 0) initialCardsInfo[i].second = selectedExercise.inspiration;
      if (i === 1) initialCardsInfo[i].second = selectedExercise.holdRespiration;
      if (i === 2) initialCardsInfo[i].second = selectedExercise.expiration;
      // if (i > 2) Set custom exercises on the future
    }
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
        if (updatedCardsInfo[currentCardIndex].second > 0) {
          console.log(cardsInfo[currentCardIndex].second)
          updatedCardsInfo[currentCardIndex].second -= 1;
        } else {
          if (currentCardIndex === cardsInfo.length - 1) {
            // Último card, verificar repetições
            if (currentRepetition < selectedExercise.repeatTimes) {
              // Reiniciar cronômetro
              setCurrentCardIndex(0);
              setInitialExerciseState()
              setCurrentRepetition(prevRepetition => prevRepetition + 1);
            } else {
              // Parar cronômetro
              setIsChronometerRunning(false);
              setCurrentRepetition(0); // Reiniciar contagem de repetições
              setCurrentCardIndex(0); // Reiniciar contagem de cards
              return [...cardsInfo]; // Retornar estado atual sem modificar
            }
          } else {
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
