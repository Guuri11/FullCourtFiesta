import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";
import CreatePost from "../Community/CreatePost";
import Settings from "./Settings";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
            <Stack.Screen
                name='ProfileEdit'
                component={ProfileEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen name='CreatePost' component={CreatePost} options={{ title: "" }} />
            <Stack.Screen name='Settings' component={Settings} />
        </Stack.Navigator>
    );
}
