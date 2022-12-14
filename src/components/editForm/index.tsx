import {observer, inject} from "mobx-react";
import {EditForm} from './editForm'

export default
	inject('editFormStore')
	(observer(EditForm));