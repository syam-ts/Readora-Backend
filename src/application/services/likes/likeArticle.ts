

export interface UserRepository {
    likeArticle(articleId: string): Promise<any>;
}

export class LikeArticle {
    constructor(private userRepository: UserRepository) { }

    async execute(articleId: string): Promise<any> {
        return this.userRepository.likeArticle(articleId);
    }
}
