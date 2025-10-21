import { Table, Column, Model, DataType, PrimaryKey } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";

@Table({ tableName: "profiles", timestamps: true, underscored: true })
export default class ProfileModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: UUIDV4, allowNull: false })
  id!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: "available" })
  status!: string;
}
