interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    dob: number;
}


export interface UserRepository {
    loginUser(email: string, password: string): Promise<User>;
}

export class UserLogin {
    constructor(private userRepository: UserRepository ) {};

    async execute(email: string, password: string): Promise<User> {
        return await this.userRepository.loginUser(email, password);

    }

}