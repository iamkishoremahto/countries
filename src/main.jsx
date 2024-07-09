import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/home/Home'
import Layout from './pages/layout/Layout'
import CountryDetail from './pages/countryDetail/CountryDetail'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path:'',
        element:<Home />
      },
      {
        path:'/country/:CountryCode',
        element:<CountryDetail />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
