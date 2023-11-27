import { Injectable } from '@nestjs/common'
import { Model, Document, FilterQuery } from 'mongoose'

@Injectable()
export default class MongooseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data)
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  async findOne(conditions: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(conditions).exec()
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec()
  }

  async findOneByField(fieldName: string, value: any): Promise<T | null> {
    const query = { [fieldName]: value } as FilterQuery<T>
    return this.model.findOne(query).exec()
  }

  async findAllWithPaginationAndFilters(filters: FilterQuery<T>, page: number, pageSize: number): Promise<T[]> {
    const skip = (page - 1) * pageSize
    return this.model.find(filters).skip(skip).limit(pageSize).exec()
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ id: id }).exec()
  }
}
