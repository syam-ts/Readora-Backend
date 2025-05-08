import { User, UserModel } from "../../entities/User";
import { UserRepository } from "../../../application/services/users/userSignupService";
import { ArticleModel } from "../../entities/Article";
import bcrypt from "bcrypt";

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

    async addPreferences(userId: Id, preferences: string[]): Promise<any> {
        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { preferences } },
            { new: true }
        );

        if (!updateUser) throw new Error("User not found");

        return updateUser;
    }

    async loginUser(credentials: {
        email: string;
        password: string;
    }): Promise<any> {
        const { email, password } = credentials;
        const user = await UserModel.findOne({ email }).lean<User>().exec() 
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

    async createArticle(article: Article): Promise<any> {
        const { userId, title, subtitle, description, image, tags, category } =
            article;

        const user = await UserModel.findById(userId).lean<User>();

        if (!user) throw new Error("user not found");
        const status: string = 'unpublished';

        const newArticle = new ArticleModel({
            userId,
            author: user.name,
            subtitle,
            title,
            description,
            status,
            image,
            tags,
            category,
            createdAt: new Date(),
        });

        const savedArticle = newArticle.save();

        return savedArticle;
    }

    async viewAllArticles(userId: Id): Promise<Article> {
        const user = await UserModel.findById(userId);
        if (!user) throw new Error("User not found");

        const preferences = user.preferences;

        const articles = await ArticleModel.find({
            category: { $in: preferences },
        }).lean<Article>();

        if (!articles) throw new Error("no article found");
        
        return articles as Article;
    }

    async viewMyArticles(userId: Id, articleType: string): Promise<Article> {

        const myArticles = await ArticleModel.find({ userId: userId, status: articleType })
            .sort({ createdAt: -1 })
            .lean<Article>()
            .exec();

        if (!myArticles) throw new Error("no articles found");
        return myArticles;
    }

    async publishArticle(articleId: string): Promise<Article> {
          
        const publishArticle = await ArticleModel.findByIdAndUpdate(articleId, {
            status: "published"
        }, {
            new: true
        }).lean<Article>();

        console.log('final: ', publishArticle)

        if(!publishArticle) throw new Error('Article not exists');

        return publishArticle;
    }

    async archiveArticle(articleId: string): Promise<Article> {
          
        const archiveArticle = await ArticleModel.findByIdAndUpdate(articleId, {
            status: "deleted"
        }, {
            new: true
        }).lean<Article>();

        console.log('final: ', archiveArticle)

        if(!archiveArticle) throw new Error('Article not exists');

        return archiveArticle;
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
        gender: string;
        location: string;
        preferences: string[];
    }): Promise<any> {
        const {
            userId,
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

    async likeArticle(articleId: Id): Promise<any> {
        const likeArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            {
                $inc: { likes: 1 },
            },
            {
                new: true,
            }
        );

        if (!likeArticle) throw new Error("Article not found");

        return likeArticle;
    }

    async dislikeArticle(articleId: Id): Promise<any> {
        const dislikeArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            {
                $inc: { dislikes: 1 },
            },
            {
                new: true,
            }
        );

        if (!dislikeArticle) throw new Error("Article not found");

        return dislikeArticle;
    }
}
