import React from 'react';
import ReactDOM from 'react-dom';
import message from './message';

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.createRoot(root).render(<p>{message}</p>);
}
