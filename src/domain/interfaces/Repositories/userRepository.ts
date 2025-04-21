import { User, UserModel } from "../../entities/User";
import { UserRepository } from "../../../application/services/userSignupService";
import { Article, ArticleModel } from "../../entities/Article";

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
        userId: string,
        title: string,
        subtitle: string,
        description: string,
        image: string,
        tags: string[],
        category: string
    ): Promise<any> {
        

        const newArticle = new ArticleModel({
            userId,
            subtitle,
            title,
            description,
            image,
            tags,
            category,
            createdAt: Date.now()
        });

        const savedArticle = newArticle.save();

        return savedArticle;
    }


    async viewAllArticles(userId: string, type: string): Promise<any> {


        if (type === 'home') {
            const articles = await ArticleModel.find();

            if (!articles) throw new Error('no article found');

            return articles;
        } else if (type === 'trending') {
            const articles = await ArticleModel.find().sort({ createdAt: -1 });

            if (!articles) throw new Error('no article found');

            return articles;
        } else if (type === 'myArticles') {
            const articles = await ArticleModel.find({userId: userId});

            if (!articles) throw new Error('no article found');

            return articles;
        } else {
            throw new Error('Wrong selection');
        }

    }

    async viewMyArticles(userId: string): Promise<any> {

    }

    async viewMyProfile(userId: string): Promise<any> {

    }


    async editProfile(userId: string): Promise<any> {

    }
}
