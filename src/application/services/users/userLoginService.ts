import { loginError } from "../../../utils/ErrorHandling/errorLogin";
import { UserInterface } from "../../../domain/interfaces/Repositories/userRepository";

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    dob: number;
}

interface Credentials {
    email: string;
    password: string;
}
 

export class UserLogin {
    constructor(private userInterface: UserInterface) { }

    async execute(credentials: Credentials): Promise<User> {
        // validation
        loginError(credentials);

        return await this.userInterface.loginUser(credentials);
    }
}
