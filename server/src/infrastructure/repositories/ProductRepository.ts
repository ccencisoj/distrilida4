import { Model } from 'mongoose';
import { Product } from '../../domain';
import { IProductRepository } from "../../application";
import { ProductMapper } from '../mappers/ProductMapper';

export class ProductRepository implements IProductRepository {
  protected readonly model: Model<any>;

  public constructor(model: Model<any>) {
    this.model = model;
  }

  public findOne = async (filter: any): Promise<Product> => {
    const repoProduct = await this.model.findOne(filter);    
    const Product = repoProduct ? ProductMapper.toDomain(repoProduct) : null;
    return Product;
  }

  public findMany = async (filter: any, skip: number, limit: number): Promise<Product[]> => {
    const repoProducts = await this.model.find(filter).skip(skip).limit(limit);
    const Products = repoProducts.map((repoProduct)=> ProductMapper.toDomain(repoProduct));
    return Products;
  }

  public save = async (Product: Product): Promise<void> => {
    const exists = await this.existsById(Product.id);
    const repoProduct = ProductMapper.toPersistence(Product);

    if(exists) {
      await this.model.updateOne({id: repoProduct.id}, repoProduct);
    }else {
      await this.model.create(repoProduct);
    }
  }

  public delete = async (Product: Product): Promise<void> => {
    await this.model.deleteOne({id: Product.id}); 
  }

  public existsById = async (entityId: string): Promise<boolean> => {
    const repoProduct = await this.model.findOne({id: entityId});
    const exists = !!repoProduct ? true : false;
    return exists;
  }
}
