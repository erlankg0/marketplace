import {Controller, useForm} from "react-hook-form"
import {Select, Flex} from "antd";

import {Stack} from "@chakra-ui/react";
import ButtonComponent from "@components/button/UI/button.tsx";
import {ICheckbox, IAppointmentAddChange} from "@interfaces/appointment.ts";

import style from "./add.module.scss";
import styles from "@layout/Organization/styles/styles.module.scss";

const checkboxes: ICheckbox[] = [
    {value: 'createOrders', label: 'Создание заказов', checked: false},
    {value: 'createRoles', label: 'Создание и выдача Роли', checked: false},
    {value: 'modifyRolePermissions', label: 'Изменение прав доступа у ролей', checked: false},
    {value: 'addEmployee', label: 'Добавление работника', checked: true},
    {value: 'changeOrderStatus', label: 'Изменение статуса заказа', checked: false},
    {value: 'deleteOrder', label: 'Удаление заказа', checked: false},
    {value: 'deleteEmployee', label: 'Удаление работника', checked: false},
    {value: 'deleteRole', label: 'Удаление роли', checked: false},
];


const AddAppointment = () => {
    const form = useForm<IAppointmentAddChange>();
    const {handleSubmit, control,} = form;

    const onSubmit = (data: IAppointmentAddChange) => {
        console.log(data);
    }
    return (
        <section>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.space}>
                    <div className={styles.field}>
                        <label className={styles.field__label}>Должность</label>
                        <Controller
                            name="appointments"
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={[
                                        {value: '1', label: 'Утюжник'},
                                        {value: '2', label: 'Технолог'},
                                        {value: '3', label: 'Швея'},
                                        {value: '4', label: 'Закройщик'},
                                    ]}
                                    onChange={(value) => field.onChange([{id: value}])}
                                />
                            )}
                        />
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
                                                    onChange={e => field.onChange(e.target.checked)}
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
        </section>
    )
}

export default AddAppointment