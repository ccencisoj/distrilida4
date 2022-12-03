import { Model } from 'mongoose';
import { OrderProduct } from '../../domain';
import { IOrderProductRepository } from "../../application";
import { OrderProductMapper } from '../mappers/OrderProductMapper';

export class OrderProductRepository implements IOrderProductRepository {
  protected readonly model: Model<any>;

  public constructor(model: Model<any>) {
    this.model = model;
  }

  public findOne = async (filter: any): Promise<OrderProduct> => {
    const repoOrderProduct = await this.model.findOne(filter);    
    const orderProduct = repoOrderProduct ? OrderProductMapper.toDomain(repoOrderProduct) : null;
    return orderProduct;
  }

  public findMany = async (filter: any, skip: number, limit: number): Promise<OrderProduct[]> => {
    const repoOrderProducts = await this.model.find(filter).skip(skip).limit(limit);
    const orderProducts = repoOrderProducts.map((repoOrderProduct)=> OrderProductMapper.toDomain(repoOrderProduct));
    return orderProducts;
  }

  public save = async (OrderProduct: OrderProduct): Promise<void> => {
    const exists = await this.existsById(OrderProduct.id);
    const repoOrderProduct = OrderProductMapper.toPersistence(OrderProduct);

    if(exists) {
      await this.model.updateOne({id: repoOrderProduct.id}, repoOrderProduct);
    }else {
      await this.model.create(repoOrderProduct);
    }
  }

  public delete = async (OrderProduct: OrderProduct): Promise<void> => {
    await this.model.deleteOne({id: OrderProduct.id}); 
  }

  public deleteMany = async (filter: any): Promise<void> => {
    await this.model.deleteMany(filter);
  }

  public existsById = async (entityId: string): Promise<boolean> => {
    const repoOrderProduct = await this.model.findOne({id: entityId});
    const exists = !!repoOrderProduct ? true : false;
    return exists;
  }
}
