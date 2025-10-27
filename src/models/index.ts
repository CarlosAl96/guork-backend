import UserModel from "../modules/users/models/userModel";
import SessionModel from "../modules/auth/models/sessionModel";
import PasswordResetRequestModel from "../modules/auth/models/passwordResetRequestModel";
import ProfileModel from "../modules/profiles/models/profileModel";
import UserProfileModel from "../modules/users/models/userProfileModel";
import RequestModel from "../modules/requests/models/requestModel";

export {
  UserModel,
  SessionModel,
  PasswordResetRequestModel,
  ProfileModel,
  UserProfileModel,
  RequestModel,
};

export const models = [
  UserModel,
  SessionModel,
  PasswordResetRequestModel,
  ProfileModel,
  UserProfileModel,
  RequestModel,
];
