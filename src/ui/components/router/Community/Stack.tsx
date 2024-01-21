import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Community from "./Community";
import CreatePost from "./CreatePost";
import PlayerProfile from "./PlayerProfile";
import Chat from "./Chat";

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Community'
                component={Community}
                options={{ title: "Comunidad", headerBackVisible: false }}
            />
            <Stack.Screen name='CreatePost' component={CreatePost} options={{ title: "" }} />
            <Stack.Screen
                name='PlayerProfile'
                component={PlayerProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>
    );
}
