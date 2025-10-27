import User from "./models/userModel";
import { UserCreation } from "./usersTypes";
import { PaginationRequest } from "../../shared/types/paginationRequest";
import { Op, WhereOptions } from "sequelize";

export class UserRepository {
  async create(data: UserCreation): Promise<User> {
    return await User.create(data);
  }

  async findAll(
    pagination: PaginationRequest
  ): Promise<{ rows: User[]; count: number }> {
    const limit = pagination.pageSize;
    const offset = (pagination.page - 1) * pagination.pageSize;
    const allowedSort: Record<string, string> = {
      id: "id",
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      role: "role",
      createdAt: "createdAt",
    };
    const orderField =
      (pagination.sortBy && allowedSort[pagination.sortBy]) || "createdAt";
    const orderDirection = (pagination.sortOrder || "desc").toUpperCase() as
      | "ASC"
      | "DESC";

    let where: WhereOptions | undefined;
    const andConditions: WhereOptions[] = [];

    if (pagination.search && pagination.search.trim() !== "") {
      const q = `%${pagination.search}%`;
      andConditions.push({
        [Op.or]: [
          { firstName: { [Op.iLike]: q } },
          { lastName: { [Op.iLike]: q } },
          { email: { [Op.iLike]: q } },
        ],
      });
    }

    if (pagination.role && pagination.role.trim() !== "") {
      andConditions.push({ role: pagination.role });
    }

    where = andConditions.length ? { [Op.and]: andConditions } : undefined;

    const result = await User.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderField as any, orderDirection]],
    });

    return { rows: result.rows, count: result.count };
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

  async update(id: string, data: Partial<UserCreation>): Promise<User | null> {
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
