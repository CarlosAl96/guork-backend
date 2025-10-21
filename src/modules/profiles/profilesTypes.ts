export interface ProfileAttributes {
  id: string;
  name: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileCreationAttributes extends Omit<ProfileAttributes, "id" | "createdAt" | "updatedAt"> {}

export interface ProfileResponse extends Omit<ProfileAttributes, "createdAt" | "updatedAt"> {}
