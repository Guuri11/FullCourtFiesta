import React from "react";
import AppWrapper from "./src/components/core/AppWrapper";
import Security from "./src/components/core/Security";
import Notifications from "./src/components/design/layout/Notifications/Notifications";

export default function App() {
    return (
        <AppWrapper>
            <Security />
            <Notifications />
        </AppWrapper>
    );
}
