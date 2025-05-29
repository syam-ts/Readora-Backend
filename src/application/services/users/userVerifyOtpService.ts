import { UserInterface } from "../../../domain/interfaces/Repositories/userRepository";

export class VerifyOtp {
    constructor(private userInterface: UserInterface) { }

    async execute(body: any): Promise<any> {
        const data = body.body;
        const result = await this.userInterface.verifyOtp(data);
        if (result) {
            const credentials = body.body.data.credentials;
            return this.userInterface.createUser(credentials);
        } else {
            throw new Error(result);
        }
    }
}
