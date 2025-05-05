import { User } from "../../../domain/entities/User";


export interface UserRepository {
    viewUserProfile(userId: string): Promise<User>
};


export class ViewUserProfile {
    constructor(private userRespository: UserRepository) {}

    async execute(userId: string): Promise<User> {
         const result = this.userRespository.viewUserProfile(userId);

         return result;
    }
}