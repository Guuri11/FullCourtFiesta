import React, { useCallback, useEffect, useState } from "react";
import Navigation from "../router/Navigation";
import LoadingPage from "../design/common/Loading";
import { getData } from "../../hooks/useAsyncStorage";
import { useAuthenticationStore, useAuthorizationStore, useLoggingStore } from "../../hooks/store";
import { supabase } from "../../utils/supabase";

const Security = () => {
    const loggingStore = useLoggingStore();
    const authorizationStore = useAuthorizationStore();
    const authenticationStore = useAuthenticationStore();
    const [loading, setLoading] = useState(true);

    loggingStore.register("Security.tsx: Init");
    const showOnboardingHandler = useCallback(() => {
        getData("showOnboarding").then((value) => {
            loggingStore.register("Security.tsx: showOnboardingHandler() => " + value);
            if (value === "0") {
                authorizationStore.setShowOnboarding("0");
            } else {
                authorizationStore.setShowOnboarding("1");
            }
        });
    }, [authorizationStore.showOnboarding]);

    const handleSession = useCallback(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            loggingStore.register(
                "Security.tsx: Supabase getSession() => " + JSON.stringify(session?.user.email),
            );
            authenticationStore.setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            loggingStore.register(
                "Security.tsx: Supabase onAuthStateChange() => " + JSON.stringify(session?.user.email),
            );
            authenticationStore.setSession(session);
        });
    }, [authorizationStore.showOnboarding]);

    useEffect(() => {
        showOnboardingHandler();
        handleSession();
        setLoading(false);
    }, [authorizationStore.showOnboarding]);

    if (loading) {
        return <LoadingPage />;
    }

    return <Navigation />;
};

export default Security;
