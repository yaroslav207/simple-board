import {Table, Model, Column as SequelizeColumn, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import {Board} from "@/db/models/board.model";

@Table({
  timestamps: true,
  tableName: "columns",
})
export class Column extends Model {
  @SequelizeColumn({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @SequelizeColumn({
    type: DataType.INTEGER,
  })
  order!: number;

  @ForeignKey(() => Board)
  @SequelizeColumn({
    type: DataType.INTEGER,
    allowNull: false,
  })
  boardId!: number;

  @BelongsTo(() => Board)
  board!: Board;

  @SequelizeColumn
  createdAt!: Date;

  @SequelizeColumn
  updatedAt!: Date;
}
