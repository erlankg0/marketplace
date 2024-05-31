import {useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

import styles from "./auth.module.scss";

type FormValues = {
    username: string,
    email: string,
    password: string
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must not exceed 20 characters"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters")
});

const Auth = () => {
    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });
    const {register, control, formState: {errors, touchedFields}, handleSubmit} = form
    const onSubmit = (data: FormValues) => {
        console.log("form submit", data)
    }
    return (
        <main className={styles.content}>
            <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor={"email"}>Email</label>
                <input type={"email"} id={"email"}
                       {...register("email", {
                           required: "Has to be email"
                       })}/>
                {touchedFields.email && <p>fuck</p>}
                {errors.email && (errors.email.message)}
                <label htmlFor={"username"}>Email</label>
                <input
                    type={"text"}
                    id={"username"}
                    {...register("username", {
                        required: "Username is required",
                    })}

                />
                {errors.username && (errors.username.message)}


                <label htmlFor={"password"}>Email</label>
                <input type={"password"} id={"password"} {...register("password")}/>
                {errors.password && (errors.password.message)}

                <button>Submit</button>
            </form>
            <div>right</div>
            <DevTool control={control}/>
        </main>
    )
}

export default Auth