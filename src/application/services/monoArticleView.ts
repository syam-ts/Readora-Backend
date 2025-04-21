

export interface UserRepository {
    monoArticleView(articleId: string): Promise<any>;
}

export class MonoArticleView {
    constructor(private userRespository: UserRepository) { }

    async execute(articleId: string): Promise<any> {
        const result = this.userRespository.monoArticleView(articleId);
        console.log('2nd ', result)

        return result;
    }
}
