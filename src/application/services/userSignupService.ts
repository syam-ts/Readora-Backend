interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    dob: number;
}


export interface UserRepository {
    createUser(email: string, password: string): Promise<User>;
}

export class UserSignup {
    constructor(private userRepository: UserRepository ) {};

    async execute(email: string, password: string): Promise<User> {
        return await this.userRepository.createUser(email, password);

    }

}