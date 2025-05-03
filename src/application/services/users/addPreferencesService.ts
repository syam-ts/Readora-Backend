

export interface UserRepository {
    addPreferences(userId: string, preferences: string[]): Promise<any>;
};

export class AddPreferences {
    constructor(private userRespository: UserRepository) { }

    async execute(userId: string, preferences: string[]): Promise<any> {
        return this.userRespository.addPreferences(userId, preferences); 
    }
};
