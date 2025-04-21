 


export interface UserRepository {
    viewAllArticles(userId: string, type: string): Promise<any>
};


export class ViewAllArtcles {
    constructor(private userRespository: UserRepository) {}

    async execute(userId: string, type: string): Promise<any> {
         const result = this.userRespository.viewAllArticles(userId, type);

         return result;
    }
}