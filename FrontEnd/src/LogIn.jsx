import { Link, useNavigate } from "react-router-dom";
import './style/LogIn.css'
import { useState } from "react";
import UserProfesor from './pages/UserProfesor.jsx'

export default function Login() {
   // const handleClick = () => { alert('Ingresa un usuario y contraseña válido')}
   // <button type="submit" onClick={handleClick}>Ingresar</button>
   let navegar = useNavigate();

   let [isLogin, setLogin] = useState(false);

   function sesionIn() {
        setLogin(true);
        navegar('/profesor/:id')
   }

   function sesionOut() {
        setLogin(false);
        navegar('/acceder');
   }

   if (isLogin) {
        return(
            <>
                <UserProfesor/>
            </>
        )
   }else{

        return ( 
            <>
            <div className="log">
                        <Link to="/"><h1>Educatio<img src="public/silhouette-of-a-purple-graduation-cap-editable-flat-icon-design-in-eps10-format-simple-unique-elegant-and-cute-free-vector-fotor-bg-remover-20240924164229.png" width="70px" height="70px"/></h1></Link>
                        <form>
                            <p>
                            <input type="text" placeholder="Introduzca su usuario" required/></p>
        
                            <p>
                            <input type="password" placeholder="Contraseña" required/></p>
                            <button onClick={sesionIn} type="submit">Ingresar</button>
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
 