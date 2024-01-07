import { View } from "react-native";
import React from "react";
import { Button, Icon, Image, Text, makeStyles } from "@rneui/themed";
import { Post } from "../../../../domain/Post/Post";
import { getAvatarName } from "../../../../utils";
import { Avatar } from "@rneui/base";

type PostPublicationType = {
    post: Post;
};
// TODO: handle event dialog
// TODO: handle go to user profile when clicking on avatar
export const PostPublication = ({ post }: PostPublicationType) => {
    const styles = useStyles();

    return (
        <View style={styles.postContainer}>
            <Avatar
                rounded
                title={getAvatarName(post.player.username)}
                size={48}
                source={post.player.avatar_url && { uri: post.player.avatar_url }}
                containerStyle={styles.avatar}
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.username}>{post.player.username}</Text>
                <Text>{post.content}</Text>
                {post.photo && <Image style={styles.postImage} source={{ uri: post.photo }} />}
                <View style={styles.actionsContainer}>
                    <Button
                        containerStyle={styles.actionButton}
                        radius={"sm"}
                        size='sm'
                        type='clear'
                        disabled={!post.event}
                    >
                        <Icon
                            name='basketball-outline'
                            type='ionicon'
                            iconStyle={post.event ? styles.actionIcon : styles.actionIconDisabled}
                        />
                    </Button>
                </View>
            </View>
        </View>
    );
};

const useStyles = makeStyles((theme) => ({
    postContainer: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e1e8ed",
        minHeight: 120,
        position: "relative",
    },
    avatar: {
        marginRight: 10,
        backgroundColor: theme.colors.secondary,
    },
    username: {
        fontWeight: "bold",
    },
    postImage: {
        height: 200,
        objectFit: "cover",
        width: "85%",
        marginTop: 10,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.colors.grey3,
    },
    actionsContainer: {
        position: "absolute",
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "flex-end",
    },
    actionButton: {},
    actionIcon: {
        color: theme.colors.primary,
    },
    actionIconDisabled: {
        color: theme.colors.grey3,
    },
}));
