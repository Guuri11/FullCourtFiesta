import { AuthenticationRepositoryI } from "../../../../domain/Authentication/AuthenticationRepository";
import {
    SignInRequest,
    SignInResponse,
    SignOutResponse,
    SignUpRequest,
    SignUpResponse,
} from "../../../../domain/Authentication/authentication";
import { log } from "../../../config/logger";
import { supabase } from "../../supabase";

const signIn = async (request: SignInRequest): Promise<SignInResponse> => {
    const {
        error,
        data: { session },
    } = await supabase.auth.signInWithPassword({
        email: request.email,
        password: request.password,
    });

    if (error) {
        return { code: error.status, message: error.message, data: null };
    }

    if (!session) {
        return { code: 201, message: "Por favor, confirma el registro en tu email", data: session };
    } else {
        log.success("The user has signed in successfully 👏");
        return { code: 200, data: session, message: "The user has signed in successfully 👏" };
    }
};

const signUp = async (request: SignUpRequest): Promise<SignUpResponse> => {
    const {
        error,
        data: { session },
    } = await supabase.auth.signUp({
        email: request.email,
        password: request.password,
    });

    if (error) {
        return { code: error.status, message: error.message, data: null };
    }

    if (!session) {
        return { code: 201, message: "Por favor, confirma el registro en tu email", data: session };
    } else {
        log.success("The user has signed up successfully 👏");
        return { code: 200, data: session, message: "The user has signed up successfully 👏" };
    }
};

const signOut = (): SignOutResponse => {
    supabase.auth.signOut();
    log.info("User said chao 👋");
    return { code: 200, message: "", data: null };
};

export const AuthenticationRepository: AuthenticationRepositoryI = {
    signIn,
    signUp,
    signOut,
};
