import React, { useCallback, useEffect, useState } from "react";
import Navigation from "../router/Navigation";
import LoadingPage from "../design/common/Loading";
import { getData } from "../../hooks/useAsyncStorage";
import { useAuthenticationStore, useAuthorizationStore } from "../../hooks/store";
import { supabase } from "../../../infrastructure/persistance/supabase";
import { log } from "../../../infrastructure/config/logger";

const Security = () => {
    const authorizationStore = useAuthorizationStore();
    const authenticationStore = useAuthenticationStore();
    const [loading, setLoading] = useState(true);

    const showOnboardingHandler = useCallback(() => {
        getData("showOnboarding").then((value) => {
            if (value === "0") {
                authorizationStore.setShowOnboarding("0");
            } else {
                authorizationStore.setShowOnboarding("1");
            }
        });
    }, [authorizationStore.showOnboarding]);

    const handleSession = useCallback(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            authenticationStore.setSession(session);
        });

        supabase.auth.onAuthStateChange((event, session) => {
            log.info("The session has been updated: " + event);
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
