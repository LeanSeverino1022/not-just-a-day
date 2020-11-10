// import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import React, { useState, useRef, useEffect, Component } from 'react';
import TodoList from './TodoList';
import todosData from './data';
import HeaderWidgets from './HeaderWidgets';
import Pomodoro from './Pomodoro';
import { v4 as uuidv4 } from 'uuid';

const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  const custom = {
    id: `id-${k}`,
    content: `Quote ${k}`
  };

  return custom;
});

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const divStyle = {
  width: "200px",
  border: "1px solid grey",
  marginBottom: `${grid}px`,
  background: "lightblue",
  padding: `${grid}px`
};

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided) => (
        <div
          style={{ background: "#000" }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.content}
        </div>
      )}
    </Draggable>
  );
}

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return quotes.map((quote: QuoteType, index: number) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ));
});

function App() {
  const [state, setState] = useState({ quotes: initial });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({ quotes });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// Put the thing into the DOM!
// ReactDOM.render(<App />, document.getElementById("root"));

export default App
