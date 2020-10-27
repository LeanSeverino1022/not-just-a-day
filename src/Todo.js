import React from 'react'
import { Draggable } from "react-beautiful-dnd";

function Todo({todo, toggleTodo, order, index}) {

    const taskPriorityUI =  order > 2 ? <span className="p-1 text-red-900 ml-auto">Add to Top 3</span> : <span className="p-1 text-red-900 ml-auto">Remove from Top 3</span>

    function handleTodoStatus() {
        toggleTodo(todo.id);
    }

    return (
        <Draggable draggableId={todo.id} index={index}>
            {(provided) => (
                <div
                    style={{ background: "#000" }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <label className="flex items-center ">
                        <input type="checkbox" checked={todo.complete} onChange={handleTodoStatus} />
                        <span className="text-2xl ml-2">{todo.name}</span>
                        {taskPriorityUI}
                    </label>
                </div>
            )}    
        </Draggable>
    );
}

export default Todo;
