import './App.css';
import * as React from 'react'

import Login from './pages/login';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountInfo from './components/display';

function App() {
  return (
    <Login/>
  );
}

export default App;
