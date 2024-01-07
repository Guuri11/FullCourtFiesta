import { Avatar, Button, Divider, Image, Text, makeStyles } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { PlayerServiceType } from "../../../../application/PlayerService";
import { PlayerRepositoryI } from "../../../../domain/Player/PlayerRepository";
import "../../../../infrastructure/locales/index";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { observer } from "mobx-react-lite";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAvatarName } from "../../../../utils";
import { Post } from "../../../../domain/Post/Post";
import { PostServiceType } from "../../../../application/PostService";
import { PostRepositoryI } from "../../../../domain/Post/PostRepository";
import CreatePostFAB from "../../design/common/CreatePostFAB";
import { PostPublication } from "../Community/PostPublication";
import { HeaderImage } from "../../design/common/HeaderImage";

const Profile = observer(() => {
    const authenticationStore = useAuthenticationStore();
    const appStore = useAppStore();
    const uiStore = useUIStore();
    const styles = useStyles();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const getProfile = async () => {
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
            };

            if (authenticationStore.session) getProfile();
        }, [authenticationStore.session]),
    );

    const getPosts = useCallback(() => {
        const { service, repository } = appStore.getService("post") as {
            service: PostServiceType;
            repository: PostRepositoryI;
        };

        service.find(repository).then((data) => {
            setPosts(data);
        });
    }, []);

    const handleEdit = () => {
        //@ts-ignore
        navigation.navigate("ProfileEdit");
    };

    return (
        <View style={{ height: "100%" }}>
            <HeaderImage avatarUrl={authenticationStore.user?.avatar_url} />
            <View style={styles.container}>
                <View style={styles.usernameContainer}>
                    <Avatar
                        rounded
                        title={getAvatarName(authenticationStore.user?.username || "")}
                        size={120}
                        source={
                            authenticationStore.user?.avatar_url && {
                                uri: authenticationStore.user?.avatar_url,
                            }
                        }
                        containerStyle={styles.avatarContainer}
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
            <Divider />
            <View>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => <PostPublication post={item} />}
                    keyExtractor={(item) => String(item.id)}
                    // Performance settings
                    initialNumToRender={10} // Adjust based on your needs
                    maxToRenderPerBatch={10}
                    windowSize={21} // The default is 21, which is ~7 screens
                    removeClippedSubviews={true} // Unmount components when they are off screen
                    // Lazy loading images
                    // You may integrate other libraries like 'react-native-fast-image' for better image performance
                />
            </View>
            <CreatePostFAB />
        </View>
    );
});

export default Profile;

const useStyles = makeStyles((theme) => ({
    avatarImage: {
        height: 120,
        width: 120,
        objectFit: "cover",
    },
    avatarContainer: {
        marginTop: -40,
        borderRadius: 60,
        backgroundColor: theme.colors.secondary,
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
        marginVertical: 16,
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
