import {Table, Model, Column as SequelizeColumn, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import {User} from "@/db/models/user.model";
import {Board} from "@/db/models/board.model";
import {Column} from "@/db/models/column.model";

@Table({
  timestamps: true,
  tableName: "cards",
})
export class Card extends Model {
  @SequelizeColumn({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @SequelizeColumn({
    type: DataType.INTEGER,
  })
  order!: number;

  @ForeignKey(() => User)
  @SequelizeColumn({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Board)
  @SequelizeColumn({
    type: DataType.INTEGER,
    allowNull: false,
  })
  boardId!: number;

  @BelongsTo(() => Board)
  board!: Board;

  @ForeignKey(() => Column)
  @SequelizeColumn({
    type: DataType.INTEGER,
    allowNull: false,
  })
  columnId!: number;

  @BelongsTo(() => Column)
  column!: Column;

  @SequelizeColumn
  createdAt!: Date;

  @SequelizeColumn
  updatedAt!: Date;
}
