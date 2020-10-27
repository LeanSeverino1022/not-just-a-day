import React from 'react';
import Todo from './Todo.js'


export default function TodoList({ todos, toggleTodo }) {
    return (
        <div>
            {todos.map( (todo, idx) => {
                return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} order={idx} index={idx}/>
            })}
        </div>

    )
}
