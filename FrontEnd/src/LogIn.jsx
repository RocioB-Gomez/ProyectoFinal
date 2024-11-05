import { Component } from "react";
import { Link } from "react-router-dom";
import './style/LogIn.css'

class LogIn extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <>
            <div className="log">
                        <Link to="/"><h1>Educatio<img src="public/silhouette-of-a-purple-graduation-cap-editable-flat-icon-design-in-eps10-format-simple-unique-elegant-and-cute-free-vector-fotor-bg-remover-20240924164229.png" width="70px" height="70px"/></h1></Link>
                        <form>
                            <p>
                            <input type="text" placeholder="Introduzca su usuario"/></p>
        
                            <p>
                            <input type="password" placeholder="Contraseña"/></p>
                            <button type="submit">Ingresar</button>
                            <a className="in" href="#">¿Te olvidaste tu contraseña?</a>
                            <p className="quest">¿No tenés cuenta?<a href="registro.html"> Crear Cuenta</a></p>
                            <button type="submit">Iniciar sesión con Gmail</button>
                            <button type="submit">Iniciar sesión con Facebook</button>
                        </form>
                    </div>
            </>
         );
    }
}
 
export default LogIn;