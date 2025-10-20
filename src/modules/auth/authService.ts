import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../users/usersRepository";
import { AuthRepository } from "./authRepository";
import { CreateUserInput } from "../users/schemas/usersZodSchema";
import { LoginInput } from "./schemas/authZodSchema";
import { UserCreationAttributes, UserResponse } from "../users/usersTypes";

export class AuthService {
  private userRepository: UserRepository;
  private authRepository: AuthRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.authRepository = new AuthRepository();
  }

  private userToResponse(user: any): UserResponse {
    const { password, createdAt, updatedAt, ...userResponse } = user.toJSON();
    return userResponse;
  }

  async register(
    data: CreateUserInput,
    ip: string
  ): Promise<{ user: UserResponse; token: string }> {
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

    // Hash password
    let hashedPassword;
    const userData: UserCreationAttributes = { ...data, birthdate: undefined };

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
      role: data.role || "user",
    });

    // Generar token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    // Guardar sesión
    await this.authRepository.createSession(token, ip, user.id);

    return {
      user: this.userToResponse(user),
      token,
    };
  }

  async login(
    data: LoginInput,
    ip: string
  ): Promise<{ user: UserResponse; token: string }> {
    // Buscar usuario
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verificar password
    const isValid = await bcrypt.compare(data.password, user.password || "");
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // Generar token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    // Guardar sesión
    await this.authRepository.createSession(token, ip, user.id);

    return {
      user: this.userToResponse(user),
      token,
    };
  }

  async logout(token: string): Promise<void> {
    const deleted = await this.authRepository.deleteSession(token);
    if (!deleted) {
      throw new Error("Session not found");
    }
  }
}
