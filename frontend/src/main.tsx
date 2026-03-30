import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'

import App from './App.tsx'
import ColorPickerPage from './pages/ColorPickerPage/ColorPickerPage';
import ToDoListPage from './pages/ToDoListPage/ToDoListPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';


const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "/colorpicker", element: <ColorPickerPage/>},
    {path: "/todolist", element: <ToDoListPage/>},
    {path: "*", element: <NotFoundPage/>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
