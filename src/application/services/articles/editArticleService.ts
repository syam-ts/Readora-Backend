import { articleError } from "../../../utils/ErrorHandling/errorArticle";
import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";

interface Article {
    _id?: string;
    articleId?: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
}

export class EditArticle {
    constructor(private articleInterface: ArticleInterface) { }

    async execute(article: Article): Promise<Article> {

     //validation using custom funciton  ------------->
        articleError(article, 'edit');

        return this.articleInterface.editArticle(article);
    }
}
