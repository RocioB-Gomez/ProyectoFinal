import { Component } from "react";

class Temario extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <>
                <div className="Temario">
                    <h4>Temario</h4>
                    <ol className="list-group list-group-numbered">
                        <li className="list-group-item">Temario Matemática-4B_humanidades</li>
                        <li className="list-group-item">Temario Matemática-5B_economia</li>
                        <li className="list-group-item">Temario Matemática-3A_humanidades</li>
                    </ol>
                </div>
            </>
         );
    }
}
 
export default Temario;