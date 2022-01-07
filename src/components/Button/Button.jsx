import style from './Button.module.css'
import { buttonVariants } from "../../constants/buttonVariants.constants"

export function Button({ idx, handleClick, text, variant }) {

    return <button
        className={variant === buttonVariants.square ? style.square : null}
        key={idx} onClick={handleClick}>
        {text}
    </button>
}