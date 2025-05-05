import { User } from "../../../domain/entities/User";


export interface UserRepository {
    viewMyArticles(userId: string): Promise<User>;
}

export class ViewMyArtcles {
    constructor(private userRespository: UserRepository) { }

    async execute(userId: string): Promise<User> {
        return this.userRespository.viewMyArticles(userId);

    }
}
