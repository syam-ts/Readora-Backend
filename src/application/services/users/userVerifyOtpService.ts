import { UserInterface } from "../../../domain/interfaces/Repositories/userRepository";

export class VerifyOtp {
    constructor(private userInterface: UserInterface) { }

    async execute(body: any): Promise<any> {
        console.log('The data: ', body.body)
          
        const result = await this.userInterface.verifyOtp(body.body); 
        if (result) {
            const credentials = body.body.data;
            console.log('last: ',credentials)
            return this.userInterface.createUser(credentials);
        } else {
            throw new Error(result);
        }
    }
}
