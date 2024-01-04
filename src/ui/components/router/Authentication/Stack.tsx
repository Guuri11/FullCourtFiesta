import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "./OnBoarding/OnBoarding";
import { observer } from "mobx-react-lite";
import { useAuthenticationStore, useAuthorizationStore } from "../../../hooks/store";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CompleteProfile from "./CompleteProfile";

const Stack = createNativeStackNavigator();

type Routes = "SignIn" | "OnBoarding" | "CompleteProfile";

export const AuthenticationStack = observer(() => {
    const [initialRoute, setInitialRoute] = useState<Routes>(null);
    const authorizationStore = useAuthorizationStore();
    const authenticationStore = useAuthenticationStore();

    useEffect(() => {
        if (!authenticationStore.isAuthenticated) {
            setInitialRoute("SignIn");
        }
        if (authorizationStore.showOnboarding === "1") {
            setInitialRoute("OnBoarding");
        }

        if (authenticationStore.userIsNew) {
            setInitialRoute("CompleteProfile")
        }
    }, [authorizationStore.showOnboarding]);

    if (!initialRoute) {
        return null;
    }

    return (
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name='CompleteProfile' component={CompleteProfile} options={{ headerShown: false }} />
            <Stack.Screen
                name='OnBoarding'
                component={OnBoarding}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
});
