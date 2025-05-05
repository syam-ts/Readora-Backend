import { User } from "../../../domain/entities/User";
 
export interface UserRepository {
    viewAllArticles(userId: string): Promise<User>
};


export class ViewAllArtcles {
    constructor(private userRespository: UserRepository) {}

    async execute(userId: string): Promise<User> {
         const result = this.userRespository.viewAllArticles(userId);

         return result;
    }
}