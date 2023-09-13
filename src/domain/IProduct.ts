export interface IProduct {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  createdAt?: Date;
  deletedAt?: Date;
}
