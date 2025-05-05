import { User } from "../../../domain/entities/User";


export interface UserRepository {
    addPreferences(userId: string, preferences: string[]): Promise<User>;
};

export class AddPreferences {
    constructor(private userRespository: UserRepository) { }

    async execute(userId: string, preferences: string[]): Promise<User> {
        return this.userRespository.addPreferences(userId, preferences); 
    }
};
