import { loginError } from "../../../utils/ErrorHandling/errorLogin";

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    dob: number;
};

interface Credentials {
    email: string
    password: string
}


export interface UserRepository {
    loginUser(credentials: Credentials): Promise<User>;
}

export class UserLogin {
    constructor(private userRepository: UserRepository ) {};

    async execute(credentials: Credentials): Promise<User> {
        // validation
        loginError(credentials);

        return await this.userRepository.loginUser(credentials);

    }

}