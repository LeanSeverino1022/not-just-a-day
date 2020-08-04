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

    todoNameRef.current.value = '';
    todoNameRef.current.focus();
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function clearTodos () {
    const newTodos = todos.filter(todo => !todo.complete);

    setTodos( newTodos );
  }

  function renderLeftTodoText() {

    const leftTodo = todos.filter( todo => !todo.complete).length;

    return leftTodo ? leftTodo + ' left to do' : "All done! Great job!";
  }

  return (
    <React.Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input autofocus="true" type='text' ref={todoNameRef} />
      <button onClick={addTodoItem}>Add Todo</button>
      <button onClick={clearTodos}>Clear Completed Todos</button>
      <div>{renderLeftTodoText()}</div>
    </React.Fragment>
  )
}

export default App
