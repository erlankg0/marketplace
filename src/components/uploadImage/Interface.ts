import {UploadFile} from "antd";

export interface IUploadImages {
    previewOpen: boolean,
    setPreviewOpen: (open: boolean) => void,
    previewImage: string,
    setPreviewImage: (image: string) => void,
    fileList: UploadFile<File>[],
    setFileList: (file: UploadFile<File>[]) => void,
    multiple: boolean
}