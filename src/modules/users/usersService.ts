import bcrypt from "bcrypt";
import { UserRepository } from "./usersRepository";
import { CreateUserInput, UpdateUserInput } from "./schemas/usersZodSchema";
import { UserResponse } from "./usersTypes";

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
    const existingDni = await this.userRepository.findByDni(data.dni);
    if (existingDni) {
      throw new Error("DNI already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear usuario
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
      role: data.role || "user",
      birthdate: new Date(data.birthdate),
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
