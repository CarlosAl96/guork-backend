import UserModel from "../modules/users/models/userModel";
import SessionModel from "../modules/auth/models/sessionModel";
import PasswordResetRequestModel from "../modules/auth/models/passwordResetRequestModel";

export { UserModel, SessionModel, PasswordResetRequestModel };

export const models = [UserModel, SessionModel, PasswordResetRequestModel];
