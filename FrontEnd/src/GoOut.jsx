import { useNavigate } from "react-router-dom"



export default function GoOut() {

    const Navigate = useNavigate()

    const HandleClick = () => {
        Navigate('/acceder')
    }
    return(
        <>
        <button onClick={HandleClick}>Cerrar Sesión</button>
    </>
    )
}