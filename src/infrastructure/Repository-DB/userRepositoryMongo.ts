import bcrypt from "bcrypt";
import { User, UserModel } from "../../domain/entities/User";
import { ArticleModel } from "../../domain/entities/Article";
import { UserInterface } from "../../domain/interfaces/Repositories/userRepository";
import { ArticleInterface } from "../../domain/interfaces/Repositories/articleRepository";

type Id = string;

interface Article {
    _id?: string;
    articleId?: string;
    userId?: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
}

export class UserRepositoryMongoose implements UserInterface {

    async createUser(credentials: any): Promise<any> {
        const { name, email, password } = credentials;

        const salt: number = parseInt(process.env.BCRYPT_SALT as string, 10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            profilePicture: "",
            phone: null,
            gender: "not added yet",
            dob: null,
            location: "",
            preferences: [],
            noOfArticles: 0,
        });

        const savedUser = await newUser.save();

        return { userId: savedUser._id };
    }

    async verifyOtp(data: any): Promise<any> {

        const { generatedOtp, inputOtp } = data;
        if (generatedOtp !== inputOtp) {
            throw new Error("Wrong OTP, Please send right OTP");
        }

        return true;
    }

    async addPreferences(userId: Id, preferences: string[]): Promise<any> {
        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { preferences } },
            { new: true }
        );

        if (!updateUser) throw new Error("User not found");

        return updateUser;
    }

    async loginUser(credentials: any): Promise<any> {
        const { email, password } = credentials;
        const user = await UserModel.findOne({ email }).lean<User>().exec();
        if (!user) throw new Error("user not found");

        const userPassword = user.password;
        const isValidPassword = await bcrypt.compare(password, userPassword);

        if (!isValidPassword) {
            throw new Error("wrong password");
        }

        if (user) {
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                phone: user.phone,
                dob: user.dob,
                preferences: user.preferences,
            } as User;
        }
    }

   async viewUserProfile(userId: string): Promise<any> {
         const user = await UserModel.findById(userId);
 
         if (!user) throw new Error("user not found");
 
         return user;
     }
 
     async editProfile(user: { 
         name: string;
         profilePicture: string;
         phone: number;
         dob: number;
         gender: string;
         location: string;
         preferences: string[];
     }, userId: string): Promise<any> {
         const { 
             name,
             profilePicture,
             phone,
             dob,
             gender,
             location,
             preferences,
         } = user;
 
         const editData = {
             name,
             profilePicture,
             phone: phone,
             dob: new Date(dob).getTime(),
             gender,
             location,
             preferences,
         }; 
 
         const editProfile = await UserModel.findByIdAndUpdate(
             userId,
             {
                 ...editData,
             },
             {
                 new: true,
             }
         ); 
 
         if (!editProfile) throw new Error("user not found");
 
         return editProfile;
     }
}
