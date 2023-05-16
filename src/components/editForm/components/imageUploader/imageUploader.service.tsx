import editFormStore from "~Store/editFormStore"
import { UseImageUploader } from "./imageUploader.props"
import { ImageListType } from "react-images-uploading"

const useImageUploader:UseImageUploader = () => {
  
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
      editFormStore.setImages(imageList);
    }

    const state = {
        images: editFormStore.rawImages,
    }
    const api = {
        onChange,
    }
    
    return (
        [state,api]
    )
}

export default useImageUploader