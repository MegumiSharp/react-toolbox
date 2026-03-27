import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'

import App from './App.tsx'
import ColorPickerPage from './pages/ColorPickerPage/ColorPickerPage';
import ToDoListPage from './pages/ToDoListPage/ToDoListPage';


const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "/colorpicker", element: <ColorPickerPage/>},
    {path: "/todolist", element: <ToDoListPage/>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
