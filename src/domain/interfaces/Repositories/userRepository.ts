import { User, UserModel } from "../../entities/User";
import { UserRepository } from '../../../application/services/userSignup';



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
}