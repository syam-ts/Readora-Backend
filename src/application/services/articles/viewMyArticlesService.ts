

export interface UserRepository {
    viewMyArticles(userId: string): Promise<any>;
}

export class ViewMyArtcles {
    constructor(private userRespository: UserRepository) { }

    async execute(userId: string): Promise<any> {
        return this.userRespository.viewMyArticles(userId);

    }
}
