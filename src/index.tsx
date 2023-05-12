import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from './components/main/'
import Login from './components/login/'

import menuStore from './store/menuStore'
import setStore from "./store/setStore";
import editFormStore from "./store/editFormStore";

import './index.module.scss'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";

const stores = {
  menuStore,
  setStore,
  editFormStore
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
    path: "login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

console.clear()

root.render(
  <Provider {...stores}>
    <RouterProvider router={router} />
  </Provider>  
)