export type PaginationRequest = {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  role?: string;
  status?: string;
  profile?: string;
};
