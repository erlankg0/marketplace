import type {GetProp} from 'antd';
import {Button, Flex, Input, Typography} from 'antd';
import type {OTPProps} from 'antd/es/input/OTP';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Confirmed = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState<string>();
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(code)
        navigate('/')
    }
    const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
        console.log('onChange:', text);
        setCode(text);
    };

    const sharedProps: OTPProps = {
        onChange,
    };
    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <Flex gap={"5rem"} justify={"center"} align={"center"} vertical={true}>
                <Typography.Title level={5}>With custom display character</Typography.Title>
                <Input.OTP
                    length={4}
                    {...sharedProps}/>
                <Button onSubmit={onSubmit} htmlType={'submit'}>Confirm</Button>
            </Flex>

        </form>
    )
}
export default Confirmed;