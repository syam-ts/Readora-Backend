import { UserSignup } from "../../application/services/users/userSignupService";
import { UserLogin } from "../../application/services/users/userLoginService";
import { VerifyOtp } from "../../application/services/users/userVerifyOtpService";
import { EditProfile } from "../../application/services/users/editProfileService";
import { ViewUserProfile } from "../../application/services/users/viewUserProfileService";
import { AddPreferences } from "../../application/services/users/addPreferencesService";
import { UserRepositoryMongoose } from "../../infrastructure/Repository-DB/userRepositoryMongo";

const userSignupService = new UserSignup();
const userLoginService = new UserLogin(new UserRepositoryMongoose());
const verifyOtpService = new VerifyOtp(new UserRepositoryMongoose());
const addPreferencesService = new AddPreferences(new UserRepositoryMongoose());
const editProfileService = new EditProfile(new UserRepositoryMongoose());
const viewUserProfileService = new ViewUserProfile(new UserRepositoryMongoose());

export const userController = {
    userSignupService,
    userLoginService,
    verifyOtpService,
    addPreferencesService,
    editProfileService,
    viewUserProfileService,
};
