import { useContext } from "react";

import { AppContext } from "../../context";
import AppStore from "../../stores/app";
import LocationStore from "../../stores/app/location";
import UIStore from "../../stores/app/ui";
import AuthorizationStore from "../../stores/app/authorization";
import LoggingStore from "../../stores/app/logging";
import AuthenticationStore from "../../stores/app/authentication";

export const useAppStore = (): AppStore => {
    const context = useContext(AppContext);
    if (context === null) {
        console.log("Use the hook inside AppProvider");
    }
    return context;
};

export const useAuthorizationStore = (): AuthorizationStore => {
    const store = useAppStore();
    return store.authorizationStore;
};

export const useLocationStore = (): LocationStore => {
    const store = useAppStore();
    return store.locationStore;
};

export const useUIStore = (): UIStore => {
    const store = useAppStore();
    return store.UIStore;
};

export const useLoggingStore = (): LoggingStore => {
    const store = useAppStore();
    return store.loggingStore;
};

export const useAuthenticationStore = (): AuthenticationStore => {
    const store = useAppStore();
    return store.authenticationStore;
};
