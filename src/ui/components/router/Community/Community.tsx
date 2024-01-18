import { FlatList, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAppStore } from "../../../hooks/store";
import { PostServiceType } from "../../../../application/PostService";
import { PostRepositoryI } from "../../../../domain/Post/PostRepository";
import { Post } from "../../../../domain/Post/Post";
import CreatePostFAB from "../../design/common/CreatePostFAB";
import { PostPublication } from "./PostPublication";
import { BottomSheet, Button, makeStyles } from "@rneui/themed";

// TODO: refactor bottom sheet
// TODO: load data when created a new post by the user
const Community = () => {
    const styles = useStyles();
    const [posts, setPosts] = useState<Post[]>([]);
    const appStore = useAppStore();
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const getPosts = useCallback(() => {
        const { service, repository } = appStore.getService("post") as {
            service: PostServiceType;
            repository: PostRepositoryI;
        };

        service.find(repository).then((data) => {
            setPosts(data);
        });
    }, []);

    const openBottomSheet = (post: Post) => {
        setSelectedPost(post);
    };

    const closeBottomSheet = () => {
        setSelectedPost(null);
    };

    const removePost = () => {
        // TODO: Implement post removal logic
        closeBottomSheet();
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <View style={{ height: "100%" }}>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <PostPublication openBottomSheet={openBottomSheet} post={item} />
                )}
                keyExtractor={(item) => String(item.id)}
                // Performance settings
                initialNumToRender={10} // Adjust based on your needs
                maxToRenderPerBatch={10}
                windowSize={21} // The default is 21, which is ~7 screens
                removeClippedSubviews={true} // Unmount components when they are off screen
                // Lazy loading images
                // You may integrate other libraries like 'react-native-fast-image' for better image performance
            />
            <BottomSheet isVisible={selectedPost !== null}>
                <Button
                    title='Remove Post'
                    buttonStyle={styles.bottomSheetButtonDanger}
                    onPress={removePost}
                />
                <Button
                    title='Cancel'
                    buttonStyle={styles.bottomSheetButton}
                    onPress={closeBottomSheet}
                />
            </BottomSheet>

            <CreatePostFAB />
        </View>
    );
};

const useStyles = makeStyles((theme) => ({
    bottomSheetButton: {
        height: 70,
        marginVertical: 0,
    },
    bottomSheetButtonDanger: {
        height: 70,
        marginVertical: 0,
        backgroundColor: theme.colors.secondary,
    },
}));

export default Community;
