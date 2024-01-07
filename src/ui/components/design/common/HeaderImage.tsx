import React from "react";
import { View } from "react-native";
import { Image, makeStyles } from "@rneui/themed";

type HeaderImageProps = {
    avatarUrl: string;
};
export const HeaderImage = ({ avatarUrl }: HeaderImageProps) => {
    const styles = useStyles();
    if (avatarUrl) {
        return <Image style={styles.headerImage} source={{ uri: avatarUrl }} />;
    }
    return <View style={styles.headerImageDefault} />;
};

const useStyles = makeStyles((theme) => ({
    headerImage: {
        width: "100%",
        height: 155,
        objectFit: "cover",
    },
    headerImageDefault: {
        width: "100%",
        height: 155,
        backgroundColor: theme.colors.primary,
    },
}));
