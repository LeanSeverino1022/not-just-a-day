import React from 'react'
import { Draggable } from "react-beautiful-dnd";

function Todo({todo, toggleTodo, order, index}) {

    const priorityTaskUI =  order <= 2 ? "bg-red-900" : "bg-gray-800";

    const getItemStyle = (isDragging) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: '8px',
        marginBottom: '8px',
        border: '1px soli #b1b0a2',
     
        // change background colour if dragging
        transform: isDragging ? "skewY(.8deg)" : null,
    });



    function handleTodoStatus() {
        toggleTodo(todo.id);
    }

    return (
        <Draggable draggableId={todo.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <label 
                        style={getItemStyle(
                            snapshot.isDragging
                        )}
                        className={`flex items-center ${priorityTaskUI}`}>
                        <input type="checkbox" checked={todo.complete} onChange={handleTodoStatus} />
                        <span className="ml-2">{todo.name}</span>
                    </label>
                </div>
            )}    
        </Draggable>
    );
}

export default Todo;
