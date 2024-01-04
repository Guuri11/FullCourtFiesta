import { Button, Image, Text, makeStyles } from "@rneui/themed";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { PlayerServiceType } from "../../../../application/PlayerService";
import { PlayerRepositoryI } from "../../../../domain/Player/PlayerRepository";
import "../../../../infrastructure/locales/index";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";

const Profile = observer(() => {
    const authenticationStore = useAuthenticationStore();
    const appStore = useAppStore();
    const uiStore = useUIStore();
    const styles = useStyles();
    const { t } = useTranslation();
    const navigation = useNavigation();

    useEffect(() => {
        if (authenticationStore.session) getProfile();
    }, [authenticationStore.session]);

    async function getProfile() {
        const { service, repository } = appStore.getService("player") as {
            service: PlayerServiceType;
            repository: PlayerRepositoryI;
        };

        service
            .getProfile(repository, authenticationStore.session)
            .then(({ code, message, data }) => {
                if (code !== 200) {
                    uiStore.notification.addNotification(t(message));
                } else {
                    authenticationStore.setUser(data);
                }
            });
    }

    /**
     * TODO: refactor this
     */
    const HeaderImage = () => {
        const avatarUrl = authenticationStore?.user?.avatar_url;

        if (avatarUrl) {
            return <Image style={styles.headerImage} source={{ uri: avatarUrl }} />;
        }
        return <View style={styles.headerImageDefault} />;
    };

    const handleEdit = () => {
        //@ts-ignore
        navigation.navigate("ProfileEdit");
    };

    return (
        <View>
            <HeaderImage />
            <View style={styles.container}>
                <View style={styles.usernameContainer}>
                    <Image
                        style={styles.avatarImage}
                        containerStyle={styles.avatarContainer}
                        source={{
                            uri: authenticationStore?.user?.avatar_url,
                        }}
                    />
                    <View style={styles.userDataAndEditContainer}>
                        <View style={styles.userDataContainer}>
                            <Text h4>{authenticationStore?.user?.full_name}</Text>
                            <Text style={styles.username}>
                                {authenticationStore?.user?.username}
                            </Text>
                        </View>
                        <Button onPress={handleEdit}>{t("edit")}</Button>
                    </View>
                </View>
                <View style={styles.bioContainer}>
                    <Text style={styles.position}>
                        {t(authenticationStore?.user?.position.toLowerCase())}
                    </Text>
                    <Text>{authenticationStore?.user?.bio}</Text>
                </View>
                <View style={styles.followingContainer}>
                    <Text>123 Seguidores</Text>
                    <Text>123 Siguiendo</Text>
                </View>
            </View>
        </View>
    );
});

export default Profile;

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
    avatarImage: {
        height: 120,
        width: 120,
        objectFit: "cover",
    },
    avatarContainer: {
        marginTop: -40,
        borderRadius: 60,
        width: 120,
        height: 120,
    },
    container: {
        paddingHorizontal: 16,
    },
    usernameContainer: {
        display: "flex",
        flexDirection: "row",
    },
    userDataContainer: {
        marginTop: 10,
        marginLeft: 6,
    },
    username: {
        color: theme.colors.grey3,
    },
    bioContainer: {
        marginTop: 10,
    },
    position: {
        fontSize: 22,
    },
    followingContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 16,
        width: "60%",
        justifyContent: "space-between",
    },
    followCounter: {
        fontWeight: "bold",
    },
    userDataAndEditContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "66%",
    },
}));
