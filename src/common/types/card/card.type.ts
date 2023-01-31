type Card = {
  id?: number;
  title: string;
  userId: number;
  boardId: number;
  columnId: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type { Card };
