import { View } from "react-native";
import React from "react";
import { Button, Icon, Text, makeStyles } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Court } from "../../../../domain/Court/Court";

type CourtPropsType = {
    court: Court;
};

export const CourtSearchResult = ({ court }: CourtPropsType) => {
    const styles = useStyles();
    const navigation = useNavigation();

    const handleGoToCourt = () => {};

    return (
        <View style={styles.playerContainer}>
            <View style={{ flex: 1 }}>
                <Text style={styles.username}>{court.name}</Text>
                <Text onPress={() => {}}>{court.direction}</Text>
            </View>
            <Button radius={"lg"} size='md' type='outline'>
                <Icon name='basketball' type='ionicon' />
            </Button>
        </View>
    );
};

const useStyles = makeStyles((theme) => ({
    playerContainer: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e1e8ed",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        position: "relative",
    },
    avatar: {
        marginRight: 10,
        backgroundColor: theme.colors.secondary,
    },
    username: {
        fontWeight: "bold",
    },
}));
