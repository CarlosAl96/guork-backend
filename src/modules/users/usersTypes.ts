export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: "user" | "admin";
  dniImg?: string;
  dni: string;
  birthdate: Date;
  address: string;
  postalCode?: string;
  profileImg?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Omit<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

export interface UserResponse
  extends Omit<UserAttributes, "password" | "createdAt" | "updatedAt"> {}
