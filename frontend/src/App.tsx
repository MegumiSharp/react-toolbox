import './App.css'
import {Link} from "react-router-dom";



function App() {
  return (
    <>
      <div>
        hello world
        <Link to={"/todolist"}><button>Todo list</button></Link>
        <Link to={"/colorpicker"}><button>ColorPicker</button></Link>
      </div>
    </> 
  )
}

export default App
