import { Article } from "../../../domain/entities/Article"; 


export interface UserRepository {
    viewMyArticles(userId: string, articleType: string): Promise<any>;
}

export class ViewMyArtcles {
    constructor(private userRespository: UserRepository) { }

    async execute(userId: string, articleType: string): Promise<Article> {
        return this.userRespository.viewMyArticles(userId, articleType);

    }
}
