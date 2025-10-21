import { ProfilesRepository } from "./profilesRepository";
import { CreateProfileInput, UpdateProfileInput } from "./schemas/profilesZodSchema";
import { ProfileResponse } from "./profilesTypes";

export class ProfilesService {
  private profilesRepository: ProfilesRepository;

  constructor() {
    this.profilesRepository = new ProfilesRepository();
  }

  private profileToResponse(profile: any): ProfileResponse {
    const { createdAt, updatedAt, ...profileResponse } = profile.toJSON();
    return profileResponse;
  }

  async createProfile(data: CreateProfileInput): Promise<ProfileResponse> {
    const profile = await this.profilesRepository.create({
      ...data,
      status: data.status || "available",
    });
    return this.profileToResponse(profile);
  }

  async getAllProfiles(): Promise<ProfileResponse[]> {
    const profiles = await this.profilesRepository.findAll();
    return profiles.map((profile) => this.profileToResponse(profile));
  }

  async getProfileById(id: string): Promise<ProfileResponse> {
    const profile = await this.profilesRepository.findById(id);
    if (!profile) {
      throw new Error("Profile not found");
    }
    return this.profileToResponse(profile);
  }

  async updateProfile(id: string, data: UpdateProfileInput): Promise<ProfileResponse> {
    const profile = await this.profilesRepository.update(id, data);
    if (!profile) {
      throw new Error("Profile not found");
    }
    return this.profileToResponse(profile);
  }

  async deleteProfile(id: string): Promise<void> {
    const deleted = await this.profilesRepository.delete(id);
    if (!deleted) {
      throw new Error("Profile not found");
    }
  }
}
