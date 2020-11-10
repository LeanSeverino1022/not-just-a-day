import React from 'react';
import Todo from './Todo.js'


export default function TodoList({ todos, toggleTodo }) {
    return (
        <div>
            <h1 className="text-center text-xl">My List</h1>
            <span className="block text-center text-sm mb-4">Drag and drop items to rearrange your list items into an order that makes sense to you. Focus on your top 3 priorities</span>
            {todos.map( (todo, idx) => {
                return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} order={idx} index={idx}/>
            })}
        </div>

    )
}
