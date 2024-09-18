"use clients"
import Button from "./components/button";
import Title from "./components/title";
import styles from "./page.module.css"

export default function Home(){
    return(
        <main className={styles.main}>
            <div>
                <Title text="Futbolitos"/>
            </div>
            <div>
                <Button text="Guia"/>
                <Button text="Ranking"/>
                <Button text="JUGAR"/>
            </div>
        </main>
    )
}