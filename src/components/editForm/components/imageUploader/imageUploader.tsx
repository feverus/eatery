import editFormStore from "~Store/editFormStore"
import * as I from '~Store/storeInterfaces'
import { Button, Icon } from "@blueprintjs/core"
import ImageUploading from "react-images-uploading"
import C from './imageUploader.module.scss'
import useImageUploader from './imageUploader.service'

export function ImageUploader() {
	const [state, api] = useImageUploader()
	const fd = (editFormStore.formData as I.Food)

	return (
	  <div className={C.allImages}>
			<div className={C.partImages}>
				{fd.images?.map((src, index) => (
					<div key={'uploader_old_' + src} className={C.item}>
						<img src={src} alt="Старое изображение" />
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
					acceptType={['png', 'jpg', 'jpeg', 'gif', 'bmp']}
					maxFileSize={20_000_000}
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
						<div key={'uploader_new_' + image.dataURL} className={C.item}>
							<img src={image.dataURL} alt="Новое изображение" />
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