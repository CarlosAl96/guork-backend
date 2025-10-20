import bcrypt from "bcrypt";
import { UserRepository } from "./usersRepository";
import { CreateUserInput, UpdateUserInput } from "./schemas/usersZodSchema";
import { UserCreationAttributes, UserResponse } from "./usersTypes";
import { de } from "zod/v4/locales";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private userToResponse(user: any): UserResponse {
    const { password, createdAt, updatedAt, ...userResponse } = user.toJSON();
    return userResponse;
  }

  async createUser(data: CreateUserInput): Promise<UserResponse> {
    // Verificar si el email ya existe
    const existingEmail = await this.userRepository.findByEmail(data.email);
    if (existingEmail) {
      throw new Error("Email already exists");
    }

    // Verificar si el DNI ya existe
    if (data.dni) {
      const existingDni = await this.userRepository.findByDni(data.dni);
      if (existingDni) {
        throw new Error("DNI already exists");
      }
    }

    let hashedPassword;
    const userData: UserCreationAttributes = { ...data, birthdate: undefined };
    // Hash password
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
      userData.password = hashedPassword;
    }

    if (data.birthdate) {
      userData.birthdate = new Date(data.birthdate);
    } else {
      delete userData.birthdate;
    }

    // Crear usuario
    const user = await this.userRepository.create({
      ...userData,
      role: userData.role || "user",
    });

    return this.userToResponse(user);
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.userToResponse(user));
  }

  async getUserById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return this.userToResponse(user);
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<UserResponse> {
    const user = await this.userRepository.update(id, {
      ...data,
      birthdate: data.birthdate ? new Date(data.birthdate) : undefined,
    });
    if (!user) {
      throw new Error("User not found");
    }
    return this.userToResponse(user);
  }

  async deleteUser(id: string): Promise<void> {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new Error("User not found");
    }
  }
}
