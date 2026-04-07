import ToDoList from "../../components/ToDoListComponent/ToDoList"
import Header from "../../components/HeaderComponent/Header";
import Footer from "../../components/FooterComponent/Footer";

function ToDoListPage(){
    return(
        <div className="body_container">
            <Header title="To-Do List Tool"/>
            <ToDoList/>
            <Footer/>
        </div>
    )
}

export default ToDoListPage