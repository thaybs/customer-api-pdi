import { Injectable } from '@nestjs/common'
import { Model, Document, FilterQuery } from 'mongoose'
import IMongooseRepository from './mongoose.interface'

@Injectable()
export default class MongooseRepository<T extends Document> implements IMongooseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data)
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate({ id: id }, data, { new: true }).exec()
  }

  async findOne(conditions: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(conditions).exec()
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec()
  }

  async findAllWithPaginationAndFilters(filters: FilterQuery<T>, page: number, pageSize: number): Promise<T[]> {
    const skip = (page - 1) * pageSize

    const regexFilters: FilterQuery<Document<T>> = {}

    Object.entries(filters).forEach(([key, value]) => {
      if (value != null) {
        if (typeof value === 'string' && (value === 'true' || value === 'false')) {
          regexFilters[key] = value.toLowerCase() === 'true'
        } else {
          regexFilters[key] = { $regex: new RegExp(String(value), 'i') }
        }
      }
    })

    return this.model.find(regexFilters).skip(skip).limit(pageSize).exec()
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ id: id }).exec()
  }
}
