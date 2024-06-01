import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormValues} from "@interfaces/auth.ts";
import {validationSchema} from "@validations/auth.ts";
import {Button, Flex} from "antd";
import styles from "./auth.module.scss";


const Auth = () => {
    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });
    const {register, formState: {errors, touchedFields}, handleSubmit} = form
    const onSubmit = (data: FormValues) => {
        console.log("form submit", data)

    }
    return (
        <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Flex justify={"center"} align={"center"} vertical={true}>
                <label htmlFor={"email"}
                       className={errors.email ? `${styles.label} ${styles.error}` : styles.label}>Email</label>
                <input
                    className={styles.input}
                    type={"email"}
                    id={"email"}
                    {...register("email")}
                    autoFocus={touchedFields.email}
                />
                {errors.email && (<p className={styles.error}>{errors.email.message}</p>)}
                <label className={styles.label} htmlFor={"username"}>Email</label>
                <input
                    type={"text"}
                    id={"username"}
                    {...register("username")}
                    className={styles.input}
                    autoFocus={touchedFields.username}

                />
                {errors.username && (<p className={styles.error}>{errors.username.message}</p>)}


                <label className={styles.label} htmlFor={"password"}>Email</label>
                <input
                    type={"password"}
                    id={"password"}
                    {...register("password")}
                    className={styles.input}
                    autoFocus={touchedFields.password}

                />
                {errors.password && (<p className={styles.error}>{errors.password.message}</p>)}

                <Button htmlType={'submit'}>Submit</Button>
            </Flex>

        </form>
    )
}

export default Auth