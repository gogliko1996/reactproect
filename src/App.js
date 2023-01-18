
import React from 'react';
import './App.css';
import { NavBar } from './header/navBar/NavBar';
import { Home } from './main/home/Home';
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
