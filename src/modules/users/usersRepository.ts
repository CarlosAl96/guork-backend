import User from "./models/userModel";
import { UserCreationAttributes } from "./usersTypes";

export class UserRepository {
  async create(data: UserCreationAttributes): Promise<User> {
    return await User.create(data);
  }

  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async findByDni(dni: string): Promise<User | null> {
    return await User.findOne({ where: { dni } });
  }

  async update(id: string, data: Partial<UserCreationAttributes>): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(data);
  }

  async delete(id: string): Promise<boolean> {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }
}
