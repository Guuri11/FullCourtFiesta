import { StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FAB, useTheme } from "@rneui/themed";

const CreatePostFAB = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();

    const handleNavigation = () => {
        //@ts-ignore
        navigation.navigate("CreatePost");
    };
    return (
        <FAB
            icon={{ name: "create", color: "white" }}
            color={theme.colors.primary}
            placement='right'
            size='large'
            onPress={handleNavigation}
        />
    );
};

export default CreatePostFAB;

const styles = StyleSheet.create({});
