import { Button } from "../Button/Button";
import styles from './Board.module.css'
import {
    buttonVariants
} from "../../constants/buttonVariants.constants";

export function Board({ squares, handleSquareClick }) {

    return <div className={styles.boardWrapper}>
        {squares.map((i, idx) => {
            return (
                <Button
                    key={idx}
                    idx={idx}
                    handleClick={() => handleSquareClick(idx)}
                    text={i}
                    variant={buttonVariants.square}
                />
            );
        })}
    </div>

}