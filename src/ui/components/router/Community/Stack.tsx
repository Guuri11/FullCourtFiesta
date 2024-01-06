import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Community from "./Community";
import CreatePost from "./CreatePost";

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Community' component={Community} options={{ title: "Comunidad" }} />
            <Stack.Screen name='CreatePost' component={CreatePost} options={{ title: "" }} />
        </Stack.Navigator>
    );
}
