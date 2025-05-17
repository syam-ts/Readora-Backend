interface Credentials {
    name: string;
    email: string;
    password: string;
}

export interface UserRepository {
    verifyOtp(originalOtp: number, enteredOtp: number): Promise<any>;
    createUser(credentials: Credentials): Promise<any>;
}

export class VerifyOtp {
    constructor(private userRepository: UserRepository) { }

    async execute(body: any): Promise<any> {
        const { generatedOtp, inputOtp } = body.body;
        const result = await this.userRepository.verifyOtp(generatedOtp, inputOtp);
        if (result) {
            return this.userRepository.createUser(body.body.data);
        } else {
            throw new Error(result);
        }
    }
}
