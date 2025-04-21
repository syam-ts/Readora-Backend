export interface UserRepository {
    createArticle(
        userId: string,
        title: string,
        description: string,
        image: string,
        tags: string[],
        categories: string[]
    ): Promise<any>;
}

export class CreateArticle {
    constructor(private userRepository: UserRepository) { }

    async execute(
        userId: string,
        title: string,
        description: string,
        image: string,
        tags: string[],
        categories: string[]
    ): Promise<any> {
        const result = this.userRepository.createArticle(
            userId,
            title,
            description,
            image,
            tags,
            categories
        );

        return result;
    }
}
