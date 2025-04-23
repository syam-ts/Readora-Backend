

export interface UserRepository {
    monoArticleView(articleId: string): Promise<any>;
}

export class MonoArticleView {
    constructor(private userRespository: UserRepository) { }

    async execute(articleId: string): Promise<any> {
        return this.userRespository.monoArticleView(articleId); 
 
    }
}
