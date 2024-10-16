"use clients"
import styles from "./Texto.module.css"
import clsx from "clsx"
export default function Texto({text,variant}){
    return(
        <p className={clsx({
            [styles.title]: variant === 'title',
            [styles.h2]: variant === 'h2',
            [styles.p]: variant === 'p',
            [styles.error]: variant === 'error'
        })}>{text}</p>
    )
}