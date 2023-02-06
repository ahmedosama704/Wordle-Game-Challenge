import React, { createContext, useState } from 'react';
export const AppContext = createContext();

export const MainProvider = ({ children }) => {
  const [keyBoardValue, setKeyBoardValue] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [gameState, setGameState] = useState('');
  const [resetGame, setResetGame] = useState('');

  return (
    <AppContext.Provider
      value={{
        keyBoardValue,
        setKeyBoardValue,
        difficulty,
        setDifficulty,
        gameState,
        setGameState,
        resetGame,
        setResetGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const { Consumer } = AppContext;
