
export interface UserInterface {

    createUser(credentials: any): Promise<any>;
    verifyOtp(data: any): Promise<any>;
    addPreferences(userId: string, preferences: string[]): Promise<any>;
    loginUser(credentials: any): Promise<any>;
    viewUserProfile(userId: string): Promise<any>;
    editProfile(user: any, userId: string): Promise<any>;
}