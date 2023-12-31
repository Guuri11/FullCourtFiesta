import { View } from "react-native";
import React, { useState } from "react";
import Container from "../../design/layout/Container";
import { Button, Text, makeStyles } from "@rneui/themed";
import "../../../../infrastructure/locales/index";
import { useTranslation } from "react-i18next";
import { useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { supabase } from "../../../../infrastructure/persistance/supabase";
import CustomInput from "../../design/common/Form/Input";
import Anchor from "../../design/common/Anchor";
import { log } from "../../../../infrastructure/config/logger";

const SignIn = () => {
    const styles = useStyles();
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const uiStore = useUIStore();
    const authenticationStore = useAuthenticationStore();

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
            log.success("The user has signed in successfully 👏");
        }
    }

    return (
        <Container>
            <View style={styles.iconContainer}>
                <View style={styles.icon}>
                    <Text style={styles.iconContent}>👋</Text>
                </View>
            </View>
            <View>
                <Text h1 style={styles.title}>
                    {t("sign_in")}
                </Text>
                <Text style={styles.subtitle}>{t("welcome_back")}</Text>
            </View>
            <CustomInput
                placeholder={t("email")}
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize='none'
            />
            <CustomInput
                placeholder={t("password")}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
                autoCapitalize={"none"}
            />
            <Button disabled={loading} onPress={signInWithEmail}>
                {t("log_in")}
            </Button>
            <View style={styles.goToRegisterContainer}>
                <Text>{t("dont_have_account")}</Text>
                <Anchor styles={styles.signUpButton} route='SignUp' content={t("sign_up")} />
            </View>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    iconContainer: {
        marginVertical: 45,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        borderRadius: 25,
        backgroundColor: "#D6DFFF",
        width: 90,
        height: 90,
        justifyContent: "center",
        alignItems: "center",
    },
    iconContent: {
        fontSize: 50,
    },
    title: {
        textAlign: "center",
        color: theme.colors.primary,
    },
    subtitle: {
        textAlign: "center",
        color: theme.colors.grey3,
        marginTop: 8,
        marginBottom: 24,
    },
    goToRegisterContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 12,
    },
    signUpButton: {
        color: theme.colors.primary,
        marginLeft: 4,
    },
}));

export default SignIn;
