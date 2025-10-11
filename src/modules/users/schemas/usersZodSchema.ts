import { z } from "zod";

// Schema de validación para creación de usuario
export const createUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dni: z.string().min(1, "DNI is required"),
  birthdate: z.string().min(1, "Birthdate is required"),
  address: z.string().min(1, "Address is required"),
  postalCode: z.string().optional(),
  dniImg: z.string().optional(),
  profileImg: z.string().optional(),
  role: z.enum(["user", "admin"]).optional(),
});

// Schema de validación para actualización de usuario
export const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  dni: z.string().optional(),
  birthdate: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  dniImg: z.string().optional(),
  profileImg: z.string().optional(),
  role: z.enum(["user", "admin"]).optional(),
});

// Schema de validación para login
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Tipos inferidos de los schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
