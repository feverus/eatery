import {observer, inject} from "mobx-react";

import foodStore from '../store/foodStore'

const Main = () => {
	return (
	  <>
	  Main	 
	  {foodStore.menu.map((item, id) => <div key={id}>{item.id}</div>)}
	  </>
	)
}

  

export default
	inject('foodStore')
	(observer(Main));