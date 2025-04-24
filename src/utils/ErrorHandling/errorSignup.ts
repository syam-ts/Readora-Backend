
interface SignupCredentials {
    name: string;
    email: string;
    password: string;
}

export const signupError = (credentials: SignupCredentials) => {
    const { name, email, password } = credentials;

    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,10}$/;

    if (!name || !email || !password) {
        throw new Error("All fields need to be filled");
    }

    if (name.length < 5 || name.length > 20) {
        throw new Error("Name should between 5–20 characters");
    }

    if (email.length < 10 || email.length > 30 || !emailRegex.test(email)) {
        throw new Error("Email should be valid and 10–20 characters long");
    }

    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must be 8-10 characters long, contain at least 1 lowercase letter and 1 number."
        );
    }

    return;
};
