import {makeAutoObservable, observable, action, autorun} from 'mobx';
import { ImageListType } from 'react-images-uploading';
import * as I from './storeInterfaces';

export class EditFormStore { 
    emptyFood:I.Food = {
        id: '',
        name: '',
        section: '',
        price: 0,
        images: [],
        info: '',
    }

    open:boolean = false
    formData:I.Food = this.emptyFood
    type:string = 'food'
    rawImages: ImageListType = []
    imagesToDelete: Array<string> = []

    constructor() {
        makeAutoObservable(this, {
            open: observable,
            formData: observable,
            setData: action,
            setImages: action,
            addImageInListToDelete: action,
            openForm: action,
            closeForm: action,
        })
        autorun(() => console.log('food store autorun'));
    }

    setData(data:I.Food) {
        this.formData = data
    }

    setImages(imageList: ImageListType) {
        this.rawImages = imageList
    }

    addImageInListToDelete(index:number) {
        if (this.formData.images[index]!==undefined) {
            this.imagesToDelete.push(this.formData.images[index])
            this.formData.images.splice(index,1)
        }        
    }

    openForm(type:string, data:I.EditFormFoodData) {
        this.type = type
        if (data!==undefined) {
            this.formData = {id: data.id,
                name: data.name,
                section: data.section,
                price: data.price,
                images: data.images,
                info: data.info,
            }
        } else this.formData = this.emptyFood

        this.rawImages = []
        this.imagesToDelete = []
        this.open = true
    }

    closeForm() {
        this.open = false
    }

}

const editFormStore = new EditFormStore()
export default editFormStore