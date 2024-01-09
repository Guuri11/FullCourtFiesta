import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "./Search";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Search' component={Search} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
