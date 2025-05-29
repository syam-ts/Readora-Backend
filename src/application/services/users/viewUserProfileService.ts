import { User } from "../../../domain/entities/User";
import { UserInterface } from "../../../domain/interfaces/Repositories/userRepository";
 
export class ViewUserProfile {
    constructor(private userInterface: UserInterface) { }

    async execute(userId: string): Promise<User> {
        const result = this.userInterface.viewUserProfile(userId);

        return result;
    }
}
