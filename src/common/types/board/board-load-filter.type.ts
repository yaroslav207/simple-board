import {PaginationFields} from "@/common/types";

type BoardLoadFilter = PaginationFields & {
  userId: number;
}

export type {BoardLoadFilter}
