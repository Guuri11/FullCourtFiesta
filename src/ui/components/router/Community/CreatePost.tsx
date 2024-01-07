import { View } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../design/common/Form/CustomInput";
import "../../../../infrastructure/locales/index";
import { useTranslation } from "react-i18next";
import Container from "../../design/layout/Container";
import { Button, Icon, makeStyles } from "@rneui/themed";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { PostServiceType } from "../../../../application/PostService";
import { PostRepositoryI } from "../../../../domain/Post/PostRepository";
import { useNavigation } from "@react-navigation/native";

// TODO: handle event & image action
const CreatePost = () => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const styles = useStyles();
    const appStore = useAppStore();
    const authenticationStore = useAuthenticationStore();
    const uiStore = useUIStore();
    const navigation = useNavigation();

    const handleSubmit = () => {
        setLoading(true);
        const { service, repository } = appStore.getService("post") as {
            service: PostServiceType;
            repository: PostRepositoryI;
        };

        service
            .create(repository, { content, playerId: authenticationStore?.session?.user.id })
            .then(({ code, message }) => {
                if (code !== 200) {
                    uiStore.notification.addNotification(message, "error");
                } else {
                    navigation.goBack();
                }
                setLoading(false);
            });
    };

    return (
        <Container>
            <CustomInput
                placeholder={t("how_was_your_pickup_game")}
                onChangeText={(text) => setContent(text)}
                value={content}
                multiline
                numberOfLines={5}
                autoCapitalize='none'
            />
            <View style={styles.actionsContainer}>
                <Button containerStyle={styles.actionButton} radius={"sm"} size='sm' type='clear'>
                    <Icon name='basketball-outline' type='ionicon' iconStyle={styles.actionIcon} />
                </Button>
                <Button containerStyle={styles.actionButton} radius={"sm"} size='sm' type='clear'>
                    <Icon name='image-outline' type='ionicon' iconStyle={styles.actionIcon} />
                </Button>
            </View>
            <Button onPress={handleSubmit} disabled={loading} loading={loading}>
                {t("save")}
            </Button>
        </Container>
    );
};

export default CreatePost;

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 14,
        marginLeft: 20,
    },
    actionButton: {},
    actionIcon: {
        color: theme.colors.primary,
    },
}));
