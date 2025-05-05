import { Article } from "../../../domain/entities/Article";


export interface UserRepository {
    monoArticleView(articleId: string): Promise<Article>;
}

export class MonoArticleView {
    constructor(private userRespository: UserRepository) { }

    async execute(articleId: string): Promise<Article> {
        return this.userRespository.monoArticleView(articleId); 
 
    }
}
