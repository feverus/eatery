import {observer, inject} from "mobx-react"
import {ImageUploader} from './imageUploader'

export default
	inject('editFormStore', 'menuStore')
	(observer(ImageUploader));