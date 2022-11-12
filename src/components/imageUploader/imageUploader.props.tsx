import { ImageListType } from "react-images-uploading";

export type UseImageUploader = () => [    
    state: {
        images: never[]
    },
    api: {
        onChange: (imageList: ImageListType, addUpdateIndex: number[] | undefined) => void
    }
];