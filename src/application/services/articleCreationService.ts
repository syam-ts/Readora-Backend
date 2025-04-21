export interface UserRepository {
    createArticle(
        userId: string,
        title: string,
        subtitle: string,
        description: string,
        image: string,
        tags: string[],
        category: string
    ): Promise<any>;
}

export class CreateArticle {
    constructor(private userRepository: UserRepository) { }

    async execute(
        userId: string,
        title: string,
        subtitle: string,
        description: string,
        image: string,
        tags: string[],
        category: string
    ): Promise<any> {
        const result = this.userRepository.createArticle(
            userId,
            title,
            subtitle,
            description,
            image,
            tags,
            category
        );

        return result;
    }
}
