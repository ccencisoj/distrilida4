import { OrderProduct } from "../../domain";
import { IBaseRepository } from "./IBaseRepository";

export interface IOrderProductRepository extends IBaseRepository<OrderProduct> {
  deleteMany(filter: any): Promise<void>;
}; 
