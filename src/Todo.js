import React from 'react'

export default function Todo({todo, toggleTodo}) {

    function handleTodoStatus() {
        toggleTodo(todo.id);
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoStatus} />
           {todo.name}
           </label>
        </div>
    )
}
