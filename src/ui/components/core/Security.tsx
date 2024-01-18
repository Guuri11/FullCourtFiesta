import React, { useCallback, useEffect, useState } from "react";
import Navigation from "../router/Navigation";
import LoadingPage from "../design/common/Loading";
import { getData } from "../../hooks/useAsyncStorage";
import { useAuthenticationStore, useAuthorizationStore } from "../../hooks/store";
import { supabase } from "../../../infrastructure/persistance/supabase";
import { log } from "../../../infrastructure/config/logger";
import { DatabaseConnection } from "../../../infrastructure/config/db-connection";

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

    useEffect(() => {
        if (!authenticationStore.session?.user) {
            return;
        }
        const db = DatabaseConnection.getConnection();

        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='court'",
                [],
                function (_tx, res) {
                    if (res.rows.length == 0) {
                        txn.executeSql("DROP TABLE IF EXISTS court", []);
                        txn.executeSql(
                            "CREATE TABLE IF NOT EXISTS court(id INTEGER PRIMARY KEY, name TEXT, direction TEXT, latitude REAL, longitude REAL, players_near INTEGER)",
                            [],
                        );
                    }
                },
            );
        });
    }, [authenticationStore.session]);

    if (loading) {
        return <LoadingPage />;
    }

    return <Navigation />;
};

export default Security;
