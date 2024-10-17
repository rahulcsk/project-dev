import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import Todo from './Components/Todo/Todo';
import TodoShow from './Components/TodoList/TodoList';
function App() {
  return (
    <>
      <Provider store={store}>
        <Todo />
        <TodoShow />
      </Provider>
    </>
  );
}

export default App;
