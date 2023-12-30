import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Image } from "@rneui/base";
import { useAuthorizationStore, useLoggingStore } from "../../../../hooks/store";
import { useTheme } from "@rneui/themed";
import LottieView from "lottie-react-native";

export default function OnBoarding({ navigation }) {
    const authorizationStore = useAuthorizationStore();
    const loggingStore = useLoggingStore();
    const { theme } = useTheme();
    const [showLottie, setShowLottie] = useState(false);
    const lottieAnimation = useRef(null);

    loggingStore.register("Onboarding.tsx: loading");

    const slides = [
        {
            key: 1,
            title: "Bienvenido a FullCourtFiesta\n 🏀🎊",
            text: "Tu aplicación para encontrar y jugar con otros fans de baloncesto a tu alreadedor",
            image: require("../../../../../assets/slider-1.png"),
        },
        {
            key: 2,
            title: "Domina la pista con tus amigos",
            text: "Chatea, invita y únete a otros jugadores en partidas, eventos o equipos. O crea tu propia comunidad acogiéndolos",
            image: require("../../../../../assets/slider-2.png"),
        },
        {
            key: 3,
            title: "De rookie al salón de la fama",
            text: "Sigue tus estadísticas, recibe comentarios y aprende de los expertos. Desafíate a ti mismo y a los demás con objetivos e insignias.",
            image: require("../../../../../assets/slider-3.png"),
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

    const handleFinish = () => {
        setShowLottie(true);
    };

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
                    onAnimationFinish={() => {
                        navigation.navigate("Authentication");
                        authorizationStore.setShowOnboarding("0");
                    }}
                    source={require("../../../../../assets/lottie/basketballHoop.json")}
                />
            </View>
        );
    }

    return (
        <AppIntroSlider
            keyExtractor={(item) => item.key.toString()}
            renderItem={_renderItem}
            data={slides}
            onDone={handleFinish}
            onSkip={handleFinish}
            bottomButton
            style={{ backgroundColor: "#fff" }}
            activeDotStyle={{ backgroundColor: theme.colors.primary }}
            nextLabel='Siguiente'
            doneLabel='Empezar mi carrera'
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
