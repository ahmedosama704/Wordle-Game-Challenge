/* eslint-disable react/jsx-key */
import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import InputFields from '../InputFields/InputFields';

interface Props {
    inputChange?: string;
    gameWord?: string | any;
}

function GameInputs(props: Props) {
    const { gameWord } = props;
    const wordArray = [...gameWord];
    const [activeRow, setActiveRow] = useState(0);
    const [gameInputs, setGameInputs] = useState([
        {
            input0: '',
            input1: '',
            input2: '',
            input3: '',
            input4: '',
        }, {
            input0: '',
            input1: '',
            input2: '',
            input3: '',
            input4: '',
        }, {
            input0: '',
            input1: '',
            input2: '',
            input3: '',
            input4: '',
        }, {
            input0: '',
            input1: '',
            input2: '',
            input3: '',
            input4: '',
        }, {
            input0: '',
            input1: '',
            input2: '',
            input3: '',
            input4: '',
        },
    ]);

    // console.log('gameWord :', questionLetters);
    const [answer, setAnswer] = useState('');
    useEffect(() => {
    }, [])
    return (
        <div>
            <div className="board">
                {gameInputs.map((obj, index) => {
                    const disableRow: boolean = gameInputs[index].input4.length == 0 && index !== activeRow ? true : false
                    return (
                        <InputFields key={index} rowIndex={index} activeRow={activeRow} setActiveRow={setActiveRow} disableRow={disableRow} setGameInputs={setGameInputs} gameWord={gameWord} wordArray={wordArray} />
                    )
                })}
            </div>
        </div>
    )
}

export default GameInputs
