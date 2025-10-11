import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import SessionModel from "../../auth/models/sessionModel";
import PasswordResetRequestModel from "../../auth/models/passwordResetRequestModel";

@Table({ tableName: "users", timestamps: false, underscored: true })
export default class UserModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: UUIDV4, allowNull: false })
  id!: string;

  @Column({ type: DataType.TEXT, allowNull: false, field: "first_name" })
  firstName!: string;

  @Column({ type: DataType.TEXT, allowNull: false, field: "last_name" })
  lastName!: string;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  phone?: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  password!: string;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: "user" })
  role!: string;

  @Column({ type: DataType.TEXT, allowNull: true, field: "dni_img" })
  dniImg?: string;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  dni!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  birthdate!: Date;

  @Column({ type: DataType.TEXT, allowNull: false })
  address!: string;

  @Column({ type: DataType.TEXT, allowNull: true, field: "postal_code" })
  postalCode?: string;

  @Column({ type: DataType.TEXT, allowNull: true, field: "profile_img" })
  profileImg?: string;

  @HasMany(() => SessionModel)
  sessions!: SessionModel[];

  @HasMany(() => PasswordResetRequestModel)
  passwordResetRequests!: PasswordResetRequestModel[];
  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "created_at",
    defaultValue: new Date(),
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "updated_at",
    defaultValue: new Date(),
  })
  updatedAt!: Date;

  toJSON() {
    const values = { ...this.get() } as any;
    delete values.password;
    return values;
  }
}
