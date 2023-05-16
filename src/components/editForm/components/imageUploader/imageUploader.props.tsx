import { ImageListType } from "react-images-uploading";

export type UseImageUploader = () => [    
    state: {
        images: ImageListType
    },
    api: {
        onChange: (imageList: ImageListType, addUpdateIndex: number[] | undefined) => void
    }
];