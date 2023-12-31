import { StyleProp, Text, TextStyle } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@rneui/themed'

type AnchorProps = {
    content: string,
    route: string,
    params?: unknown,
    styles: StyleProp<TextStyle>,
}

const Anchor = (props: AnchorProps) => {
    const navigation = useNavigation();
    const {theme} = useTheme();

    const goTo = () => {
        // FIXME: this is a ts generic error
        //@ts-ignore
        navigation.navigate(props.route, props.params);
    };
  return (
    <Text style={[props.styles, {color: theme.colors.primary}]} onPress={goTo}>{props.content}</Text>
  )
}

export default Anchor
