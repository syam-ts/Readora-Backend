import { profileError } from "../../../utils/ErrorHandling/errorUserProfile";

interface User {
    userId: string;
    name: string;
    profilePicture: string;
    phone: number;
    dob: number;
    preferences: string[];
}

export interface UserRepository {
    editProfile(user: User): Promise<any>;
}

export class EditProfile {
    constructor(private userRepository: UserRepository) { }

    async execute(user: User): Promise<any> {
        

        profileError(user);
        return await this.userRepository.editProfile(user);
    }
}
