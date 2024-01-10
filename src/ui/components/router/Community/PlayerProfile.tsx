import { Avatar, Button, Divider, Text, makeStyles } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { PlayerServiceType } from "../../../../application/PlayerService";
import { PlayerRepositoryI } from "../../../../domain/Player/PlayerRepository";
import "../../../../infrastructure/locales/index";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { observer } from "mobx-react-lite";
import { getAvatarName } from "../../../../utils";
import { Post } from "../../../../domain/Post/Post";
import { PostServiceType } from "../../../../application/PostService";
import { PostRepositoryI } from "../../../../domain/Post/PostRepository";
import { HeaderImage } from "../../design/common/HeaderImage";
import { Player } from "../../../../domain/Player/Player";
import { RouteProp } from "@react-navigation/native";
import { PostPublication } from "./PostPublication";
import { FriendshipServiceType } from "../../../../application/FriendshipService";
import { FriendshipRepositoryI } from "../../../../domain/Friendship/FriendshipRepository";
import { Friendship } from "../../../../domain/Friendship/Friendship";

type PlayerProfileProps = {
    route: RouteProp<{ params: { playerId: string } }, "params">;
};

const PlayerProfile = observer(({ route }: PlayerProfileProps) => {
    const { playerId } = route.params;
    const [player, setPlayer] = useState<Player>(null);
    const appStore = useAppStore();
    const uiStore = useUIStore();
    const styles = useStyles();
    const { t } = useTranslation();
    const [posts, setPosts] = useState<Post[]>([]);
    const authenticationStore = useAuthenticationStore();
    const [following, setFollowing] = useState<Boolean>(false);
    const [followers, setFollowers] = useState<Friendship[]>([]);
    const [followings, setFollowings] = useState<Friendship[]>([]);

    useEffect(() => {
        getProfile();
    }, [playerId]);

    useEffect(() => {
        getPosts();
    }, [playerId]);

    useEffect(() => {
        getFriendships();
    }, [playerId]);

    useEffect(() => {
        isFollowing();
    }, [playerId]);

    const getProfile = async () => {
        const { service, repository } = appStore.getService("player") as {
            service: PlayerServiceType;
            repository: PlayerRepositoryI;
        };

        service
            .find(repository, playerId, ["username", "position", "bio", "avatar_url", "full_name"])
            .then(({ code, message, data }) => {
                if (code !== 200) {
                    uiStore.notification.addNotification(t(message));
                } else {
                    setPlayer(data);
                }
            });
    };

    const getPosts = useCallback(() => {
        const { service, repository } = appStore.getService("post") as {
            service: PostServiceType;
            repository: PostRepositoryI;
        };

        service.findById(repository, playerId).then((data) => {
            setPosts(data);
        });
    }, []);

    const getFriendships = useCallback(() => {
        const { service, repository } = appStore.getService("friendship") as {
            service: FriendshipServiceType;
            repository: FriendshipRepositoryI;
        };

        service.findByPlayerId(repository, playerId, false).then((data) => {
            setFollowings(data);
        });
        service.findByPlayerId(repository, playerId, true).then((data) => {
            setFollowers(data);
        });
    }, []);

    const handleFollow = () => {
        const { service, repository } = appStore.getService("friendship") as {
            service: FriendshipServiceType;
            repository: FriendshipRepositoryI;
        };

        service
            .create(repository, { player: playerId, follower: authenticationStore.session.user.id })
            .then(({ code, message }) => {
                if (code !== 200) {
                    uiStore.notification.addNotification(message, "error");
                } else {
                    setFollowing(true);
                }
            });
    };

    const isFollowing = useCallback(() => {
        const { service, repository } = appStore.getService("friendship") as {
            service: FriendshipServiceType;
            repository: FriendshipRepositoryI;
        };

        service
            .findByPlayerIdAndFollowerId(repository, playerId, authenticationStore.session.user.id)
            .then((result) => setFollowing(result));
    }, []);

    return (
        <View style={{ height: "100%" }}>
            <HeaderImage avatarUrl={player?.avatar_url} />
            <View style={styles.container}>
                <View style={styles.usernameContainer}>
                    <Avatar
                        rounded
                        title={getAvatarName(player?.username || "")}
                        size={120}
                        source={
                            player?.avatar_url && {
                                uri: player?.avatar_url,
                            }
                        }
                        containerStyle={styles.avatarContainer}
                    />
                    <View style={styles.userDataAndEditContainer}>
                        <View style={styles.userDataContainer}>
                            <Text h4>{player?.full_name}</Text>
                            <Text style={styles.username}>{player?.username}</Text>
                        </View>
                        <Button onPress={handleFollow}>
                            {t(following ? "following" : "follow")}
                        </Button>
                    </View>
                </View>
                <View style={styles.bioContainer}>
                    <Text style={styles.position}>{t(player?.position.toLowerCase())}</Text>
                    <Text>{player?.bio}</Text>
                </View>
                <View style={styles.followingContainer}>
                    <Text>{`${followers.length} ${t("followers")}`}</Text>
                    <Text>{`${followings.length} ${t("following")}`}</Text>
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
        </View>
    );
});

export default PlayerProfile;

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
