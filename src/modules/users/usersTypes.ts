export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password?: string;
  role?: "user" | "admin" | "expert";
  dniImg?: string;
  dni?: string;
  birthdate?: Date;
  address?: string;
  postalCode?: string;
  profileImg?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreation
  extends Omit<User, "id" | "createdAt" | "updatedAt"> {}

export interface UserResponse
  extends Omit<User, "password" | "createdAt" | "updatedAt"> {}
