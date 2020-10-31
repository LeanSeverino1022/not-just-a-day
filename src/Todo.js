import React from 'react'
import { Draggable } from "react-beautiful-dnd";

function Todo({todo, toggleTodo, order, index}) {

    const taskPriorityUI =  order <= 2 ? <span className="p-1 text-red-900 ml-auto" role="img">❗❗❗</span> : "";


    const getItemStyle = (isDragging) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        // padding: 8 * 2,
        // margin: `0 0 ${8}px 0`,
        border: 'red 2px solid',

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",
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
                        className="flex items-center ">
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
