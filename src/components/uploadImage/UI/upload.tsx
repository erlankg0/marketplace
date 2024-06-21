import React, {useEffect} from "react";
import type {GetProp, UploadFile, UploadProps} from "antd";
import {Image, Upload} from "antd";
import {IUploadImages} from "@components/uploadImage/Interface.ts";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UploadImage: React.FC<IUploadImages> = ({
                                                  previewImage,
                                                  setPreviewImage,
                                                  setFileList,
                                                  fileList,
                                                  previewOpen,
                                                  setPreviewOpen
                                              }) => {


    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <div style={{padding: "1rem"}}>
                <div style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    backgroundColor: "#E5EFFD",
                    borderRadius: "1rem"
                }}>+ Добавить файл
                </div>
            </div>
        </button>
    );

    useEffect(() => {
        console.log(fileList);
    }, [fileList]);

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={({onSuccess}) => onSuccess?.("ok")}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{display: 'none'}}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default UploadImage;
