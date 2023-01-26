export interface ProductModel {
    image: string;
    title: string;
    id: number;
    price: number;
    description: string;
    category: string;
    rating: {
        rate: number,
        count: number
    };
}