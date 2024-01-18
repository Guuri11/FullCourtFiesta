import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, ListItem, Switch, makeStyles } from "@rneui/themed";
import Container from "../../design/layout/Container";
import { useAppStore, useAuthenticationStore } from "../../../hooks/store";
import { observer } from "mobx-react-lite";
import { AuthenticationServiceType } from "../../../../application/AuthenticationService";
import { AuthenticationRepositoryI } from "../../../../domain/Authentication/AuthenticationRepository";

const Settings = observer(() => {
    const styles = useStyles();
    const appStore = useAppStore();
    const authenticationStore = useAuthenticationStore();

    const handleSignOut = () => {
        const { service, repository } = appStore.getService("authentication") as {
            service: AuthenticationServiceType;
            repository: AuthenticationRepositoryI;
        };
        service.signOut(repository);
        authenticationStore.setSession(null);
    };

    return (
        <Container>
            <Button onPress={handleSignOut}>Sign out</Button>
        </Container>
    );
});

export default Settings;

const useStyles = makeStyles((theme) => ({}));
