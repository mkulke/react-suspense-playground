import React from 'react';
import { retrieveTodos } from '../api';

const resource = retrieveTodos();

const Todos = () => {
  const todos = resource.read();

  return (
    <ul className="todos">
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default Todos;
