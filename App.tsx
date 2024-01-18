import React from "react";
import AppWrapper from "./src/ui/components/core/AppWrapper";
import Security from "./src/ui/components/core/Security";
import Notifications from "./src/ui/components/design/layout/Notifications/Notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    return (
        <SafeAreaProvider>
            <AppWrapper>
                <Security />
                <Notifications />
            </AppWrapper>
        </SafeAreaProvider>
    );
}
