import { makeAutoObservable, observable, action } from 'mobx'
import { ImageListType } from 'react-images-uploading'
import * as I from './storeInterfaces'

export class EditFormStore {
  emptyFood: I.Food = {
    id: '',
    name: '',
    section: '',
    price: 0,
    images: [],
    info: '',
    version: 0,
    tags: [],
  }

  open: boolean = false
  type: string = 'food'
  formData: I.EditFormFoodData = this.emptyFood
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
  }

  setData(data: I.EditFormFoodData) {
    this.formData = data
  }

  setImages(imageList: ImageListType) {
    this.rawImages = imageList
  }

  addImageInListToDelete(index: number) {
    const fd = (this.formData as I.Food)
    if (fd.images !== undefined)
      if (fd.images[index] !== undefined) {
        this.imagesToDelete.push(fd.images[index])
        fd.images.splice(index, 1)
      }
  }

  openForm(type: string, dataRaw: I.EditFormFoodData) {
    if (type === 'food')
      if (dataRaw !== undefined) {
        const data = dataRaw as I.Food
        this.formData = {
          id: data.id,
          name: data.name,
          version: data.version + 1,
          section: data.section,
          price: data.price,
          images: data.images,
          info: data.info,
          tags: data.tags,
        }
      } else this.formData = this.emptyFood

    this.type = type
    this.rawImages = []
    this.imagesToDelete = []
    this.open = true
  }

  closeForm() {
    this.open = false
    this.rawImages = []
    this.imagesToDelete = []
    this.formData = this.emptyFood
  }

}

const editFormStore = new EditFormStore()
export default editFormStore