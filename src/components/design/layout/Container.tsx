// Container.js
import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

const Container = ({ children }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white", // Puedes ajustar el color de fondo según tus preferencias
    },
    container: {
        flex: 1,
        paddingHorizontal: 16, // Puedes ajustar estos márgenes según tus necesidades
        paddingTop: 8, // Ajusta el espacio superior según tus necesidades
        paddingBottom: 8, // Ajusta el espacio inferior según tus necesidades
    },
});

export default Container;
