import {Controller, useForm} from "react-hook-form"
import {Flex, Modal} from "antd";
import {Stack} from "@chakra-ui/react";
import ButtonComponent from "@components/button/UI/button.tsx";
import {IAppointmentAddChange, ICheckbox} from "@interfaces/appointment.ts";
import style from "./add.module.scss";
import styles from "@layout/Organization/styles/styles.module.scss";
import {createPosition} from "@network/position/position.ts";
import {useState} from "react";
import Alert from "@components/alert/UI/alert.tsx";

const checkboxes: ICheckbox[] = [
    {value: 'CREATE_POSITION', label: 'Создание и выдача Роли', checked: false},
    {value: 'CHANGE_POSITION_ACCESS_RIGHTS', label: 'Изменение прав доступа у ролей', checked: false},
    {value: 'DELETE_POSITION', label: 'Удаление роли', checked: false},
    {value: 'ASSIGN_EMPLOYEE_TO_ORDER', label: 'Назначение работника на заказ', checked: false},
    {value: 'INVITE_EMPLOYEE', label: 'Приглашение работника', checked: false},
    {value: 'REMOVE_EMPLOYEE_FROM_ORDER', label: 'Удаление работника из заказа', checked: false},
    {value: 'REMOVE_EMPLOYEE', label: 'Удаление работника', checked: false},
    {value: 'CHANGE_ORDER_STATUS', label: 'Изменение статуса заказа', checked: false},
    {value: 'COMPLETE_ORDER', label: 'Завершение заказа', checked: false},
    {value: 'SEND_REQUEST_TO_EXECUTE_ORDER', label: 'Отправка запроса на выполнение заказа', checked: false},
];

const AddAppointment = () => {
    const form = useForm<IAppointmentAddChange>();
    const {handleSubmit, control, register} = form;
    const [success, setSuccess] = useState<boolean>(false); // Состояние нового модального окна для подтверждения выхода

    const handleToggleModal = () => {
        setSuccess(!success);
    }
    const onSubmit = (data: IAppointmentAddChange) => {
        console.log(data);

        // Сбор значений value для выбранных чекбоксов
        const selectedValues = checkboxes
            .filter((_, index) => data.checkboxes[index]?.checked)
            .map((checkbox) => checkbox.value);
        console.log(selectedValues)
        const formData = new FormData();
        formData.append('position', JSON.stringify({
            positionName: data.appointments.name,
            accessRights: selectedValues
        }));

        createPosition(formData).then(handleToggleModal).catch(handleToggleModal)
    };


    return (
        <section>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.space}>
                    <div className={styles.field}>
                        <label className={styles.field__label}>Должность</label>
                        <input className={styles.field__input} {...register('appointments.name')}/>
                    </div>
                    <h2 className={style.title}>Выдача прав доступа</h2>
                    <div className={style.space}>
                        <Stack spacing={3} direction={'column'}>
                            {checkboxes.map((checkbox, index) => (
                                <div key={checkbox.value} className={style.row}>
                                    <Controller
                                        name={`checkboxes.${index}.checked`}
                                        control={control}
                                        render={({field}) => (
                                            <>
                                                <input
                                                    id={checkbox.value}
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={e => field.onChange(e.target.value)}
                                                />
                                                <label htmlFor={checkbox.value} className={style.title}>
                                                    {checkbox.label}
                                                </label>
                                            </>
                                        )}
                                    />
                                </div>
                            ))}
                        </Stack>
                        <Flex vertical={true} gap={'2rem'}>
                            <div className={'line'}></div>
                            <div style={{width: '14rem', alignSelf: 'end'}}>
                                <ButtonComponent text={'Добавить'}/>
                            </div>
                        </Flex>
                    </div>
                </div>
            </form>
            <Modal open={success} footer={null} centered={true}
                   bodyStyle={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       maxWidth: '30rem',
                       margin: '0 auto'
                   }}>
                <Alert setModalActive={handleToggleModal} success={success}/>
            </Modal>
        </section>
    );
}

export default AddAppointment;