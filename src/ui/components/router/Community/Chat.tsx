import { Icon } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import {
    GiftedChat,
    IMessage,
    Send,
    SendProps,
    SystemMessage,
    User,
} from "react-native-gifted-chat";
import { useAppStore, useAuthenticationStore, useUIStore } from "../../../hooks/store";
import { Player } from "../../../../domain/Player/Player";
import { MessageServiceType } from "../../../../application/MessageService";
import { MessageRepositoryI } from "../../../../domain/Message/MessageRepository";
import { RouteProp } from "@react-navigation/native";
import { observer } from "mobx-react-lite";

type ChatProps = {
    route: RouteProp<{ params: { player: Player } }, "params">;
};

const Chat = observer(({ route }: ChatProps) => {
    const { player } = route.params;
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState<User>(null);
    const appStore = useAppStore();
    const authenticationStore = useAuthenticationStore();
    const uiStore = useUIStore();

    const onSend = useCallback(
        (messagesReceived: any[]) => {
            const { service, repository } = appStore.getService("message") as {
                service: MessageServiceType;
                repository: MessageRepositoryI;
            };

            service
                .create(repository, {
                    id: null,
                    content: messagesReceived[0].text,
                    sender:
                        messagesReceived[0].user._id === user._id
                            ? authenticationStore.user
                            : player,
                    receiver:
                        messagesReceived[0].user._id !== user._id
                            ? authenticationStore.user
                            : player,
                })
                .then(({ code, message }) => {
                    if (code !== 200) {
                        uiStore.notification.addNotification(message, "error");
                    } else {
                        const sentMessages = [{ ...messagesReceived[0], sent: true }];
                        const newMessages = GiftedChat.append(
                            messages,
                            sentMessages,
                            Platform.OS !== "web",
                        );
                        setMessages(newMessages);
                    }
                });
        },
        [messages],
    );

    const onPressAvatar = useCallback(() => {
        Alert.alert("On avatar press");
    }, []);

    const renderSystemMessage = useCallback((props: any) => {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        );
    }, []);

    const renderSend = useCallback((props: SendProps<IMessage>) => {
        return (
            <Send {...props} containerStyle={{ justifyContent: "center" }}>
                <Icon type='ionicon' name='send-outline' />
            </Send>
        );
    }, []);

    const getMessages = useCallback(() => {
        const { service, repository } = appStore.getService("message") as {
            service: MessageServiceType;
            repository: MessageRepositoryI;
        };

        service.find(repository, user._id as string, player.id).then(({ code, data }) => {
            if (code === 200) {
                const giftedChatMessages = data.map((m: any) => {
                    return {
                        _id: m.id,
                        text: m.content,
                        user:
                            m.sender_id === player.id
                                ? {
                                      _id: player.id,
                                      name: player.username,
                                  }
                                : user,
                    };
                });
                setMessages(giftedChatMessages);
            }
        });
    }, [user, player]);

    useEffect(() => {
        if (authenticationStore.user) {
            setUser({
                _id: authenticationStore.user.id,
                name: authenticationStore.user.username,
            });
        }
    }, [authenticationStore.user]);

    useEffect(() => {
        if (user !== null && player) {
            const intervalId = setInterval(getMessages, 5000);
            return () => clearInterval(intervalId);
        }
    }, [user, player]);

    return (
        <View style={styles.content}>
            <GiftedChat
                messages={messages}
                onSend={onSend}
                user={user}
                scrollToBottom
                onPressAvatar={onPressAvatar}
                quickReplyStyle={{ borderRadius: 2 }}
                quickReplyTextStyle={{
                    fontWeight: "200",
                }}
                renderSend={renderSend}
                keyboardShouldPersistTaps='never'
                inverted={Platform.OS !== "web"}
                showUserAvatar={false}
                infiniteScroll
            />
        </View>
    );
});

export default Chat;

const styles = StyleSheet.create({
    content: { backgroundColor: "#ffffff", flex: 1 },
});
