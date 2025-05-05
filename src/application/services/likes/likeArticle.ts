import { User } from "../../../domain/entities/User";


export interface UserRepository {
    likeArticle(articleId: string): Promise<User>;
}

export class LikeArticle {
    constructor(private userRepository: UserRepository) { }

    async execute(articleId: string): Promise<User> {
        return this.userRepository.likeArticle(articleId);
    }
}
