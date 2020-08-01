import React, { useState, useRef } from 'react';
import TodoList from './TodoList';
import todosData from './data';
import { v4 as uuidv4 } from 'uuid';

function App () {
  const [todos, setTodos] = useState(todosData)
  const todoNameRef = useRef(null)

  function addTodoItem () {

    const name = todoNameRef.current.value
    if (name === '') return;

    setTodos(prevTodos => {

      var newTodos = prevTodos.concat({ name: "gago", id:10, complete:false})
      return newTodos;
    });


  }

  return (
    <React.Fragment>
      <TodoList todos={todos} />
      <input type='text' ref={todoNameRef} />
      <button onClick={addTodoItem}>Add Todo</button>
      <button>Clear Completed Todos</button>
      <div>0 left to do</div>
    </React.Fragment>
  )
}

export default App
