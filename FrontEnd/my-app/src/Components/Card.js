import styles from "./Card.module.css"
export default function Card(src) {
    return (
        <div className={styles.carta}>
            <div>
                <img className={styles.img} 
                src="/images/fondoPagInicial.png"
                alt="imagen"
                >
                </img>
            </div>
            <div>
                <h1 className={styles.titulo}>Título</h1>
            </div>
            <div>
                <div></div>
            </div>
        </div>
    )
}