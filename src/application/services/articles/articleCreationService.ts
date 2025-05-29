import { articleError } from "../../../utils/ErrorHandling/errorArticle";
import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";

interface Article {
    userId: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
}
 
export class CreateArticle {
    constructor(private articleInterface: ArticleInterface) { }

    async execute(userId: string, article: Article): Promise<Article> {
        const { title, subtitle, description, image, tags, category } = article;

        const finalArticle = {
            userId,
            title,
            subtitle,
            description,
            image,
            tags,
            category,
        };

          //validation using custom funciton  ------------->
        articleError(finalArticle, "create");

        return this.articleInterface.createArticle(finalArticle);
    }
}
