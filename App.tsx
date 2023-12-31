import React from "react";
import AppWrapper from "./src/ui/components/core/AppWrapper";
import Security from "./src/ui/components/core/Security";
import Notifications from "./src/ui/components/design/layout/Notifications/Notifications";

export default function App() {
    return (
        <AppWrapper>
            <Security />
            <Notifications />
        </AppWrapper>
    );
}
