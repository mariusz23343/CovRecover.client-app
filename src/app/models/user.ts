export interface User {
    username: string;
    displayName: string;
    token: string;
    accountType?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}