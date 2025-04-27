 


export interface UserRepository {
    viewAllArticles(userId: string): Promise<any>
};


export class ViewAllArtcles {
    constructor(private userRespository: UserRepository) {}

    async execute(userId: string): Promise<any> {
         const result = this.userRespository.viewAllArticles(userId);

         return result;
    }
}