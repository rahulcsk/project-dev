import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Todo from '../Components/Todo/Todo';
import TodoShow from '../Components/TodoList/TodoList';
import EditTodo from '../Components/EditTodo/EditTodo';
export default function Rout(){
  
    
    
    return(
        <>
        <Router>
            <Routes>
            <Route path="/todo" element={<Todo/>}/>
            <Route path="/todoshow" element={<TodoShow/>}/>
            <Route path="/edittodo" element={<EditTodo/>}/>
            </Routes>
        </Router>
        </>
    )

}
