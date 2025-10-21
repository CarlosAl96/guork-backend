import UserModel from "../modules/users/models/userModel";
import SessionModel from "../modules/auth/models/sessionModel";
import PasswordResetRequestModel from "../modules/auth/models/passwordResetRequestModel";
import ProfileModel from "../modules/profiles/models/profileModel";

export { UserModel, SessionModel, PasswordResetRequestModel, ProfileModel };

export const models = [UserModel, SessionModel, PasswordResetRequestModel, ProfileModel];
