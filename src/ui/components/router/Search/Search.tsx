import { FlatList, View } from "react-native";
import React, { useState } from "react";
import { Tab, SearchBar, makeStyles, TabView } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../../../../infrastructure/locales/index";
import { useTranslation } from "react-i18next";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { PlayerServiceType } from "../../../../application/PlayerService";
import { PlayerRepositoryI } from "../../../../domain/Player/PlayerRepository";
import { PlayerSearchResult } from "./PlayerSearchResult";

const Search = () => {
    const [index, setIndex] = useState(0);
    const [search, setSearch] = useState("");
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();
    const appStore = useAppStore();
    const uiStore = useUIStore();
    const [players, setPlayers] = useState([]);
    const authenticationStore = useAuthenticationStore();

    const updateSearch = (text: string) => {
        setSearch(text);
    };

    const updateTab = (tabIndex: number) => {
        setIndex(tabIndex);
    };

    const handleSearchSubmit = () => {
        if (search === "") {
            return;
        }
        const { service, repository } = appStore.getService("player") as {
            service: PlayerServiceType;
            repository: PlayerRepositoryI;
        };

        service
            .search(repository, search, authenticationStore.session.user.id)
            .then(({ code, message, data }) => {
                if (code !== 200) {
                    uiStore.notification.addNotification(t(message), "error");
                    setPlayers([]);
                } else {
                    setPlayers(data);
                }
            });
    };

    return (
        <>
            <View style={{ paddingTop: insets.top }}>
                <SearchBar
                    placeholder={t("search_here")}
                    onChangeText={updateSearch}
                    value={search}
                    lightTheme
                    round
                    onEndEditing={handleSearchSubmit}
                />
            </View>
            <Tab
                value={index}
                onChange={updateTab}
                indicatorStyle={{
                    backgroundColor: "white",
                    height: 2,
                }}
                variant='primary'
            >
                <Tab.Item
                    title={t("courts")}
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: "location", type: "ionicon", color: "white" }}
                />
                <Tab.Item
                    title={t("players")}
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: "people", type: "ionicon", color: "white" }}
                />
            </Tab>
            <TabView value={index} onChange={updateTab} animationType='spring'>
                <TabView.Item style={{ width: "100%" }}>
                    <FlatList
                        data={players}
                        renderItem={({ item }) => <PlayerSearchResult player={item} />}
                        keyExtractor={(item) => String(item.id)}
                        // Performance settings
                        initialNumToRender={10} // Adjust based on your needs
                        maxToRenderPerBatch={10}
                        windowSize={21} // The default is 21, which is ~7 screens
                        removeClippedSubviews={true} // Unmount components when they are off screen
                        // Lazy loading images
                        // You may integrate other libraries like 'react-native-fast-image' for better image performance
                    />
                </TabView.Item>
                <TabView.Item style={{ width: "100%" }}>
                    <FlatList
                        data={players}
                        renderItem={({ item }) => <PlayerSearchResult player={item} />}
                        keyExtractor={(item) => String(item.id)}
                        // Performance settings
                        initialNumToRender={10} // Adjust based on your needs
                        maxToRenderPerBatch={10}
                        windowSize={21} // The default is 21, which is ~7 screens
                        removeClippedSubviews={true} // Unmount components when they are off screen
                        // Lazy loading images
                        // You may integrate other libraries like 'react-native-fast-image' for better image performance
                    />
                </TabView.Item>
            </TabView>
        </>
    );
};

export default Search;

const useStyles = makeStyles((theme) => ({}));
