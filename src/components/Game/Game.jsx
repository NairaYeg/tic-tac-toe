import { useState, useEffect } from "react";
import { calculateWinner } from "../../helpers/calculateWinner";
import { Button } from "../Button/Button";
import styles from './Game.module.css'
import { Board } from "../Board/Board";
import { values } from "../../constants/values.constants";

export function Game() {
    const [square, setSquare] = useState(Array(9).fill(null));
    const [history, setHistory] = useState([]);
    const [draw, setDraw] = useState(false);
    const [count, setCount] = useState(-1);
    const [isNextX, setisNextX] = useState(true);
    const [winner, setWinner] = useState(null);
    const value = isNextX ? values.X : values[0];

    const handleButtonClick = (idx) => {
        if (winner || square[idx]) return;
        const tmp = [...square];
        tmp[idx] = value;
        setSquare(tmp);

        const newHistory = history.slice(0, count + 1);
        setHistory([...newHistory, { idx, value: value }]);

        setCount(count + 1);
        setisNextX(!isNextX);
    };

    useEffect(() => {
        setWinner(calculateWinner(square));
        const isNotNull = square.every((i) => i !== null);
        setDraw(isNotNull && !winner);
    }, [square, winner]);

    const handleHistoryClick = (index) => {
        let newSquare = Array(9).fill(null);
        for (let i = 0; i <= index; i++) {
            const { idx, value } = history[i];
            newSquare[idx] = value;
        }
        setCount(index);
        setSquare(newSquare);
    };

    const handleResetGame = () => {
        handleHistoryClick(-1);
        setHistory([]);
    };

    return (
        <div className={styles.container}>
            <div>
                <h2>Tic Tac Toe Game</h2>
                <h4 className={styles.userMessage}>
                    {(draw && "Draw") || (winner && `Winner is ${winner}`) || ""}
                </h4>
                <Board squares={square} handleSquareClick={handleButtonClick} />
                <div>
                    <button onClick={handleResetGame}>Reset</button>
                </div>
                <div className={styles.historyWrapper}>
                    {history.map((_, idx) => {
                        return (
                            <Button
                                key={idx}
                                handleClick={() => handleHistoryClick(idx)}
                                text={`Go to the move#${idx + 1}`}
                            />
                        );
                    })}
                </div>
                <p>Next player: {value}</p>
            </div>
        </div>
    )
}