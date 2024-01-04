import { Image, Text, makeStyles } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { PlayerServiceType } from "../../../../application/PlayerService";
import { Position } from "../../../../domain/Player/Player";
import { PlayerRepositoryI } from "../../../../domain/Player/PlayerRepository";
import "../../../../infrastructure/locales/index";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { observer } from "mobx-react-lite";

const Profile = observer(() => {
    const [loading, setLoading] = useState(true);
    const authenticationStore = useAuthenticationStore();
    const [username, setUsername] = useState(null);
    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState(null);
    const [position, setPosition] = useState<Position>(null);
    const appStore = useAppStore();
    const uiStore = useUIStore();
    const styles = useStyles();
    const { t } = useTranslation();

    useEffect(() => {
        if (authenticationStore.session) getProfile();
    }, [authenticationStore.session]);

    async function getProfile() {
        const { service, repository } = appStore.getService("player") as {
            service: PlayerServiceType;
            repository: PlayerRepositoryI;
        };

        setLoading(true);
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

    async function updateProfile() {
        setLoading(true);
        const { service, repository } = appStore.getService("player") as {
            service: PlayerServiceType;
            repository: PlayerRepositoryI;
        };

        service
            .completeProfile(repository, {
                fullName,
                username,
                position,
                bio,
                userId: authenticationStore.session.user.id,
            })
            .then(({ code, message }) => {
                if (code === 500) {
                    uiStore.notification.addNotification(message, "error");
                }

                if (code === 200) {
                    authenticationStore.setUser({
                        ...authenticationStore.user,
                        username,
                        position,
                        bio,
                    });
                }
                setLoading(false);
            });
    }

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
                    <View style={styles.userDataContainer}>
                        <Text h4>{authenticationStore?.user?.full_name}</Text>
                        <Text style={styles.username}>{authenticationStore?.user?.username}</Text>
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
        justifyContent: "space-around",
        marginTop: 16,
    },
    followCounter: {
        fontWeight: "bold",
    },
}));
