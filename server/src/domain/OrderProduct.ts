import { Result } from "./common/Result";
import { ProductBrand } from "./ProductBrand";
import { ProductName } from "./ProductName";
import { ProductPrice } from "./ProductPrice";
import { ProductQuantity } from "./ProductQuantity";
import { AggregateRoot } from "./common/AggregateRoot";

interface OrderProductProps {
  orderId: string;
  name: ProductName;
  brand: ProductBrand;
  avaliableQuantity: ProductQuantity;
  price: ProductPrice;
}

export class OrderProduct extends AggregateRoot<OrderProductProps> {
  public get id(): string {
    return this._id;
  }

  public get orderId(): string {
    return this.props.orderId;
  }

  public get name(): string {
    return this.props.name.value;
  }

  public get brand(): string {
    return this.props.brand.value;
  }

  public get avaliableQuantity(): number {
    return this.props.avaliableQuantity.value;
  }

  public get price(): number {
    return this.props.price.value;
  }

  private constructor(props: OrderProductProps, id?: string) {
    super(props, id);
  }

  public static create = (props: OrderProductProps, id?: string): Result<OrderProduct> => {
    const orderProduct = new OrderProduct(props, id);

    return Result.ok<OrderProduct>(orderProduct);
  }
}
