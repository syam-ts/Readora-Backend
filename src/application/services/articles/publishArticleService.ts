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

export interface UserRepository {
    publishArticle(articleId: string): Promise<Article>;
}

export class PublishArticle {
    constructor(private userRespository: UserRepository) { }

    async execute(articleId: string): Promise<Article> {
        return this.userRespository.publishArticle(articleId);
    }
}
