import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";
import { StyleSheet, View, Alert, Button } from "react-native";
import { Session } from "@supabase/supabase-js";
import { Input } from "@rneui/themed";
import { useAuthenticationStore } from "../../../hooks/store";

export default function Account() {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [website, setWebsite] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const authenticationStore = useAuthenticationStore();

    useEffect(() => {
        if (authenticationStore.session) getProfile();
    }, [authenticationStore.session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!authenticationStore.session?.user) throw new Error("No user on the session!");

            const { data, error, status } = await supabase
                .from("profiles")
                .select(`username, website, avatar_url`)
                .eq("id", authenticationStore.session?.user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string;
        website: string;
        avatar_url: string;
    }) {
        try {
            setLoading(true);
            if (!authenticationStore.session?.user) throw new Error("No user on the session!");

            const updates = {
                id: authenticationStore.session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            };

            const { error } = await supabase.from("profiles").upsert(updates);

            if (error) {
                throw error;
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleSignOut = () => {
        supabase.auth.signOut();
        authenticationStore.setSession(null);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input label='Email' value={authenticationStore.session?.user?.email} disabled />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label='Username'
                    value={username || ""}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label='Website'
                    value={website || ""}
                    onChangeText={(text) => setWebsite(text)}
                />
            </View>

            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title={loading ? "Loading ..." : "Update"}
                    onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
                    disabled={loading}
                />
            </View>

            <View style={styles.verticallySpaced}>
                <Button title='Sign Out' onPress={handleSignOut} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: "stretch",
    },
    mt20: {
        marginTop: 20,
    },
});
