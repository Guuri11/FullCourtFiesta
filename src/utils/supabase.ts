import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// TODO: store this at env var
const supabaseUrl = "https://bcmqqjaigqehmrnwvxgl.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbXFxamFpZ3FlaG1ybnd2eGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4OTM4MjksImV4cCI6MjAxOTQ2OTgyOX0.h4JlJbTxirHCMVRwuCWmgz7eoHNcWp1b2Ox8xclw2fo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
