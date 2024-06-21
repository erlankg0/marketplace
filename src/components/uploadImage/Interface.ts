import {UploadFile} from "antd";

export interface IUploadImages {
    previewOpen: boolean,
    setPreviewOpen: (open: boolean) => void,
    previewImage: string,
    setPreviewImage: (image: string) => void,
    fileList: UploadFile[],
    setFileList: (file: UploadFile[]) => void,
}