import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import todosData from './data';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'oneDayApp.todos';

function App () {
  const [todos, setTodos] = useState(todosData);

  const todoNameRef = useRef(null);

  //do once, when our component loads
  useEffect(_=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (storedTodos) setTodos(storedTodos);
  }, [])

  //when something changes, do something
  useEffect(_=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  function addTodoItem () {

    const name = todoNameRef.current.value.trim();
    if (name === '') return;

    setTodos(prevTodos => {
        return [...prevTodos, { name: name, id:uuidv4 (), complete:false}];
    });
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function clearTodos () {
    setTodos([]);
  }

  return (
    <React.Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input type='text' ref={todoNameRef} />
      <button onClick={addTodoItem}>Add Todo</button>
      <button onClick={clearTodos}>Clear Completed Todos</button>
      <div>0 left to do</div>
    </React.Fragment>
  )
}

export default App
