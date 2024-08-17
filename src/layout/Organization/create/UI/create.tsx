import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ICreate} from "@layout/Organization/create/interface.ts";
import {validationCreateOrganization} from "@validations/organization.ts";
import styles from "@layout/Organization/styles/styles.module.scss";
import UploadImage from "@components/uploadImage/UI/upload.tsx";
import {useState} from "react";
import {Flex, Modal, UploadFile} from "antd";
import ButtonComponent from "@components/button/UI/button.tsx";
import {createOrganization} from "@network/organization/admin.ts";
import Alert from "@components/alert/UI/alert.tsx";

const Create = () => {
    const form = useForm<ICreate>({
        resolver: yupResolver(validationCreateOrganization)
    });
    const {register, handleSubmit, formState: {errors, touchedFields}} = form;
    // images upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [success, setSuccess] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>()
    const handleToggleSuccess = () => {
        setSuccess(!success);
    }
    const handleToggleError = () => {
        setError(!error);
    }

    const onSubmit = async (data: ICreate) => {
        try {
            const formData = new FormData();
            formData.append('organization', JSON.stringify(data))
            fileList.forEach(image => {
                formData.append('image', image.originFileObj as File)
            })

            const response = await createOrganization(formData)
            if (typeof response === 'number') {
                handleToggleSuccess();
            } else {
                setMessage(response.message)
                handleToggleError();
            }
        } catch (e) {
            console.log(`${e}`)
        }

    }
    return (
        <section>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className={styles.form__content}>
                        <h2 className={styles.form__title}>Ваш логотип</h2>
                        <UploadImage
                            previewOpen={previewOpen}
                            setPreviewOpen={setPreviewOpen}
                            setPreviewImage={setPreviewImage}
                            previewImage={previewImage}
                            fileList={fileList}
                            setFileList={setFileList}
                            multiple={false}
                        />
                    </div>
                    <div className={styles.form__content}>
                        <h2 className={styles.form__title}>Создание Организации</h2>
                        <div>
                            <div className={styles.field}>
                                <label
                                    className={styles.field__label}
                                    htmlFor={'title'}>Название организации <span
                                    className={errors.name ? styles.field__error : ''}>*</span>
                                </label>
                                <input
                                    className={styles.field__input}
                                    placeholder={'Азиатские акулы'}
                                    {...register('name')}
                                    id={'title'}
                                    maxLength={250}
                                    autoFocus={touchedFields.name}
                                />
                            </div>
                            <p className={styles.field__helper}>максимум 250 символов, минимум 5 символов</p>
                        </div>
                        <div>
                            <div className={styles.field}>
                                <label
                                    className={styles.field__label}
                                    htmlFor={'description'}>Описание <span
                                    className={errors.description ? styles.field__error : ''}>*</span>
                                </label>
                                <textarea
                                    className={styles.field__textarea}
                                    placeholder={'Лучший текстиль Средней Азии'}
                                    {...register('description')}
                                    id={'description'}
                                    maxLength={1000}
                                    autoFocus={touchedFields.description}
                                />
                            </div>
                            <p className={styles.field__helper}>максимум 1000 символов, минимум 5 символов</p>
                        </div>
                    </div>
                </div>
                <Flex gap={'2rem'} vertical={true}>
                    <div className={'line'}></div>
                    <div style={{alignSelf: 'end'}}>
                        <ButtonComponent text={'Создать организацию'}/>
                    </div>
                </Flex>
            </form>
            <Modal open={success} footer={null} centered={true}>
                <Alert setModalActive={handleToggleSuccess} success={success}/>
            </Modal>
            <Modal open={error} footer={null} centered={true}>
                <Alert setModalActive={handleToggleError} error={error} text={message}/>
            </Modal>
        </section>
    )
}

export default Create