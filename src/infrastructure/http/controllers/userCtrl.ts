

import { UserSignup } from '../../../application/services/userSignup'; 
import { UserRepositoryMongoose } from '../../../domain/interfaces/Repositories/userRepository';

const userSignupService = new UserSignup(new UserRepositoryMongoose());

export class UserController {
    constructor() {};
    
    async signupUser(req: any, res: any): Promise<any> {
       try{
        console.log('enter', req.body)
        const { email, password } = req.body;


        const result = await userSignupService.execute(email, password);
        res.status(201).json(result);
       }catch(err: unknown) {
        console.log('ERROR: ',err)
       }
    };

    async loginUser(): Promise<any> {
        try{

        }catch(err: unknown) {
         console.log('ERROR: ',err)
        }
    };

    
}