import React from 'react'
import { Input, InputProps } from '@rneui/themed'

interface CustomInputProps {
    placeholder: string,
    onChangeText: (value: string) => void,
    value: string,
    autoCapitalize: "none" | "sentences" | "words" | "characters",
    secureTextEntry?: boolean
}

const CustomInput = (props: CustomInputProps & InputProps) => {
    return (
        <Input
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            onChangeText={props.onChangeText}
            value={props.value}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            autoCapitalize={props.autoCapitalize}
        />
    )
}

export default CustomInput
