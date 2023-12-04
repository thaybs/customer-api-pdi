export interface IPaginate<T> {
  page: number
  pageSize: number
  data: T[]
}

export interface IPagination {
  page: number
  pageSize: number
}
