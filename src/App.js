import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Header from './components/Header'
import Layout from './components/Layout'
import Buttons from './components/Buttons'
import Containers from './components/Containers'
import Inputs from './components/Inputs'
import EditPage from './components/EditPage'
import NewPage from './components/NewPage'
import TestPage from './components/TestPage'
import DragCanvas from './components/DragCanvas'
import NewDrag from './components/NewDrag'

function App() {
  return (
    <div>
      <NewDrag />
    </div>
  );
}

export default App;
