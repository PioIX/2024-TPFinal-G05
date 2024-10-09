"use clients"
import styles from "./Texto.module.css"
import clsx from "clsx"
export default function Texto({text,variant}){
    return(
        <p className={clsx(styles.p,{
            [styles.title]: variant === 'title',
            [styles.h2]: variant === 'h2'
        })}>{text}</p>
    )
}