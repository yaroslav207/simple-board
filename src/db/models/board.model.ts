import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany
} from "sequelize-typescript";
import {User, Column as ColumnModel} from "@/db/models/";

@Table({
  timestamps: true,
  tableName: "boards",
})
export class Board extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => ColumnModel, {
    foreignKey: 'boardId'
  })
  columns!: ColumnModel[];

  @Column
  createdAt!: Date;

  @Column
  updatedAt!: Date;
}
