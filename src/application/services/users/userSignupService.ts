import { signupError } from "../../../utils/ErrorHandling/errorArticle";

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    dob: number;
}

interface Credentials {
    name: string
    email: string
    password: string
}


export interface UserRepository {
    createUser(credentials: Credentials): Promise<User>;
}

export class UserSignup {
    constructor(private userRepository: UserRepository) { };

    async execute(credentials: Credentials): Promise<User> {

        signupError(credentials)
        return await this.userRepository.createUser(credentials);

    }

}