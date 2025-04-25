
interface LoginCredentials {
    email: string;
    password: string;
}

export const loginError = (credentials: LoginCredentials) => {
    const { email, password } = credentials;

    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]$/;

    if (email.length < 10 || email.length > 30 || !emailRegex.test(email)) {
        throw new Error("Email should be valid and 10–20 characters long");
    } 

    if(password.length < 8 || password.length > 10) { 
        if (!passwordRegex.test(password)) {
            throw new Error(
                "Password must be 8-10 characters long, contain at least 1 lowercase letter and 1 number."
            );
        }
    }

    return;
};
