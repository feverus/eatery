import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Main } from '~Pages/main/'
import { Login } from '~Pages/login/'

import setStore from "~Store/setStore";
import menuStore from '~Store/menuStore'
import editFormStore from "~Store/editFormStore";

import './index.module.scss'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";

const stores = {
  menuStore,
  setStore,
  editFormStore,
}

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main page='/' />,
    },
    {
      path: "basket",
      element: <Main page='basket' />,
    },
    {
      path: "order-list",
      element: <Main page='order-list' />,
    },
    {
      path: "food/:id",
      element: <Main page='foodDetail' />,
      loader: ({params}) => {return params.id ?? 'error404'},
    },
    {
      path: "login",
      element: <Login />,
    },
  ],
    {
      basename: "/eatery",
    }
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

console.clear()

root.render(
  <Provider {...stores}>
    <RouterProvider router={router} />
  </Provider>  
)