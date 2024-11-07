"use clients"
import styles from "./Texto.module.css"
import clsx from "clsx"
export default function Texto({text,variant}){
    return(
        <p className={clsx({
            [styles.title]: variant === 'title',
            [styles.NavTitle]: variant === 'NavTitle',
            [styles.h2]: variant === 'h2',
            [styles.p]: variant === 'p',
            [styles.pChico]: variant === 'pChico',
            [styles.error]: variant === 'error'
        })}>{text}</p>
    )
}