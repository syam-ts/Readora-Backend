import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";


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
 

export class PublishArticle {
    constructor(private articleInterface: ArticleInterface) { }

    async execute(articleId: string): Promise<Article> {
        return this.articleInterface.publishArticle(articleId);
    }
}
