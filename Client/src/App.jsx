import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DrawerAppBar from './Components/DrawerAppBar'
import { ImgMediaCard, ImgMediaCardCust } from './Components/ImgMediaCard'

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import QuestionPage from './Components/QuestionPage'
import Login from './Components/Login'

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <DrawerAppBar />
      <Outlet/>
    </>,
    children: [
      {
        index:true,
        element: <>
          <div className='homeCardContainer'>
            <ImgMediaCardCust />
          </div>
        </>
      },
      {
        path: "question/:id",
        element: <>
        <QuestionPage/>
        </>
      },
      {
        path:"login",
        element:<Login/>
      }
    ]
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
