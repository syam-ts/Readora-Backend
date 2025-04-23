import { User, UserModel } from "../../entities/User";
import { UserRepository } from "../../../application/services/userSignupService";
import { ArticleModel } from "../../entities/Article";

type Id = string;

interface Article {
    articleId?: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
}

export class UserRepositoryMongoose implements UserRepository {
    async createUser(name: string, email: string, password: string): Promise<any> {
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
            createdAt: Date.now(),
        });

        const savedArticle = newArticle.save();

        return savedArticle;
    }

    async viewAllArticles(userId: Id, type: string): Promise<any> {
        if (type === "home") {
            const articles = await ArticleModel.find();

            if (!articles) throw new Error("no article found");

            return articles;
        } else if (type === "trending") {
            const articles = await ArticleModel.find().sort({ createdAt: -1 });

            if (!articles) throw new Error("no article found");

            return articles;
        } else if (type === "myArticles") {
            const articles = await ArticleModel.find({ userId: userId });

            if (!articles) throw new Error("no article found");

            return articles;
        } else {
            throw new Error("Wrong selection");
        }
    }

    async viewMyArticles(userId: Id): Promise<any> { }

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

    async editProfile(
        userId: Id,
        name: string,
        profilePicture: string,
        phone: number,
        dob: number,
        preferences: string[]
    ): Promise<any> {
        function parseDOBString(dobStr: string): Date {
            const [day, month, year] = dobStr.split("/");
            const formatted = `${year}-${month}-${day}`; // convert to ISO format: yyyy-mm-dd
            const date = new Date(formatted);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date format for dob");
            }
            return date;
        }

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


    async editArticle(
        article: Article
    ): Promise<any> {
        const {
            articleId,
            title,
            subtitle,
            description,
            image,
            tags,
            category
         } = article;

        const editData = {
            title,
            subtitle,
            description,
            image,
            tags,
            category
        }
        const editedArticle = await ArticleModel.findByIdAndUpdate(articleId, {
            ...editData
        }, {
            new: true
        });

        if (!editedArticle) throw new Error('Article not found');

        console.log('The result of edit article: ', editedArticle);

        return editedArticle;
    }


    async deleteArticle(articleId: Id): Promise<any> {

        const deleteArticle = await ArticleModel.findByIdAndDelete(articleId);

        if (!deleteArticle) throw new Error('Article not founded');
        return deleteArticle;
    }
} 
