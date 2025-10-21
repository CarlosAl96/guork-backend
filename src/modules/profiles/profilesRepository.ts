import ProfileModel from "./models/profileModel";
import { ProfileCreationAttributes } from "./profilesTypes";

export class ProfilesRepository {
  async create(data: ProfileCreationAttributes): Promise<ProfileModel> {
    return await ProfileModel.create(data);
  }

  async findAll(): Promise<ProfileModel[]> {
    return await ProfileModel.findAll();
  }

  async findById(id: string): Promise<ProfileModel | null> {
    return await ProfileModel.findByPk(id);
  }

  async update(id: string, data: Partial<ProfileCreationAttributes>): Promise<ProfileModel | null> {
    const record = await ProfileModel.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  }

  async delete(id: string): Promise<boolean> {
    const record = await ProfileModel.findByPk(id);
    if (!record) return false;
    await record.destroy();
    return true;
  }
}
