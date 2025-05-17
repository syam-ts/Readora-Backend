import { signupError } from "../../../utils/ErrorHandling/errorSignup";
import { sendMail } from "../../../utils/mail-otp/sendMail";

interface Credentials {
    name: string;
    email: string;
    password: string;
}

export class UserSignup {
    constructor() { }

    async execute(credentials: Credentials): Promise<number> {
        signupError(credentials);

        // generate otp
        const otp = await sendMail(credentials.email);
        return otp as number;
    }
}
