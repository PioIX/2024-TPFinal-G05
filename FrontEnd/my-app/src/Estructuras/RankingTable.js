"use client"

export default function RankingTable({cadenaUsuarios}){
    return(
        <div>
            {cadenaUsuarios.map((usuario)=>(
                <div
                idUsuario={usuario.IdUsuario}
                username={usuario.Username}
                puntosUsuario={usuario.Puntos}
                ganaUsuario={usuario.partidasGanadas}
                empataUsuario={usuario.partidasEmpatadas}
                pierdeUsuario={usuario.partidasPerdidas}

                />
            
            ))}  
        </div>
            
    )
}

