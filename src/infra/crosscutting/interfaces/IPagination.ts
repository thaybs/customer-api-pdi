export interface IPaginate<T> {
  page: number
  pageSize: number
  data: T[]
}

export interface IPagination<TFilter> {
  page: number
  pageSize: number
  filter: TFilter
}
