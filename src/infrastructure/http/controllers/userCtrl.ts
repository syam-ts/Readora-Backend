import { Response } from "express";
import { UserSignup } from "../../../application/services/userSignupService";
import { UserLogin } from "../../../application/services/userLoginService";
import { UserRepositoryMongoose } from "../../../domain/interfaces/Repositories/userRepository";
import { HttpStatusCode } from "../../../helper/contants/enums";
import { StatusMessage } from "../../../helper/contants/statusMessages";

const userSignupService = new UserSignup(new UserRepositoryMongoose());
const userLoginService = new UserLogin(new UserRepositoryMongoose());

export class UserController {
    constructor() { }

    async signupUser(req: any, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;

            const result = await userSignupService.execute(email, password);
            res.status(201).json(result);
        } catch (err: unknown) {
            console.log("ERROR: ", err);
        }
    }

    async loginUser(req: any, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const result = await userLoginService.execute(email, password);

            res.status(HttpStatusCode.OK).json({ message: StatusMessage[HttpStatusCode.OK], user: result });
        } catch (error: unknown) {
            const err = error as {message: string}; 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      return;
        }
    }
}
