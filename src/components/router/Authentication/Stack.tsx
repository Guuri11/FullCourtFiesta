import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "./OnBoarding/OnBoarding";
import { observer } from "mobx-react-lite";
import { useAuthenticationStore, useAuthorizationStore } from "../../../hooks/store";
import Authentication from "./Authentication";

const Stack = createNativeStackNavigator();

type Routes = "Authentication" | "OnBoarding";

export const AuthenticationStack = observer(() => {
    const [initialRoute, setInitialRoute] = useState<Routes>(null);
    const authorizationStore = useAuthorizationStore();
    const authenticationStore = useAuthenticationStore();

    useEffect(() => {
        if (!authenticationStore.isAuthenticated) {
            setInitialRoute("Authentication");
        }
        if (authorizationStore.showOnboarding === "1") {
            setInitialRoute("OnBoarding");
        }
    }, [authorizationStore.showOnboarding]);

    if (!initialRoute) {
        return null;
    }

    return (
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Authentication'
                component={Authentication}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='OnBoarding'
                component={OnBoarding}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
});
