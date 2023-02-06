/* eslint-disable react/jsx-key */
import React, { useState, useRef, useContext } from 'react'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
interface PropsType {
    rowIndex?: number;
    disableRow?: boolean;
    setGameInputs?: any;
    gameWord?: string | any;
    wordArray?: [] | any;
    activeRow: number;
    setActiveRow: any;
    setGameState?: any;
    difficulty?: string;
}
type RowInputs = {
    input0: string;
    input1: string;
    input2: string;
    input3: string;
    input4: string;
}

function InputFields(props: PropsType) {
    const { rowIndex, disableRow, setGameInputs, gameWord, wordArray, activeRow, setActiveRow } = props;
    const { keyBoardValue, difficulty, setGameState, resetGame, setResetGame } = useContext(AppContext)
    const [inputValue, setInputValue] = useState<RowInputs>({
        input0: '',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
    });
    const inputRef0: any = useRef(null);
    const inputRef1: any = useRef(null);
    const inputRef2: any = useRef(null);
    const inputRef3: any = useRef(null);
    const inputRef4: any = useRef(null);

    // update inputs using virtual keyboard 
    useEffect(() => {
        console.log('keyBoardValue :', keyBoardValue);
        if (document.activeElement === inputRef0.current) {
            setInputValue({ ...inputValue, input0: keyBoardValue });
            setTimeout(() => {
                inputRef1.current.focus()
            }, 500)
        }
        if (document.activeElement === inputRef1.current) {
            setInputValue({ ...inputValue, input1: keyBoardValue });
            setTimeout(() => {
                inputRef2.current.focus()
            }, 500)
        }
        if (document.activeElement === inputRef2.current) {
            setInputValue({ ...inputValue, input2: keyBoardValue });
            setTimeout(() => {
                inputRef3.current.focus()
            }, 500)
        }
        if (document.activeElement === inputRef3.current) {
            setInputValue({ ...inputValue, input3: keyBoardValue });
            setTimeout(() => {
                inputRef4.current.focus()
            }, 500)
        }
        if (document.activeElement === inputRef4.current) {
            setInputValue({ ...inputValue, input4: keyBoardValue });
        }

    }, [keyBoardValue])

    console.log('keyBoardValue 2222222:', keyBoardValue);
    // validate input data  
    useEffect(() => {
        if (rowIndex === activeRow) {
            if (inputValue.input0.length === 1 && inputValue.input1.length === 1 && inputValue.input2.length === 1 && inputValue.input3.length === 1 && inputValue.input4.length === 1) {
                const answer = inputValue.input0 + inputValue.input1 + inputValue.input2 + inputValue.input3 + inputValue.input4;
                textValidation();
                if (answer == gameWord) {
                    setGameState("success");
                    setResetGame("show")
                } else {
                    if (activeRow < 4) {
                        setActiveRow(activeRow + 1);
                    } else {
                        setGameState("fail")
                        setResetGame("show")
                    }
                }
            }
        }
    }, [inputValue])

    // check letters position 
    const textValidation = () => {
        // validate first letter 
        if (gameWord.includes(inputValue.input0)) {
            if (inputValue.input0 == wordArray[0]) {
                inputRef0.current.className = "tile correct"
            } else {
                inputRef0.current.className = "tile close"
            }
        } else {
            inputRef0.current.className = "tile incorrect"
        }
        // validate second letter 
        if (gameWord.includes(inputValue.input1)) {
            if (inputValue.input1 == wordArray[1]) {
                inputRef1.current.className = "tile correct"
            } else {
                inputRef1.current.className = "tile close"
            }
        } else {
            inputRef1.current.className = "tile incorrect"
        }
        // validate third letter 
        if (gameWord.includes(inputValue.input2)) {
            if (inputValue.input2 == wordArray[2]) {
                inputRef2.current.className = "tile correct"

            } else {
                inputRef2.current.className = "tile close"

            }
        } else {
            inputRef2.current.className = "tile incorrect"

        }
        // validate forth letter 
        if (gameWord.includes(inputValue.input3)) {
            if (inputValue.input3 == wordArray[3]) {
                inputRef3.current.className = "tile correct"

            } else {
                inputRef3.current.className = "tile close"

            }
        } else {
            inputRef3.current.className = "tile incorrect"

        }
        // validate fifth letter 
        if (gameWord.includes(inputValue.input4)) {
            if (inputValue.input4 == wordArray[4]) {
                inputRef4.current.className = "tile correct"

            } else {
                inputRef4.current.className = "tile close"

            }
        } else {
            inputRef4.current.className = "tile incorrect"

        }
    }

    // check game difficulty 
    const checkDifficulty = () => {
        setInputValue({
            input0: "",
            input1: "",
            input2: "",
            input3: "",
            input4: "",
        });
        inputRef0.current.className = "tile"
        inputRef1.current.className = "tile"
        inputRef2.current.className = "tile"
        inputRef3.current.className = "tile"
        inputRef4.current.className = "tile"
        if (difficulty == "beginner") {
            const randomeSorting = wordArray.sort(() => .5 - Math.random());
            if (rowIndex == 0) {
                setInputValue({
                    input0: randomeSorting[0],
                    input1: randomeSorting[1],
                    input2: randomeSorting[2],
                    input3: randomeSorting[3],
                    input4: randomeSorting[4],
                });
                textValidation();
                setActiveRow(1);
            }

        } else if (difficulty == "intermediate") {
            if (rowIndex == 0) {
                setInputValue({
                    input0: wordArray[0],
                    input1: wordArray[1],
                    input2: "",
                    input3: "",
                    input4: "",
                });
                inputRef0.current.className = "tile"
                inputRef1.current.className = "tile"
                inputRef2.current.className = "tile"
                inputRef3.current.className = "tile"
                inputRef4.current.className = "tile"
                setActiveRow(0);
            }
        }
    }
    useEffect(() => {
        checkDifficulty();
    }, [difficulty])

    // Reset Game 
    useEffect(() => {
        if (resetGame !== "show") {
            if (difficulty == "expert") {
                setInputValue({
                    input0: "",
                    input1: "",
                    input2: "",
                    input3: "",
                    input4: "",
                });
                inputRef0.current.className = "tile"
                inputRef1.current.className = "tile"
                inputRef2.current.className = "tile"
                inputRef3.current.className = "tile"
                inputRef4.current.className = "tile"
                setGameState("");
                setActiveRow(0);
            } else {
                setGameState("");
                checkDifficulty();
            }
        }
    }, [resetGame, gameWord])

    console.log("gameWord", gameWord);

    return (
        <div className="line">
            <input className={`tile`} ref={inputRef0} maxLength={1} type="text" name={"input0"} value={inputValue.input0} onChange={(e) => setInputValue({ ...inputValue, input0: e.target.value.toLocaleLowerCase() })} disabled={disableRow} />
            <input className={`tile`} ref={inputRef1} maxLength={1} type="text" name={"input1"} value={inputValue.input1} onChange={(e) => setInputValue({ ...inputValue, input1: e.target.value.toLocaleLowerCase() })} disabled={disableRow} />
            <input className={`tile`} ref={inputRef2} maxLength={1} type="text" name={"input2"} value={inputValue.input2} onChange={(e) => setInputValue({ ...inputValue, input2: e.target.value.toLocaleLowerCase() })} disabled={disableRow} />
            <input className={`tile`} ref={inputRef3} maxLength={1} type="text" name={"input3"} value={inputValue.input3} onChange={(e) => setInputValue({ ...inputValue, input3: e.target.value.toLocaleLowerCase() })} disabled={disableRow} />
            <input className={`tile`} ref={inputRef4} maxLength={1} type="text" name={"input4"} value={inputValue.input4} onChange={(e) => setInputValue({ ...inputValue, input4: e.target.value.toLocaleLowerCase() })} disabled={disableRow} />
        </div>
    )
}

export default InputFields