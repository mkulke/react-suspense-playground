import React from 'react';
import { Suspense } from 'react';
import Todos from './Todos';

const App = () => {
  return (
    <div className="app">
      <h3>Todos</h3>
      <Suspense fallback={<h1>Loading Todos...</h1>}>
        <Todos />
      </Suspense>
    </div>
  );
};

export default App;
