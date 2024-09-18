"use clients"
import styles from "./title.module.css"
export default function Title({text}){
    return(
        <h1 className={styles.title}>{text}</h1>
    )
}