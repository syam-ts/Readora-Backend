import { profileError } from "../../../utils/ErrorHandling/errorUserProfile";
import { UserInterface } from "../../../domain/interfaces/Repositories/userRepository";


interface User {
    name: string;
    profilePicture: string;
    phone: number;
    dob: number;
    preferences: string[];
}
 
export class EditProfile {
    constructor(private userInterface: UserInterface) { }

    async execute(user: User, userId: string): Promise<User> {
          
        profileError(user);
        return await this.userInterface.editProfile(user, userId);
    }
}
