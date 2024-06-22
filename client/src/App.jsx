import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Register from './pages/Register/Register.jsx';

const App = () => {
  const dispatch = useDispatch();

  const allState = useSelector((state) => state);
  console.log("all state", allState);

  return (
    <div className="container">
      MERN TODO APP
    </div>
  )
}

export default App;
