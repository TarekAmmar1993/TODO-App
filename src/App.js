
import './App.css';
import Sidebar from './Components/Sidebar';
import Main from './Components/Main';
import User from "./Components/User";
import AddNewTodo from "./Components/AddNewTodo";
import Calendar from "./Components/Calendar";
import Projects from "./Components/Projects";
import Todos from "./Components/Todos";
import EditTodo from "./Components/EditTodo";


function App() {
  return (
    <div className="App">
        <Sidebar>
            <User />
            <AddNewTodo />
            <Calendar />
            <Projects />
        </Sidebar>
        <Main>
            <Todos />
            <EditTodo />

        </Main>

    </div>
  );
}

export default App;
