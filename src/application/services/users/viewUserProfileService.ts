

export interface UserRepository {
    viewUserProfile(userId: string): Promise<any>
};


export class ViewUserProfile {
    constructor(private userRespository: UserRepository) {}

    async execute(userId: string): Promise<any> {
         const result = this.userRespository.viewUserProfile(userId);

         return result;
    }
}