import { FlatList, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Image, Text, makeStyles, useTheme } from "@rneui/themed";
import { useAppStore } from "../../../hooks/store";
import { PostServiceType } from "../../../../application/PostService";
import { PostRepositoryI } from "../../../../domain/Post/PostRepository";
import { Post } from "../../../../domain/Post/Post";
import CreatePostFAB from "../../design/common/CreatePostFAB";

const tweets = [
    {
        id: "1",
        username: "User1",
        content: "This is the first tweet",
        avatarUrl: "https://placekitten.com/200/200",
        imageUrl: "https://placekitten.com/200/208",
    },
    {
        id: "2",
        username: "User2",
        content: "Here is another sample tweet",
        avatarUrl: "https://placekitten.com/200/202",
        imageUrl: "https://placekitten.com/200/205",
    },
    {
        id: "3",
        username: "User3",
        content: "More tweet content here",
        avatarUrl: "https://placekitten.com/200/204",
        imageUrl: "https://placekitten.com/200/206",
    },
    // Add more tweets to the mock data...
];

const Tweet = ({ item }) => {
    const styles = useStyles();
    return (
        <View style={styles.tweetContainer}>
            <Avatar rounded source={{ uri: item.avatarUrl }} containerStyle={styles.avatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.username}>{item.username}</Text>
                <Text>{item.content}</Text>
                <Image style={styles.postImage} source={{ uri: item.imageUrl }} />
            </View>
        </View>
    );
};

const Community = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const appStore = useAppStore();
    const { theme } = useTheme();
    const getPosts = useCallback(() => {
        const { service, repository } = appStore.getService("post") as {
            service: PostServiceType;
            repository: PostRepositoryI;
        };

        service.find(repository).then((data) => {
            setPosts(data);
        });
    }, []);

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <View>
            <FlatList
                data={tweets}
                renderItem={({ item }) => <Tweet item={item} />}
                keyExtractor={(item) => item.id}
                // Performance settings
                initialNumToRender={10} // Adjust based on your needs
                maxToRenderPerBatch={10}
                windowSize={21} // The default is 21, which is ~7 screens
                removeClippedSubviews={true} // Unmount components when they are off screen
                // Lazy loading images
                // You may integrate other libraries like 'react-native-fast-image' for better image performance
            />
            <CreatePostFAB />
        </View>
    );
};

export default Community;

const useStyles = makeStyles((theme) => ({
    tweetContainer: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e1e8ed",
    },
    avatar: {
        marginRight: 10,
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
}));
