import React from 'react'
import { Input } from '@rneui/themed'

type InputProps = {
    placeholder: string,
    onChangeText: (value: string) => void,
    value: string,
    autoCapitalize: "none" | "sentences" | "words" | "characters",
    secureTextEntry?: boolean
}

const CustomInput = (props: InputProps) => {
    return (
        <Input
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            onChangeText={props.onChangeText}
            value={props.value}
            autoCapitalize={props.autoCapitalize}
        />
    )
}

export default CustomInput
