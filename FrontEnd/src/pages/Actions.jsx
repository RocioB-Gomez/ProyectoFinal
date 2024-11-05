import { Component } from "react";
import '../style/UserPage.css'

class Actions extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <>
                <div className="bottoms">
                    <div className="bot bot1"><a href="#" title="Crear"><img src="/create.png" width="25" height="25"/></a></div>
                    <div className="bot bot2"><a href="#" title="Modificar"><img src="/update.png" width="25" height="25"/></a></div>
                    <div className="bot bot1"><a href="#" title="Eliminar"><img src="/delete.png" width="25" height="25"/></a></div>
                </div>
            </>
         );
    }
}
 
export default Actions;