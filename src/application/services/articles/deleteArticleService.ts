import { Article } from "../../../domain/entities/Article";


export interface UserRepository {
    deleteArticle(articleId: string): Promise<Article>;
}

export class DeleteArticle {
    constructor(private userRespository: UserRepository) { }

    async execute(articleId: string): Promise<Article> {
        return this.userRespository.deleteArticle(articleId);
    }
}
