"use clients"
import styles from "./button.module.css"
import clsx from "clsx"
export default function Button({text,onClick,variant}){
    return(
        <button className={clsx(styles.button, {

            [styles.jugar]: variant === 'jugar',
            [styles.normal]: variant === 'normal'
            
        })} onClick={onClick}>{text}</button>
    )
}