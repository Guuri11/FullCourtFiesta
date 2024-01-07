import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import "../../../../infrastructure/locales/index";
import { Avatar, Button, makeStyles } from "@rneui/themed";
import { PlayerServiceType } from "../../../../application/PlayerService";
import { PlayerRepositoryI } from "../../../../domain/Player/PlayerRepository";
import { HeaderImage } from "../../design/common/HeaderImage";
import { getAvatarName } from "../../../../utils";
import CustomInput from "../../design/common/Form/CustomInput";
import CustomPicker from "../../design/common/Form/Picker";
import { Position } from "../../../../domain/Player/Player";

const ProfileEdit = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [position, setPosition] = useState<Position>("POINT_GUARD");
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(false);
    const authenticationStore = useAuthenticationStore();
    const appStore = useAppStore();
    const uiStore = useUIStore();
    const styles = useStyles();
    const { t } = useTranslation();
    const navigation = useNavigation();

    const positionValues = [
        { label: t("point_guard"), value: "POINT_GUARD" },
        { label: t("shooting_guard"), value: "SHOOTING_GUARD" },
        { label: t("small_forward"), value: "SMALL_FORWARD" },
        { label: t("power_forward"), value: "POWER_FORWARD" },
        { label: t("center"), value: "CENTER" },
    ];

    useEffect(() => {
        if (authenticationStore.session) getProfile();
    }, [authenticationStore.session]);

    async function getProfile() {
        const { service, repository } = appStore.getService("player") as {
            service: PlayerServiceType;
            repository: PlayerRepositoryI;
        };

        service
            .getProfile(repository, authenticationStore.session)
            .then(({ code, message, data }) => {
                if (code !== 200) {
                    uiStore.notification.addNotification(t(message));
                } else {
                    setBio(data.bio);
                    setFullName(data.full_name);
                    setUsername(data.username);
                    setPosition(data.position);
                    authenticationStore.setUser(data);
                }
            });
    }

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
                    navigation.goBack();
                }
                setLoading(false);
            });
    }

    return (
        <View style={{ height: "100%" }}>
            <HeaderImage avatarUrl={authenticationStore.user?.avatar_url} />
            <View style={styles.container}>
                <View style={styles.usernameContainer}>
                    <Avatar
                        rounded
                        title={getAvatarName(authenticationStore.user?.username || "")}
                        size={120}
                        source={
                            authenticationStore.user?.avatar_url && {
                                uri: authenticationStore.user?.avatar_url,
                            }
                        }
                        containerStyle={styles.avatarContainer}
                    />
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
            </View>
        </View>
    );
};

export default ProfileEdit;
const useStyles = makeStyles((theme) => ({
    avatarImage: {
        height: 120,
        width: 120,
        objectFit: "cover",
    },
    avatarContainer: {
        marginTop: -40,
        borderRadius: 60,
        backgroundColor: theme.colors.secondary,
    },
    container: {
        paddingHorizontal: 16,
    },
    usernameContainer: {
        display: "flex",
        flexDirection: "row",
    },
}));
