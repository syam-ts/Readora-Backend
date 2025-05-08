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
    publishArticle(articleType: string): Promise<Article>;
}

export class PublishArticle {
    constructor(private userRespository: UserRepository) { }

    async execute(articleType: string): Promise<Article> {
        return this.userRespository.publishArticle(articleType);
    }
}
