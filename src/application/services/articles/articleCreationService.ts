import { articleError } from "../../../utils/ErrorHandling/errorArticle";

interface Article {
    userId: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
}

export interface UserRepository {
    createArticle(finalArticle: Article): Promise<Article>;
}

export class CreateArticle {
    constructor(private userRepository: UserRepository) { }

    async execute(userId: string, article: Article): Promise<Article> {
        const { title, subtitle, description, image, tags, category } = article;

        const finalArticle = {
            userId,
            title,
            subtitle,
            description,
            image,
            tags,
            category,
        };

          //validation using custom funciton  ------------->
        articleError(finalArticle, "create");

        return this.userRepository.createArticle(finalArticle);
    }
}
