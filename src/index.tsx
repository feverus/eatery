import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'

import Main from './components/main'

import foodStore from './store/foodStore'

import './styles/index.css';

const stores = {
  foodStore,
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider {...stores}>
    <Main />
  </Provider>  
)