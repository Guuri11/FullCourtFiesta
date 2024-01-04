import React, { useState } from "react";
import Container from "../../design/layout/Container";
import { Button, Text, makeStyles } from "@rneui/themed";
import "../../../../infrastructure/locales/index";
import { useTranslation } from "react-i18next";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { View } from "react-native";
import CustomInput from "../../design/common/Form/CustomInput";
import CustomPicker from "../../design/common/Form/Picker";
import { Position } from "../../../../domain/Player/Player";
import { PlayerServiceType } from "../../../../application/PlayerService";
import { PlayerRepositoryI } from "../../../../domain/Player/PlayerRepository";

const CompleteProfile = () => {
    const styles = useStyles();
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [position, setPosition] = useState<Position>("POINT_GUARD");
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(false);
    const uiStore = useUIStore();
    const authenticationStore = useAuthenticationStore();
    const appStore = useAppStore();

    const positionValues = [
        { label: t("point_guard"), value: "POINT_GUARD" },
        { label: t("shooting_guard"), value: "SHOOTING_GUARD" },
        { label: t("small_forward"), value: "SMALL_FORWARD" },
        { label: t("power_forward"), value: "POWER_FORWARD" },
        { label: t("center"), value: "CENTER" },
    ];

    async function handleSubmit() {
        setLoading(true);

        const { service, repository } = appStore.getService("player") as {
            service: PlayerServiceType;
            repository: PlayerRepositoryI;
        };

        service
            .completeProfile(repository, {
                username,
                fullName,
                position,
                bio,
                userId: authenticationStore.session.user.id,
            })
            .then(({ code, message }) => {
                if (code === 500) {
                    uiStore.notification.addNotification(message, "error");
                }

                if (code === 200) {
                    authenticationStore.setUserIsNew(false);
                }
                setLoading(false);
            });
    }

    return (
        <Container>
            <View style={styles.iconContainer}>
                <View style={styles.icon}>
                    <Text style={styles.iconContent}>🏀</Text>
                </View>
            </View>
            <View>
                <Text h1 style={styles.title}>
                    {t("complete_your_profile")}
                </Text>
                <Text style={styles.subtitle}>{t("add_additional_info")}</Text>
            </View>
            <CustomInput
                placeholder={t("full_name")}
                onChangeText={(text) => setFullName(text)}
                value={fullName}
                autoCapitalize='none'
            />
            <CustomInput
                placeholder={t("username")}
                onChangeText={(text) => setUsername(text)}
                value={username}
                autoCapitalize='none'
            />
            <CustomInput
                placeholder={t("bio")}
                onChangeText={(text) => setBio(text)}
                value={bio}
                multiline
                numberOfLines={5}
                autoCapitalize='none'
            />
            <CustomPicker
                onValueChange={(v) => setPosition(v as Position)}
                items={positionValues}
                selectedValue={position}
                label={t("position")}
            />
            <Button disabled={loading} onPress={handleSubmit}>
                {t("save")}
            </Button>
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
}));

export default CompleteProfile;
