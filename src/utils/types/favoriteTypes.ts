export interface Favorite{
    id:number;
    user_id:number;
    product_id: number;
    created_at?: Date

    //optional fields when joining with the product data

    name?: string;
    price?: number;
    image_url?:string;
}