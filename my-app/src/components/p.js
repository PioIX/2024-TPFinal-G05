"use clients"
import styles from "./p.module.css"
import clsx from "clsx"
export default function P({text,variant}){
    return(
        <p className={clsx(styles.p,{
            [styles.title]: variant === 'title',
            [styles.h2]: variant === 'h2'
        })}>{text}</p>
    )
}