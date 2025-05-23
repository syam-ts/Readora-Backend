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
    archiveArticle(articleId: string): Promise<Article>;
}

export class ArchiveArticle {
    constructor(private userRepository: UserRepository) { }

    async execute(articleId: string): Promise<Article> {
        return this.userRepository.archiveArticle(articleId);
    }
}
