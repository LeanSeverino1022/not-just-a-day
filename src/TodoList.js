import React from 'react';
import Todo from './Todo.js'


export default function TodoList({ todos, toggleTodo }) {
    return (
        <div>
            {todos.map( todo => {
                return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
            })}
        </div>

    )
}
