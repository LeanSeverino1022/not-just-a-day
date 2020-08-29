import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import todosData from './data';
import HeaderButtons from './HeaderButtons';
import Pomodoro from './Pomodoro';
import { v4 as uuidv4 } from 'uuid';


const LOCAL_STORAGE_KEY = 'oneDayApp.todos';

function App() {
  const [todos, setTodos] = useState(todosData);

  const todoNameRef = useRef(null);

  //do once, when our component loads
  useEffect(_ => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (storedTodos) setTodos(storedTodos);

  }, [])

  //when something changes, do something
  useEffect(_ => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])


  function addTodoItem() {

    const name = todoNameRef.current.value.trim();
    if (name === '') return;

    setTodos(prevTodos => {
      return [...prevTodos, { name: name, id: uuidv4(), complete: false }];
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

  function triggerAddTodo(e) {
    //what would trigger the addTodoItem
    if (e.key === 'Enter') {
      addTodoItem();
    }
  }

  function clearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);

    setTodos(newTodos);
  }

  function renderLeftTodoText() {

    const leftTodo = todos.filter(todo => !todo.complete).length;

    return leftTodo ? leftTodo + ' left to do' : "All done! Great job!";
  }

  return (
    <>
      <div className="page-bg"></div>

      <div className="bg-green-600 h-screen flex flex-col">

        <div className="w-full">
          <HeaderButtons />
        </div>
        <div className="bg-gray-700 flex-grow flex">

          {/* column todolist */}
          <div className="w-1/4 flex-grow flex flex-col bg-green-500">
            <div className="border-2 p-4 flex-grow bg-white">
              <TodoList todos={todos} toggleTodo={toggleTodo} />
              <div className="flex mt-4 mb-8">
                <input onKeyUp={triggerAddTodo} className="border py-2 px-3 text-grey-dark mr-2 w-full" placeholder="What essential thing you need to do?" autoFocus={true} type='text' ref={todoNameRef} />
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={addTodoItem}>Add</button>
              </div>

              <div>{renderLeftTodoText()}  <button className="ml-4 bg-orange-500 hover:bg-orange-700 text-white font-bold px-1 rounded mr-2" onClick={clearTodos}>Clear Completed Todos</button></div>
            </div>
          </div>

          <div className="w-1/4 flex flex-col">
            <div className="border-white mr-1 mb-1 bg-primary" >
              <Pomodoro />
            </div>
            <div className="flex-grow border-white mr-1 mb-1 bg-secondary" ></div>
            <div className="flex-grow border-white mr-1 bg-primary" ></div>
          </div>

          <div className="w-1/4 flex flex-col">
            <div className="flex-grow border-white mb-1 bg-secondary" ></div>
            <div className="flex-grow border-white mb-1 bg-primary" ></div>
            <div className="flex-grow border-white bg-secondary" ></div>
          </div>

          {/* <div className="w-1/4 flex flex-col bg-gray-300"></div> */}

        </div>

      </div>




    </>
  )
}

export default App
