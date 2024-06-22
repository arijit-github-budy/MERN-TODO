import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import configurations from './config/config.module.js';

const App = () => {
  const dispatch = useDispatch();

  const allState = useSelector((state) => state);
  console.log("all state", allState);
  
  return (
    <div className="text-5xl text-red-950">
      MERN TODO APP
    </div>
  )
}

export default App;
