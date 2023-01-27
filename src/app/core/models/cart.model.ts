import { ProductModel } from "./product.model";

export interface Cart {
    id: number;
    userId: number;
    date: string;
    product: ProductModel[]
}