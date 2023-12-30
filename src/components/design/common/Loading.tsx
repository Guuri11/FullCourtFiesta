import { Image } from "@rneui/themed";
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { log } from "../../../utils/logger";

const LoadingPage = () => {
    log.info("LoadingPage.tsx: Loading...");
    return (
        <View style={styles.container}>
            <Image
                source={require("../../../../assets/fullcourtfiesta-logo.png")}
                style={{ width: 150, height: 150, borderRadius: 15, marginBottom: 15 }}
            />
            <ActivityIndicator size='large' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default LoadingPage;
