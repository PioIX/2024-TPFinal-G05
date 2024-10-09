"use client"

import Link from "next/link"
import styles from "./Icon.module.css"
import clsx from "clsx"

export default function Icon({onClick, srcImg, variant}) { //PEDIRLE A TINCHI LOS ICONOS //
    return(
        <button onClick={onClick} className={
                clsx(
                    {
                        [styles.IconMenu]:true,
                        [styles.IconChat]: variant == "chat",
                        [styles.IconSection]: variant == "section",
                    }
                )}>
            <img src={srcImg} ></img>
        </button>
    )   
}
// ESTAR ATENTOS A LOS CAMBIOS DE DISEÑO QUE SE NECESITEN HACER

// "use client"

// import Link from "next/link"
// import styles from "./Icon.module.css"
// import clsx from "clsx"

// export default function Icon({hrefIcon, srcImg}) {
//     return(
//         <Link href={hrefIcon}>
//             <img src={srcImg} className={styles.icon}></img>
//         </Link>
//     )
// }