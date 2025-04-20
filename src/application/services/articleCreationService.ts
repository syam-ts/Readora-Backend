export interface UserRepository {
    createArticle(
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
        title: string,
        description: string,
        image: string,
        tags: string[],
        categories: string[]
    ): Promise<any> {
        const result = this.userRepository.createArticle(
            title,
            description,
            image,
            tags,
            categories
        );

        return result;
    }
}
