import { User, UserModel } from "../../entities/User";
import { UserRepository } from "../../../application/services/userSignupService";
import { ArticleModel } from "../../entities/Article";

export class UserRepositoryMongoose implements UserRepository {
    async createUser(email: string, password: string): Promise<any> {
        const newUser = new UserModel({
            name,
            email,
            password,
            profilePicture: "",
            phone: null,
            dob: null,
            preferences: [],
        });

        const savedUser = await newUser.save();

        return savedUser.toObject();
    }

    async loginUser(email: string, password: string): Promise<any> {
        const user = await UserModel.findOne({ email, password });

        console.log("The ueser: ", user);

        if (!user) throw new Error("user not found");

        return user;
    }

    async createArticle(
        title: string,
        description: string,
        image: string,
        tags: string[],
        categories: string[]
    ): Promise<any> {
        console.log('The data: ', title)
        const newArticle = new ArticleModel({
            title,
            description,
            image,
            tags,
            categories
        });

        const savedArticle = newArticle.save();

        return savedArticle;
     }


     async viewAllArticles(userId: string): Promise<any> {
        const articles = await ArticleModel.find();

        if(!articles) throw new Error('no article found');

        return articles;
     }

     async viewMyArticles(userId: string): Promise<any> {

     }

     async viewMyProfile(userId: string): Promise<any> {

     }


     async editProfile(userId: string): Promise<any> {

     }
}
