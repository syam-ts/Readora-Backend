import { Article, ArticleModel } from "../../domain/entities/Article";
import { User, UserModel } from "../../domain/entities/User";
import { ArticleInterface } from "../../domain/interfaces/Repositories/articleRepository";

export class ArticleRepositoryMongoose implements ArticleInterface {
    async createArticle(article: any): Promise<any> {
        const { userId, title, subtitle, description, image, tags, category } =
            article;

        const user = await UserModel.findById(userId).lean<User>();

        if (!user) throw new Error("user not found");
        const status: string = "unpublished";

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

    async viewAllArticles(userId: string, loadMoreIndex: number): Promise<Article> {
        const user = await UserModel.findById(userId);
        if (!user) throw new Error("User not found");

        // vertical pagination
        const pageSize: number = 9 * loadMoreIndex;
        const preferences = user.preferences;

        const articles = await ArticleModel.find({
            category: { $in: preferences },
            status: "published"
        }).sort({ createdAt: -1 }).limit(pageSize).lean<Article>();

        if (!articles) throw new Error("no article found");

        return articles as Article;
    }

    async viewMyArticles(userId: string, articleType: string): Promise<Article> {
        const myArticles = await ArticleModel.find({
            userId: userId,
            status: articleType,
        })
            .sort({ createdAt: -1 })
            .lean<Article>()
            .exec();

        if (!myArticles) throw new Error("no articles found");
        return myArticles;
    }

    async publishArticle(articleId: string): Promise<Article> {
        const publishArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            {
                status: "published",
            },
            {
                new: true,
            }
        ).lean<Article>();

        if (!publishArticle) throw new Error("Article not exists");

        return publishArticle;
    }

    async archiveArticle(articleId: string): Promise<Article> {
        const archiveArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            {
                status: "archived",
            },
            {
                new: true,
            }
        ).lean<Article>();

        if (!archiveArticle) throw new Error("Article not exists");

        return archiveArticle;
    }

    async monoArticleView(articleId: string): Promise<any> {
        const article = await ArticleModel.findById(articleId);

        if (!article) throw new Error("No article found");

        return article;
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

    async deleteArticle(articleId: string): Promise<any> {
        const deleteArticle = await ArticleModel.findByIdAndDelete(articleId);

        if (!deleteArticle) throw new Error("Article not founded");
        return deleteArticle;
    }

    async hasUserLikedArticle(articleId: string, userId: string): Promise<boolean> {
         const existingLike = await ArticleModel.findOne({
            _id: articleId,
            "likes.users": userId
        });

        if(existingLike) {
            return true;
        } else {
            return false;
        }
    }

    async hasUserDisikedArticle(articleId: string, userId: string): Promise<boolean> {
         const existingDislike = await ArticleModel.findOne({
            _id: articleId,
            "dislikes.users": userId
        });

        if(existingDislike) {
            return true;
        } else {
            return false;
        }
    }

    async likeArticle(articleId: string, userId: string): Promise<any> {

        const existingLike = await this.hasUserLikedArticle(articleId, userId);
        if (existingLike) throw new Error('Already liked the article')

        const likeArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            {
                $push: {"likes.users": userId},
                $inc: { "likes.total": 1 },
            },
            {
                new: true,
            }
        );

        if (!likeArticle) throw new Error("Article not found");

        return likeArticle;
    }

    async dislikeArticle(articleId: string, userId: string): Promise<any> {

        const existingLike = await this.hasUserDisikedArticle(articleId, userId);
        if (existingLike) throw new Error('Already disliked the article')
console.log('useri', userId)
        const dislikeArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            {
                $push: {"dislikes.users": userId},
                $inc: { "dislikes.total": 1 },
            },
            {
                new: true,
            }
        );

        if (!dislikeArticle) throw new Error("Article not found");

        return dislikeArticle;
    }

     

    async searchArticles(input: string): Promise<Article[]> {
        console.log('input', input)
        const articles = await ArticleModel.find({
            tags: { $regex: input, $options: "i" },
        }).lean<Article[]>();
        console.log('Found: ', articles)
        if (!articles) throw new Error("no article found");

        return articles;
    }
}
