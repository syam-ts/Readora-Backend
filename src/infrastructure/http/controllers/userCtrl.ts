import { Request, Response } from "express";
import generateToken from "../../../utils/jwt/generateToken";
import { HttpStatusCode } from "../../../helper/contants/enums";
import { StatusMessage } from "../../../helper/contants/statusMessages";
import { userController } from "../../../helper/controllerHelper/userCtrlHelper";

const {
    userSignupService,
    userLoginService,
    verifyOtpService,
    addPreferencesService,
    editProfileService,
    viewUserProfileService,
} = userController;

export class UserController {
    constructor() { }

    async signupUser(req: any, res: Response): Promise<void> {
        try {
            const generatedOtp = await userSignupService.execute(req.body);
            const data = {
                body: req.body,
                generatedOtp: generatedOtp,
            };

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                user: data,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async loginUser(req: any, res: Response): Promise<void> {
        try {
            const user = await userLoginService.execute(req.body);
            const { accessToken, refreshToken } = generateToken(user);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                user,
                accessToken,
                refreshToken,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async verifyOtp(req: any, res: Response): Promise<void> {
        try {
            const user = await verifyOtpService.execute(req.body);

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                user,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async addPreferences(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const { preferences } = req.body;

            const result = await addPreferencesService.execute(userId, preferences);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async viewUserProfile(req: any, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String(req.user?.id);
            const result = await viewUserProfileService.execute(userId);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                user: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async editProfile(req: any, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String(req.user?.id);
            const result = await editProfileService.execute(req.body, userId);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                user: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }
}
