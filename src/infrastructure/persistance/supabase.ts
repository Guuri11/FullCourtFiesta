import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// TODO: store this at env var
const supabaseUrl = "https://bcmqqjaigqehmrnwvxgl.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbXFxamFpZ3FlaG1ybnd2eGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxNjQ2NDksImV4cCI6MjAyMDc0MDY0OX0.8klodIW7GFc62EQkIUfP7Nbu4P7qt_LU2pC7zwJ4CgE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
