import { Component } from "react";
import Actions from "./Actions";

class ListaAlumnos extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <>
            
            <>  
                <div className="listaAlumnos">
                <h4>4 "B" Humanidades</h4>
                <h5>Matemática</h5>
                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Alumno</th>
                                <th scope="col">Foto</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Nota 1</th>
                                <th scope="col">Nota 2</th>
                                <th scope="col">Nota 3</th>
                                <th scope="col">Nota 4</th>
                                <th scope="col">Promedio</th>
                                <th scope="col">Recuperatorio</th>
                                <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td><Actions/></td>
                                </tr>
                                <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td><Actions/></td>
                                </tr>
                                <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td><Actions/></td>
                                </tr>
                                <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td><Actions/></td>
                                </tr>
                                <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td><Actions/></td>
                                </tr>
                                <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td><Actions/></td>
                                </tr>
                            </tbody>
                        </table>
                        </blockquote>
                    </div>
                </div>
                </div>
            </>
            
            </>
         );
    }
}
 
export default ListaAlumnos;