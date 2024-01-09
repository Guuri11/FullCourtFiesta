import { View } from "react-native";
import React from "react";
import { Button, Icon, Text, makeStyles } from "@rneui/themed";
import { getAvatarName } from "../../../../utils";
import { Avatar } from "@rneui/base";
import { Player } from "../../../../domain/Player/Player";

type PlayerPropsType = {
    player: Player;
};

export const PlayerSearchResult = ({ player }: PlayerPropsType) => {
    const styles = useStyles();

    return (
        <View style={styles.playerContainer}>
            <Avatar
                rounded
                title={getAvatarName(player.username)}
                size={48}
                source={player.avatar_url && { uri: player.avatar_url }}
                containerStyle={styles.avatar}
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.username}>{player.username}</Text>
                <Text style={styles.fullName}>{player.full_name}</Text>
            </View>
            <Button radius={"lg"} size='md' type='outline'>
                <Icon name='person-add-outline' type='ionicon' />
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
    fullName: {},
}));
