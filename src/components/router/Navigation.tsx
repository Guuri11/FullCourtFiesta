import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./Home/Stack";
import { Icon } from "@rneui/themed";
import { observer } from "mobx-react-lite";
import { useAuthenticationStore, useAuthorizationStore } from "../../hooks/store";
import { AuthenticationStack } from "./Authentication/Stack";
import CommunityStack from "./Community/Stack";
import ProfileStack from "./Profile/Stack";

const Tab = createBottomTabNavigator();

const Navigation = observer(() => {
    const authorizationStore = useAuthorizationStore();
    const authenticationStore = useAuthenticationStore();

    return (
        <NavigationContainer>
            {authorizationStore.showOnboarding == "0" && authenticationStore.isAuthenticated ? (
                <MainNavigation />
            ) : (
                <AuthenticationNavigation />
            )}
        </NavigationContainer>
    );
});

const MainNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='HomeStack'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Icon type='ionicon' name={getIcon(route.name)} size={size} color={color} />
                    );
                },
            })}
        >
            <Tab.Screen
                name='HomeStack'
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen
                name='CommunityStack'
                component={CommunityStack}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen
                name='ProfileStack'
                component={ProfileStack}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            />
        </Tab.Navigator>
    );
};

const AuthenticationNavigation = () => (
    <Tab.Navigator
        initialRouteName='AuthenticationStack'
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                return <Icon type='ionicon' name={getIcon(route.name)} size={size} color={color} />;
            },
            tabBarStyle: { display: "none" },
            tabBarInactiveTintColor: "black",
        })}
    >
        <Tab.Screen
            name='AuthenticationStack'
            component={AuthenticationStack}
            options={{
                title: "Authentication",
                tabBarShowLabel: false,
                headerShown: false,
            }}
        />
    </Tab.Navigator>
);

const getIcon = (route: string) => {
    if (route === "HomeStack") {
        return "basketball-outline";
    }

    if (route === "CommunityStack") {
        return "globe-outline";
    }

    if (route === "ProfileStack") {
        return "person-circle-outline";
    }
};

export default Navigation;
