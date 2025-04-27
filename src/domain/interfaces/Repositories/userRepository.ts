import { User, UserModel } from "../../entities/User";
import { UserRepository } from "../../../application/services/users/userSignupService";
import { ArticleModel } from "../../entities/Article";

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

export class UserRepositoryMongoose implements UserRepository {
    async createUser(credentials: {
        name: string;
        email: string;
        password: string;
    }): Promise<any> {
        const { name, email, password } = credentials;

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

    async loginUser(credentials: {
        email: string;
        password: string;
    }): Promise<any> {
 
        
        const { email, password } = credentials;
        const user = await UserModel.find({ email, password });

        if (!user) throw new Error("user not found");

        return user;
    }

    async createArticle(article: Article): Promise<any> {
        const { userId, title, subtitle, description, image, tags, category } = article;

            const user = await UserModel.findById(userId).lean<User>();
         
            if(!user) throw new Error('user not found');

        const newArticle = new ArticleModel({
            userId,
            author: user.name,
            subtitle,
            title,
            description,
            image,
            tags,
            category,
            createdAt: new Date(),
        });

        const savedArticle = newArticle.save();

        return savedArticle;
    }

    async viewAllArticles(userId: Id): Promise<any> {
 
        const user = await UserModel.findById(userId);
        if (!user) throw new Error("User not found");

        const preferences = user.preferences;

        const articles = await ArticleModel.find({
            category: { $in: preferences }
        });

        if (!articles) throw new Error("no article found");
        return articles;
    }

    async viewMyArticles(userId: Id): Promise<Article> {
        const myArticles = await ArticleModel.find({ userId: userId })
            .lean<Article>()
            .exec();

        if (!myArticles) throw new Error("no articles found");

        return myArticles;
    }

    async monoArticleView(articleId: Id): Promise<any> {
        const article = await ArticleModel.findById(articleId);

        if (!article) throw new Error("No article found");

        return article;
    }

    async viewUserProfile(userId: Id): Promise<any> {
        const user = await UserModel.findById(userId);

        if (!user) throw new Error("user not found");

        return user;
    }

    async editProfile(user: {
        userId: Id;
        name: string;
        profilePicture: string;
        phone: number;
        dob: number;
        preferences: string[];
    }): Promise<any> {
        const { userId, name, profilePicture, phone, dob, preferences } = user;

        const editData = {
            name,
            profilePicture,
            phone: Number(phone),
            dob: dob,
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

    async editArticle(article: Article): Promise<any> {
        const { _id, title, subtitle, description, image, tags, category } =
            article;

        const editData = {
            title,
            subtitle,
            description,
            image,
            tags,
            category,
        };
        const editedArticle = await ArticleModel.findByIdAndUpdate(
            _id,
            {
                ...editData,
            },
            {
                new: true,
            }
        );

        if (!editedArticle) throw new Error("Article not found");

        // console.log("The result of edit article: ", editedArticle);

        return editedArticle;
    }

    async deleteArticle(articleId: Id): Promise<any> {
        const deleteArticle = await ArticleModel.findByIdAndDelete(articleId);

        if (!deleteArticle) throw new Error("Article not founded");
        return deleteArticle;
    }
}
