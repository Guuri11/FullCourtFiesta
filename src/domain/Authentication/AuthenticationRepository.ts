import {
    SignInRequest,
    SignInResponse,
    SignOutResponse,
    SignUpRequest,
    SignUpResponse,
} from "./authentication";

export interface AuthenticationRepositoryI {
    signIn: (request: SignInRequest) => Promise<SignInResponse>;
    signUp: (request: SignUpRequest) => Promise<SignUpResponse>;
    signOut: () => SignOutResponse;
}
