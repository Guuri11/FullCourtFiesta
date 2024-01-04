import { Session } from "@supabase/supabase-js";

export type SignInRequest = {
    email: string;
    password: string;
};

export type SignInResponse = {
    code: number;
    message: string;
    data: Session;
};

export type SignUpResponse = {
    code: number;
    message: string;
    data: Session;
};

export type SignOutResponse = {
    code: number;
    message: string;
    data: null;
};

export type SignUpRequest = {
    email: string;
    password: string;
};
