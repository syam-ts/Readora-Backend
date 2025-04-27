import { articleError } from "../../../utils/ErrorHandling/errorArticle";

interface Article {
    _id?: string;
    articleId?: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
}

export interface UserRepository {
    editArticle(article: Article): Promise<any>;
}

export class EditArticle {
    constructor(private userRespository: UserRepository) { }

    async execute(article: Article): Promise<any> {

     //validation using custom funciton  ------------->
        articleError(article, 'edit');

        return this.userRespository.editArticle(article);
    }
}
