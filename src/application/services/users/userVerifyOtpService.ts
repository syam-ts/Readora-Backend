

export interface UserRepository {
    verifyOtp(originalOtp: number, enteredOtp: number): Promise<any>;
}

export class VerifyOtp {
    constructor(private userRepository: UserRepository) { }

    async execute(body: {originalOtp: number, enteredOtp: number}): Promise<any> {
          const {originalOtp, enteredOtp} = body;
        return await this.userRepository.verifyOtp(originalOtp, enteredOtp);
    }
}
