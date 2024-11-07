import { Link, useParams } from 'react-router-dom';
import '../style/UserPage.css'
import modificar from '/update.png'
import eliminar from '/delete.png'



export default function Actions({ alumno_id }) {

    return (
        <>
            <div className="bottoms">

                <Link to={`/acceder/alumno/edit/${alumno_id}`} className='bot bot2'>
                    <img src={modificar} alt="Modificar" width="25" height="25" />
                    <span className="material-symbols-outlined"></span>
                </Link>

                <Link to={`/alumno/delete/${alumno_id}`} className='bot bot2'>
                    <img src={eliminar} alt="Modificar" width="25" height="25" />
                    <span className="material-symbols-outlined"></span>
                </Link>
            </div>
        </>
    );

}


export function AlumnoEdit() {

    const { alumno_id } = useParams();

    return (
        <>
            <h1>Fromulario para editar el alumno con ID: {alumno_id}</h1>
        </>
    );



}

