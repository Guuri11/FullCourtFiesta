import { FlatList, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAppStore } from "../../../hooks/store";
import { PostServiceType } from "../../../../application/PostService";
import { PostRepositoryI } from "../../../../domain/Post/PostRepository";
import { Post } from "../../../../domain/Post/Post";
import CreatePostFAB from "../../design/common/CreatePostFAB";
import { PostPublication } from "./PostPublication";

// TODO: load data when created a new post by the user
const Community = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const appStore = useAppStore();
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
        <View style={{ height: "100%" }}>
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
            <CreatePostFAB />
        </View>
    );
};

export default Community;
