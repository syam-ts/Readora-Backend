 

interface Article {
    articleId?: string;
    userId?: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface SignupCredentials {
    name: string;
    email: string;
    password: string;
}

interface User {
    userId: string;
    name: string;
    profilePicture: string;
    phone: number;
    dob: number;
    preferences: string[];
}

export const articleError = (article: Article, modifyType: string): void => {
    const { title, subtitle, description, image, tags, category } = article;

    let id;

    if (modifyType === "create") {
        const { userId } = article;
        if (!userId) throw new Error("User id is missing");
        id = userId;

        if (!userId) throw new Error("UserId id is missing");
    } else {
        const { articleId } = article;

        if (!articleId) throw new Error("Article id is missing");
        id = articleId;
    }

    if (title.length < 10 || title.length > 40)
        throw new Error("Title should be between 10 to 40 characters");

    if (subtitle.length < 10 || subtitle.length > 20)
        throw new Error("Subtitle should be between 10 to 20 characters");

    if (description.length < 20 || description.length > 200)
        throw new Error("Description should be between 20 to 200 characters");

    if (!image) throw new Error("Image need to be provided");

    if (tags.length < 3 || tags.length > 5)
        throw new Error("Tags should be between 3 to 5 ");

    if (category.length < 3 || category.length > 10)
        throw new Error("Category should be between 3 to 10 characters");

    return;
};

export const loginError = (credentials: LoginCredentials) => {
    const { email, password } = credentials;

    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,10}$/;

    if (email.length < 10 || email.length > 30 || !emailRegex.test(email)) {
        throw new Error("Email should be valid and 10–20 characters long");
    }

    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must be 8-10 characters long, contain at least 1 lowercase letter and 1 number."
        );
    }

    return;
};

export const signupError = (credentials: SignupCredentials) => {
    const { name, email, password } = credentials;

    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,10}$/;

    if (!name || !email || !password) {
        throw new Error("All fields need to be filled");
    }

    if (name.length < 5 || name.length > 20) {
        throw new Error("Name should between 5–20 characters");
    }

    if (email.length < 10 || email.length > 30 || !emailRegex.test(email)) {
        throw new Error("Email should be valid and 10–20 characters long");
    }

    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must be 8-10 characters long, contain at least 1 lowercase letter and 1 number."
        );
    }

    return;
};


export const profileError = (user: User) => {

    const { name, profilePicture, phone, dob, preferences } = user;

    if (!name || !profilePicture || !phone || !dob || !preferences) {
        throw new Error('Some fileds are missing data');
    };

    if (name.length < 5 || name.length > 20) {
        throw new Error("Name should between 5–20 characters");
    } 
  
    if (String(phone).length < 10 || String(phone).length > 11) {
        throw new Error("Phone Number should be 10 characters");
    }
 
    if (String(dob).length < 10 || String(dob).length > 10) {
        throw new Error("DOB need to be valid");
    }
 
    
    if (preferences.length < 3 || preferences.length > 5) {
        throw new Error("Preferences should be between 3 to 5");
    }

    return;
}