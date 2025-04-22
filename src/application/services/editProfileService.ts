


export interface UserRepository {
    editProfile(userId: string,
        name: string,
        profilePicture: string,
        phone: number,
        dob: number,
        preferences: string[]): Promise<any>;
}

export class EditProfile {
    constructor(private userRepository: UserRepository) { };

    async execute(userId: string,
        name: string,
        profilePicture: string,
        phone: number,
        dob: number,
        preferences: string[]): Promise<any> {

        return await this.userRepository.editProfile(
            userId,
            name,
            profilePicture,
            phone,
            dob,
            preferences
        );

    }

}