import type { NextPage } from 'next'
import { useEffect, useState, useContext, useRef } from 'react'
import axios from 'axios'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import GameInputs from './../components/GameInputs/gameInputs';
import { AppContext } from '../context/AppContext'
import Confetti from "react-confetti";
const WORD_LIST_API_URL = '/api/words/'

const Home: NextPage = () => {
  const { setKeyBoardValue, keyBoardValue, difficulty, setDifficulty, gameState, resetGame, setResetGame } = useContext(AppContext)
  const [wordsList, setWordsList] = useState<any[]>([]);
  const [gameWord, setGameWord] = useState<string>('');
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const confetiRef: any = useRef(null);

  useEffect(() => {
    // get window Height & Width 
    setHeight(confetiRef.current.clientHeight);
    setWidth(confetiRef.current.clientWidth);

    // fetch words APIs
    axios.get(WORD_LIST_API_URL).then((res) => {
      const data = res.data;
      setWordsList(data);
      const randomeSorting = data[Math.floor(Math.random() * data.length)];
      setGameWord(randomeSorting.toLowerCase());
    }).catch((err) => {
      console.log("err", err);
    })
  }, [])

  useEffect(() => {
    const randomeSorting = wordsList[Math.floor(Math.random() * wordsList.length)];
    if (randomeSorting) {
      setGameWord(randomeSorting.toLowerCase());
    }
  }, [resetGame])


  const onKeyPress = (button: string) => {
    console.log('button :', button);
    if (button == keyBoardValue) {
      setKeyBoardValue('');
    }
    setKeyBoardValue(button)
  }
  return <div className="main" ref={confetiRef}>
    {difficulty.length === 0 ? (
      <div className='chooseLevel'>
        <div className='left'>
          <img src='/images/game.svg' />
        </div>
        <div className='right'>
          <h1> Choose Difficulty </h1>
          <button onClick={() => setDifficulty("beginner")}> Beginner  </button>
          <button onClick={() => setDifficulty("intermediate")}> Intermediate  </button>
          <button onClick={() => setDifficulty("expert")}> Expert   </button>
        </div>
      </div>
    ) : (
      <>
        {gameState == "success" && <Confetti numberOfPieces={150} width={width} height={height} />}
        <h1> You are now on {difficulty}  level</h1>
        <GameInputs gameWord={gameWord} />
        <div className="keyboard">
          <Keyboard
            onKeyPress={onKeyPress}
            layout={{
              'default': [
                'q w e r t y u i o p',
                'a s d f g h j k l',
                'z x c v b n m',
              ]
            }}
          />
        </div>
        {resetGame == "show" &&
          <div className='playAgain'>
            <button onClick={() => { setResetGame("reset"); }}> Play Again  </button>
            <button onClick={() => setDifficulty("")}> Change Difficulty  </button>
          </div>
        }
      </>
    )}
  </div>
}

export default Home
