import ToDoList from "../../components/ToDoListComponent/ToDoList"
import {Link} from "react-router-dom";


function ToDoListPage(){
    return(
        <>
            <Link to="/"><button>Torna indietro</button></Link>
            <ToDoList/>
        </>
        
    )
}

export default ToDoListPage