import { View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Icon, Text, makeStyles } from "@rneui/themed";
import { getAvatarName } from "../../../../utils";
import { Avatar } from "@rneui/base";
import { Player } from "../../../../domain/Player/Player";
import { useNavigation } from "@react-navigation/native";
import { FriendshipServiceType } from "../../../../application/FriendshipService";
import { FriendshipRepositoryI } from "../../../../domain/Friendship/FriendshipRepository";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../hooks/store";

type PlayerPropsType = {
    player: Player;
};

export const PlayerSearchResult = ({ player }: PlayerPropsType) => {
    const styles = useStyles();
    const navigation = useNavigation();
    const appStore = useAppStore();
    const authenticationStore = useAuthenticationStore();
    const uiStore = useUIStore();
    const [following, setFollowing] = useState<boolean>(false);

    useEffect(() => {
        isFollowing();
    }, [player]);

    const handleGoToPlayerProfile = () => {
        //@ts-ignore
        navigation.navigate("CommunityStack", {
            screen: "PlayerProfile",
            params: { playerId: player.id },
        });
    };

    const handleFollow = () => {
        const { service, repository } = appStore.getService("friendship") as {
            service: FriendshipServiceType;
            repository: FriendshipRepositoryI;
        };

        service
            .create(repository, {
                player: player.id,
                follower: authenticationStore.session.user.id,
            })
            .then(({ code, message }) => {
                if (code !== 200) {
                    uiStore.notification.addNotification(message, "error");
                } else {
                    setFollowing(true);
                }
            });
    };

    const handleUnFollow = () => {
        const { service, repository } = appStore.getService("friendship") as {
            service: FriendshipServiceType;
            repository: FriendshipRepositoryI;
        };

        service
            .remove(repository, player.id, authenticationStore.session.user.id)
            .then(({ code, message }) => {
                if (code !== 200) {
                    uiStore.notification.addNotification(message, "error");
                } else {
                    setFollowing(false);
                }
            });
    };

    const handleFollowButton = () => {
        if (following) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    };

    const isFollowing = useCallback(() => {
        const { service, repository } = appStore.getService("friendship") as {
            service: FriendshipServiceType;
            repository: FriendshipRepositoryI;
        };

        service
            .findByPlayerIdAndFollowerId(repository, player.id, authenticationStore.session.user.id)
            .then((result) => setFollowing(result));
    }, []);

    return (
        <View style={styles.playerContainer}>
            <Avatar
                rounded
                title={getAvatarName(player.username)}
                size={48}
                source={player.avatar_url && { uri: player.avatar_url }}
                containerStyle={styles.avatar}
                onPress={handleGoToPlayerProfile}
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.username} onPress={handleGoToPlayerProfile}>
                    {player.username}
                </Text>
                <Text onPress={handleGoToPlayerProfile}>{player.full_name}</Text>
            </View>
            <Button
                radius={"lg"}
                size='md'
                type={`${following ? "solid" : "outline"}`}
                onPress={handleFollowButton}
            >
                <Icon
                    name={`${following ? "person-remove-outline" : "person-add-outline"}`}
                    type='ionicon'
                />
            </Button>
        </View>
    );
};

const useStyles = makeStyles((theme) => ({
    playerContainer: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e1e8ed",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        position: "relative",
    },
    avatar: {
        marginRight: 10,
        backgroundColor: theme.colors.secondary,
    },
    username: {
        fontWeight: "bold",
    },
}));
