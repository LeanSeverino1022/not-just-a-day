import React from 'react'

export default function Todo({todo, toggleTodo}) {

    function handleTodoStatus() {
        toggleTodo(todo.id);
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoStatus} />
                <span className="text-2xl">{todo.name}</span>
           </label>
        </div>
    )
}
