import { Article } from "../../../domain/entities/Article";


export interface UserRepository {
    dislikeArticle(articleId: string): Promise<Article>;
}

export class DislikeArticle {
    constructor(private userRepository: UserRepository) { }

    async execute(articleId: string): Promise<Article> {
        return this.userRepository.dislikeArticle(articleId);
    }
}
