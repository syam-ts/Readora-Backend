import { User, UserModel } from "../../entities/User";
import { UserRepository } from '../../../application/services/userSignupService';



export class UserRepositoryMongoose implements UserRepository {

    async createUser(email: string, password: string): Promise<any> {

        const newUser = new UserModel({
            firstName: '',
            lastName: '',
            email,
            password,
            profilePicture: '',
            phone: null,
            dob: null,
            preferences: []
        });

        const savedUser = await newUser.save();

        return savedUser.toObject();
    }


    async loginUser(email: string, password: string): Promise<any> {

        const user = await UserModel.findOne({email});

        console.log('The ueser: ', user);

        if(!user) throw new Error('user not found');

        return user;
    }
}