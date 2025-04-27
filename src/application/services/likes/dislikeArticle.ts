

export interface UserRepository {
    dislikeArticle(articleId: string): Promise<any>;
}

export class DislikeArticle {
    constructor(private userRepository: UserRepository) { }

    async execute(articleId: string): Promise<any> {
        return this.userRepository.dislikeArticle(articleId);
    }
}
