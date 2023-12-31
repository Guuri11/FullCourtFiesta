import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Image } from "@rneui/base";
import { useAuthorizationStore } from "../../../../hooks/store";
import { useTheme } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import "../../../../../infrastructure/locales/index"
import LottieView from "lottie-react-native";
import { log } from "../../../../../infrastructure/config/logger";

export default function OnBoarding({ navigation }) {
    const { t } = useTranslation();
    const authorizationStore = useAuthorizationStore();
    const { theme } = useTheme();
    const [showLottie, setShowLottie] = useState(false);
    const lottieAnimation = useRef(null);

    log.info("The user is seeing the onboarding for first time");

    const slides = [
        {
            key: 1,
            title: t("welcome_to_fullcourtfiesta"),
            text: t("your_app_to_find_and_play_with_other_fans"),
            image: require("../../../../../../assets/slider-1.png"),
        },
        {
            key: 2,
            title: t("dominate_with_your_friends"),
            text: t("chat_invite_join"),
            image: require("../../../../../../assets/slider-2.png"),
        },
        {
            key: 3,
            title: t("from_rookie_to_hall_of_fame"),
            text: t("track_your_stats_get_feedback"),
            image: require("../../../../../../assets/slider-3.png"),
        },
    ];

    const _renderItem = ({ item }) => {
        return (
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <View>
                    <Image source={item.image} style={styles.image} />
                </View>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    };

    const handleShowLottie = () => {
        setShowLottie(true);
    };

    const finishOnBoarding = () => {
        navigation.navigate("Authentication");
        authorizationStore.setShowOnboarding("0");
        log.info("The user has finished the Onboarding");
    }

    if (showLottie) {
        return (
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <LottieView
                    autoPlay
                    ref={lottieAnimation}
                    style={{
                        width: 350,
                        height: 350,
                    }}
                    loop={false}
                    onAnimationFinish={finishOnBoarding}
                    source={require("../../../../../../assets/lottie/basketballHoop.json")}
                />
            </View>
        );
    }

    return (
        <AppIntroSlider
            keyExtractor={(item) => item.key.toString()}
            renderItem={_renderItem}
            data={slides}
            onDone={handleShowLottie}
            onSkip={handleShowLottie}
            bottomButton
            style={{ backgroundColor: "#fff" }}
            activeDotStyle={{ backgroundColor: theme.colors.primary }}
            nextLabel={t("next")}
            doneLabel={t("start_my_carreer")}
        />
    );
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        resizeMode: "cover",
    },
    content: {
        flex: 1,
        margin: 10,
        marginTop: 50,
        justifyContent: "space-between",
        alignItems: "center",
        maxHeight: "80%",
    },
    text: {
        textAlign: "center",
        fontSize: 18,
    },
    title: {
        fontSize: 32,
        textAlign: "center",
        fontWeight: "700",
    },
    image: {
        width: 350,
        height: 400,
    },
});
