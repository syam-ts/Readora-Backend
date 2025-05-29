import { User } from "../../../domain/entities/User";
import { UserInterface } from "../../../domain/interfaces/Repositories/userRepository";
 
export class AddPreferences {
    constructor(private userInterface: UserInterface) { }

    async execute(userId: string, preferences: string[]): Promise<User> {
        return this.userInterface.addPreferences(userId, preferences);
    }
}
