import React from "react";
import { View } from "react-native";
import { Button, Icon, Image, makeStyles } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

type HeaderImageProps = {
    avatarUrl: string;
};
export const HeaderImage = ({ avatarUrl }: HeaderImageProps) => {
    const styles = useStyles();
    const navigation = useNavigation();

    const handleGoToSettings = () => {
        //@ts-ignore
        navigation.navigate("Settings");
    };

    if (avatarUrl) {
        return (
            <View style={styles.headerContainer}>
                <Image style={styles.headerImage} source={{ uri: avatarUrl }} />
            </View>
        );
    }
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerImageDefault} />
            <Button
                radius={"xl"}
                size='md'
                containerStyle={styles.settingsButtonContainer}
                buttonStyle={styles.settingsButton}
                onPress={handleGoToSettings}
            >
                <Icon name='settings-outline' type='ionicon' iconStyle={styles.actionIcon} />
            </Button>
        </View>
    );
};

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        height: 155,
        width: "100%",
        position: "relative",
    },
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
    actionIcon: {
        color: theme.colors.white,
    },
    settingsButtonContainer: {
        position: "absolute",
        right: 30,
        top: "50%",
    },
    settingsButton: {
        backgroundColor: theme.colors.secondary,
    },
}));
