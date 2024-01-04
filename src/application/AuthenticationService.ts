import { AuthenticationRepositoryI } from "../domain/Authentication/AuthenticationRepository";
import {
    SignInRequest,
    SignInResponse,
    SignOutResponse,
    SignUpRequest,
    SignUpResponse,
} from "../domain/Authentication/authentication";

export type AuthenticationServiceType = {
    signIn: (
        repository: AuthenticationRepositoryI,
        request: SignInRequest,
    ) => Promise<SignInResponse>;
    signUp: (
        repository: AuthenticationRepositoryI,
        request: SignUpRequest,
    ) => Promise<SignUpResponse>;
    signOut: (repository: AuthenticationRepositoryI) => SignOutResponse;
};

export const AuthenticationService: AuthenticationServiceType = {
    signIn: (repository: AuthenticationRepositoryI, request: SignInRequest) =>
        repository.signIn(request),
    signUp: (repository: AuthenticationRepositoryI, request: SignUpRequest) =>
        repository.signUp(request),
    signOut: (repository: AuthenticationRepositoryI) => repository.signOut(),
};
