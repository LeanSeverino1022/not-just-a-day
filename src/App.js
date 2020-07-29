import React, {useState} from 'react';
import TodoList from './TodoList';
import todosData from './data';



function App() {
  const [todos, setTodos] = useState(todosData);

  return (
    <React.Fragment>
      <TodoList todos={todos} />
      <input type="text" />
      <button>Add Todo</button>
      <button>Clear Completed Todos</button>
      <div>0 left to do</div>
    </React.Fragment>

  );
}

export default App;
