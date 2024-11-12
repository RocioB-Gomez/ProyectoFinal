import { Component } from "react";

class Calificaciones extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <>
                <div className="card">
                    <div className="card-header">
                        Calificaciones
                    </div>
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">Materia</th>
                                <th scope="col">1er. Trimestre</th>
                                <th scope="col">2do. Trimestre</th>
                                <th scope="col">3er. Trimestre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">Matemática</th>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                </tr>
                                <tr>
                                <th scope="row">Lengua</th>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                </tr>
                                <tr>
                                <th scope="row">Cs. Sociales</th>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                </tr>
                                <tr>
                                <th scope="row">Cs. Naturales</th>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                </tr>
                                <tr>
                                <th scope="row">Educación Física</th>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                </tr>
                                <tr>
                                <th scope="row">Música</th>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                </tr>
                            </tbody>
                        </table>
                        </blockquote>
                    </div>
                </div>
            </>
         );
    }
}
 
export default Calificaciones;