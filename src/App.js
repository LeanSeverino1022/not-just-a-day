import React, { useState, useRef, useEffect } from 'react';
import todosData from './data';

// widgets
import TodoList from './TodoList';
import HeaderWidgets from './HeaderWidgets';
import Pomodoro from './Pomodoro';


import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// import images
//todo: optimize shuffle images stuff later
//todo: add to a different component image shuffler
import imageFam0 from './assets/images/dashboard_slide/img_0.jpg';
import imageFam1 from './assets/images/dashboard_slide/img_1.jpg';
import imageFam2 from './assets/images/dashboard_slide/img_2.jpg';
import imageFam3 from './assets/images/dashboard_slide/img_3.jpg';

import imageFam4 from './assets/images/dashboard_slide/img_4.jpg';
import imageFam5 from './assets/images/dashboard_slide/img_5.jpg';
import imageFam6 from './assets/images/dashboard_slide/img_6.jpg';
import imageFam7 from './assets/images/dashboard_slide/img_7.jpg';

import imageFam8 from './assets/images/dashboard_slide/img_8.jpg';
import imageFam9 from './assets/images/dashboard_slide/img_9.jpg';
import imageFam10 from './assets/images/dashboard_slide/img_10.jpg';


import imageKobe from './assets/images/mamba-out.jpg';
import imageMaki from './assets/images/maki-me.jpg';


//Get the right things done. Eliminate the noise

const LOCAL_STORAGE_KEY = 'oneDayApp.todos';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function App() {
  //set todos from data.js
  const [todos, setTodos] = useState(todosData);

  //image shuffler
  const [slideImgs, setSlideImg] =  useState([imageFam0, imageFam1, imageFam2, imageFam3, imageFam4, imageFam5, imageFam6, imageFam7, imageFam8,imageFam9,imageFam10]);
  const [slideIndex, setSlideIndex] = useState(0);


  const todoNameRef = useRef(null);

  //do once, when our component loads
  //set storedTodos data from local storage if it exists
  useEffect(_ => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    //if we have todos in our localstorage then use it to replace todosData we set initially
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

  // DND
  function onDragEnd(result) {

    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const new_todos = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    setTodos( new_todos );
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

  function showNextImage() {


    if(slideIndex < slideImgs.length - 1) {
      setSlideIndex(slideIndex + 1)
    } else {
      setSlideIndex(0);
    }

  }

  // function ()

  return (
    <>

      <div className="wrapper h-screen flex flex-col">

        {/* top row */}
        <div className="w-full">
          <HeaderWidgets />
        </div>


        <main className="flex-grow flex dashboard">

          {/* column 1 todolist */}
          <div className="dashboard-col flex flex-col todos-widget">
            <div className="border-2 p-4 flex-grow todos-widget-wrapper">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                  {(provided) => (
                    <div style={{border:"red 2px solid"}} ref={provided.innerRef} {...provided.droppableProps}>
                      <TodoList todos={todos} toggleTodo={toggleTodo} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <div className="flex mt-4 mb-8">
                <input onKeyUp={triggerAddTodo} className="border py-2 px-3 text-grey-dark mr-2 w-full" placeholder="What essential thing you need to do?" autoFocus={true} type='text' ref={todoNameRef} />
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={addTodoItem}>Add</button>
              </div>

              <div>{renderLeftTodoText()}  <button className="ml-4 bg-orange-500 hover:bg-orange-700 text-white font-bold px-1 rounded mr-2" onClick={clearTodos}>Clear Completed Todos</button></div>
            </div>
          </div>

          {/* column 2 */}
          <div className="dashboard-col flex flex-col">

            {/* row pomodor */}
            <div className="row flex flex-col justify-center border-white" style={{ background: "rgb(32 9 77)" }} >
              <Pomodoro />
            </div>
            
            {/* row image shuff */}
            <div className="row flex-grow border  border-white" >
              <div class="flex flex-col" style={{height: '100%'}}>
                {/* todo... make a component */}
                <img class="slide-img flex-grow" alt="fam img" src={slideImgs[slideIndex]}/>
                <div className="text-center my-2"> <button className="py-1 px-3 border" onClick={showNextImage}>Next</button></div>
              </div>
            </div>

          </div>

          <div className="dashboard-col flex flex-col">
            <div className="flex-grow border border-white mb-1 flex justify-center items-center">
              <p>Get that<br/><span className="text-6xl two-hundred-text">200</span></p>
            </div>
            <div className="border border-white mb-1 kobe-widget">
            <iframe src="https://www.youtube.com/embed/p5gnsAYLFMk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className="flex-grow border border-white maki-widget">
              {/* <span class="msg text-white font-bold">FOR U WHO WAS ALWAYS THERE FOR ME.. EVEN WHEN IT WASN'T EASY.</span> */}
            </div>
          </div>

          {/* <div className="w-1/4 flex flex-col bg-gray-300"></div> */}

        </main>

      </div>
    </>
  )
}

export default App
