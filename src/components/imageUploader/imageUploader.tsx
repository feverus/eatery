import editFormStore from "../../store/editFormStore"
import { Button, Classes, Overlay, Card, Divider, ControlGroup, ButtonGroup, InputGroup, Icon } from "@blueprintjs/core";

import ImageUploading from "react-images-uploading";
import C from './imageUploader.module.scss'
import useImageUploader from './imageUploader.service'

export function ImageUploader() {
	console.log('editFormStore.formData?.images')
	console.log(editFormStore.formData?.images)

	const [state, api] = useImageUploader()

	return (
	  <div className={C.allImages}>
		<div className={C.partImages}>
			{editFormStore.formData?.images && editFormStore.formData.images.map((src, index) => (
				<div key={index} className={C.item}>
					<img src={src} alt="" key={index} />
					<div className={C.buttons}>
						<Button className={C.delete} minimal intent="danger" onClick={() => editFormStore.addImageInListToDelete(index)}>
							<Icon icon="trash" />
						</Button>
					</div>
				</div>
			))}
		</div>
		<div className={C.partImages}>
			<ImageUploading
				multiple
				value={state.images}
				onChange={api.onChange}
				maxNumber={10}
			>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps
				}) => (
				// write your building UI
				<div className={C.body}>
					{imageList.map((image, index) => (
					<div key={index} className={C.item}>
						<img src={image.dataURL} alt="" />
						<div className={C.buttons}>
							<Button minimal intent="primary" onClick={() => onImageUpdate(index)}>
								<Icon icon="refresh" />
							</Button>
							<Button className={C.delete} minimal intent="danger" onClick={() => onImageRemove(index)}>
								<Icon icon="trash" />
							</Button>
						</div>
					</div>
					))}
					<Button	
						className={isDragging ?  (C.addBtn +' '+ C.isDragging) : C.addBtn}
						onClick={onImageUpload}
						{...dragProps}
					>
						<Icon icon="media" />
						<div>Нажмите или перетащите сюда</div>
					</Button>
				</div>
				)}
			</ImageUploading>
		</div>
	  </div>
	)
}