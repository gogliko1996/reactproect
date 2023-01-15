
import React from 'react';
import './App.css';
import { NavBar } from './header/navBar/NavBar';
import { RouterComponent } from './Router';


function App() {
  return (
    <div>
      <NavBar/>
      <RouterComponent/>
    </div>
  );
}

export default App;
