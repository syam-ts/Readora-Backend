
interface User {
    name: string;
    profilePicture: string;
    phone: number;
    dob: number;
    preferences: string[];
}

export const profileError = (user: User) => {
    const { name, profilePicture, phone, dob, preferences } = user;
 

    if (!name || !profilePicture || !phone || !dob || !preferences) {
        throw new Error("Some fileds are missing data");
    }

    if (name.length < 5 || name.length > 20) {
        throw new Error("Name should between 5–20 characters");
    }

    if (String(phone).length < 10 || String(phone).length > 11) {
        throw new Error("Phone Number should be 10 characters");
    }

    // if (String(dob).length < 10 || dob.length > 10) {
    //     throw new Error("DOB need to be valid");
    // }

    if (preferences.length < 3 || preferences.length > 5) {
        throw new Error("Preferences should be between 3 to 5");
    }

    return;
};
