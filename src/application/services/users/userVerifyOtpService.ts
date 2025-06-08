import { UserInterface } from "../../../domain/interfaces/Repositories/userRepository";

export class VerifyOtp {
    constructor(private userInterface: UserInterface) { }

    async execute(body: any): Promise<any> {
        console.log('The data: ', body.data)
          
        const result = await this.userInterface.verifyOtp(body); 
        if (result) {
            const credentials = body.data;
            console.log('last: ',credentials)
            return this.userInterface.createUser(credentials);
        } else {
            throw new Error(result);
        }
    }
}
