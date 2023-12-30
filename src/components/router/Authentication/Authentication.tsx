import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "../../../utils/supabase";
import { Button, Input } from "@rneui/themed";
import { useAuthenticationStore, useLoggingStore, useUIStore } from "../../../hooks/store";

export default function Authentication() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const loggingStore = useLoggingStore();
    const uiStore = useUIStore();
    const authenticationStore = useAuthenticationStore();

    loggingStore.register("Authentication.tsx: Loading...");

    async function signInWithEmail() {
        setLoading(true);
        const {
            error,
            data: { session },
        } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            uiStore.notification.addNotification(error.message, "error");
        }

        if (!session) {
            uiStore.notification.addNotification("Por favor, confirma el registro en tu email");
        } else {
            setLoading(false);
            authenticationStore.setSession(session);
        }
    }

    async function signUpWithEmail() {
        setLoading(true);

        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            uiStore.notification.addNotification(error.message, "error");
        }

        if (!session) {
            uiStore.notification.addNotification("Por favor, confirma el registro en tu email");
        } else {
            setLoading(false);
            authenticationStore.setSession(session);
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    label='Email'
                    leftIcon={{ type: "font-awesome", name: "envelope" }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder='email@address.com'
                    autoCapitalize={"none"}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label='Password'
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder='Password'
                    autoCapitalize={"none"}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title='Sign in' disabled={loading} onPress={() => signInWithEmail()} />
            </View>
            <View style={styles.verticallySpaced}>
                <Button title='Sign up' disabled={loading} onPress={() => signUpWithEmail()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: "stretch",
    },
    mt20: {
        marginTop: 20,
    },
});
