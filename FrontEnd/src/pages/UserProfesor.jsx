import { useParams } from "react-router-dom"
import GoOut from "../GoOut"
import Perfil from "./Perfil"
import '../style/UserPage.css'
import Inasistencias from "./Inasistencias"
import Calificaciones from "./Calificaciones"
import ListaAlumnos from "./ListaAlumnos"
import Temario from "./Temario"



export default function UserPage() {

    const params = useParams()
/*
useEfect(){
traer_datos_usaurio
}
useEfect(){
traer_datos_Inscripcion
}
useEfect(){
traer_datos_tutor
}


*/
    return(
        <>
            <div className="MenLeft">
            <h3>Bienvenido {params.id}</h3>
            <div className="out">
                <GoOut/>
            </div>
                    <div className="row view-perfil">
                        <div className="col-4 cont-perfil">
                            <div className="list-group list-perfil" id="list-tab" role="tablist">
                                <a className="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Lista de Alumnos</a>
                                <a className="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">Temario</a>
                                <a className="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Actividades</a>
                            </div>
                            <div className="col-8 desc-perfil">
                                <div className="tab-content content-perfil" id="nav-tabContent">
                                    <div className="tab-perfil tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list"><ListaAlumnos/></div>
                                    <div className="tab-perfil tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list"><Temario/></div>
                                    <div className="tab-perfil tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">Actividades</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        </>
    )
    
}
