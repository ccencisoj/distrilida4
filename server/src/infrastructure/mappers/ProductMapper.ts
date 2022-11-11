import { 
  Product, 
  ProductBrand, 
  ProductName, 
  ProductPrice, 
  ProductQuantity 
} from "../../domain";

type ProductRaw = {
  id: string;
  orderId: string;
  name: string;
  brand: string;
  avaliableQuantity: number;
  price: number;
};

export class ProductMapper {
  public static toJSON = (Product: Product): any => {
    return {
      id: Product.id,
      name: Product.name,
      brand: Product.brand,
      avaliableQuantity: Product.avaliableQuantity,
      price: Product.price
    }
  }

  public static toPersistence = (Product: Product): any => {
    return {
      id: Product.id,
      name: Product.name,
      brand: Product.brand,
      avaliableQuantity: Product.avaliableQuantity,
      price: Product.price
    }
  }

  public static toDomain = (raw: ProductRaw): Product => {
    const nameOrError = ProductName.create(raw.name);
    const brandOrError = ProductBrand.create(raw.brand);
    const avaliableQuantityOrError = ProductQuantity.create(raw.avaliableQuantity);
    const priceOrError = ProductPrice.create(raw.price);
    const productOrError = Product.create({
      name: nameOrError.getValue(),
      brand: brandOrError.getValue(),
      avaliableQuantity: avaliableQuantityOrError.getValue(),
      price: priceOrError.getValue()
    }, raw.id);
    const product = productOrError.getValue();
    return product;
  }
}
