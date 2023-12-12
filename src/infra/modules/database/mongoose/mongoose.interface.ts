import { FilterQuery } from 'mongoose'

export default interface IMongooseRepository<T> {
  create(data: Partial<T>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T | null>
  findOne(conditions: FilterQuery<T>): Promise<T | null>
  findAll(): Promise<T[]>
  findAllWithPaginationAndFilters(filters: FilterQuery<T>, page: number, pageSize: number): Promise<T[]>
  delete(id: string): Promise<void>
}
