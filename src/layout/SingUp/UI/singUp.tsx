import {useForm} from 'react-hook-form';
import {ISingUp} from '@layout/SingUp/interface.ts';
import {yupResolver} from '@hookform/resolvers/yup';
import {ValidationSingUp} from '@validations/singUp.ts';
import {NavLink, useNavigate} from 'react-router-dom';
import {Button, Flex} from 'antd';

const SingUp = () => {
    const navigate = useNavigate();
    const form = useForm<ISingUp>({
        resolver: yupResolver(ValidationSingUp),
    });
    const {register, formState: {errors, touchedFields}, handleSubmit} = form;

    const onSubmit = (data: ISingUp) => {
        console.log(data);
        navigate('/confirmed')
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex justify="center" align="center" vertical style={{gap: '16px'}}>
                <div>
                    <label htmlFor="email">Эл. почта</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        autoFocus={touchedFields.email}
                        className={`input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="phone">Номер телефона</label>
                    <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        autoFocus={touchedFields.phone}
                        className={`input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                </div>
                <div>
                    <label htmlFor="username">Имя пользователя</label>
                    <input
                        type="text"
                        id="username"
                        {...register('username')}
                        autoFocus={touchedFields.username}
                        className={`input ${errors.username ? 'error' : ''}`}
                    />
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>
                <Button htmlType="submit" type="dashed">Регистрация</Button>
                <NavLink to="/auth">Авторизация</NavLink>
            </Flex>
        </form>
    );
};

export default SingUp;
