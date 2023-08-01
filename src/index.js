import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import AccountInfo from './components/display';
const router=createBrowserRouter([
  {path:'/',element:<App/>},
  {path:'/display',element:<AccountInfo/>}
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
      <RouterProvider router={router}/>
  </ChakraProvider>

  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
