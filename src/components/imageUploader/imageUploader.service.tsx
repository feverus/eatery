import editFormStore from "../../store/editFormStore"
import { UseImageUploader } from "./imageUploader.props";
import { ImageListType } from "react-images-uploading";

const useImageUploader:UseImageUploader = () => {
  
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      editFormStore.setImages(imageList as never[]);
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