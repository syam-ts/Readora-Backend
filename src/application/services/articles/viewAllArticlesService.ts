import { Article } from "../../../domain/entities/Article"; 
 
export interface UserRepository {
    viewAllArticles(userId: string): Promise<any>
};


export class ViewAllArtcles {
    constructor(private userRespository: UserRepository) {}

    async execute(userId: string): Promise<Article> {
         const result = this.userRespository.viewAllArticles(userId);

         return result;
    }
}