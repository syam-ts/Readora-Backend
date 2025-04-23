

export interface UserRepository {
    deleteArticle(articleId: string): Promise<any>;
}

export class DeleteArticle {
    constructor(private userRespository: UserRepository) { }

    async execute(articleId: string): Promise<any> {
        return this.userRespository.deleteArticle(articleId);
    }
}
